
import "dotenv/config";
import express from "express";
import cors from "cors";

import { askGemini } from "./agent.js";

import {
  addTask,
  getTasks,
  completeTask,
  deleteTask,
} from "./tools/taskTools.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.send("Smart Daily Planner Agent Backend is running!");
});

// Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate user input
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid message",
      });
    }

    // Send message to Gemini
    const reply = await askGemini(message.trim());

    return res.json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("Gemini API error:", error);

    const statusCode = error?.statusCode;

    // Read Google's Retry-After header
    const retryAfterHeader =
      error?.headers?.get?.("retry-after") ??
      error?.headers?.["retry-after"];

    const retryAfterSeconds = Number(retryAfterHeader) || 30;

    // Gemini temporarily unavailable
    if (statusCode === 503) {
      return res.status(503).json({
        success: false,
        code: "GEMINI_UNAVAILABLE",
        error:
          "The AI service is temporarily busy. Your tasks are safe. Please try again later.",
        retryAfterSeconds,
      });
    }

    // Gemini rate limit
    if (statusCode === 429) {
      return res.status(429).json({
        success: false,
        code: "GEMINI_RATE_LIMIT",
        error:
          "The AI request limit has been reached. Please wait before trying again.",
        retryAfterSeconds,
      });
    }

    // Other Gemini or server errors
    return res.status(502).json({
      success: false,
      code: "GEMINI_REQUEST_FAILED",
      error:
        "We couldn't get a response from the AI service. Please try again later.",
    });
  }
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
  const tasks = getTasks();

  res.json({
    success: true,
    tasks,
  });
});

// Add a new task
app.post("/api/tasks", (req, res) => {
  const { title, duration } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    !Number.isInteger(duration) ||
    duration <= 0 ||
    duration > 1440
  ) {
    return res.status(400).json({
      success: false,
      message: "Valid title and duration (1–1440 minutes) are required",
    });
  }

  const task = addTask(title.trim(), duration);

  res.status(201).json({
    success: true,
    message: "Task added successfully",
    task,
  });
});

// Complete a task
app.patch("/api/tasks/:id/complete", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }

  const result = completeTask(id);

  if (!result.success) {
    return res.status(404).json(result);
  }

  res.json(result);
});

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }

  const result = deleteTask(id);

  if (!result.success) {
    return res.status(404).json(result);
  }

  res.json(result);
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Gemini model configured: ${process.env.GEMINI_MODEL || "gemini-3.8-flash"}`);
});
