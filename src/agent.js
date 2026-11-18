
import "dotenv/config";

import { GoogleGenAI } from "@google/genai";

import { agentInstructions } from "./config/agentInstructions.js";
import { taskToolDefinitions } from "./tools/taskToolDefinitions.js";

import {
  addTask,
  getTasks,
  completeTask,
  deleteTask,
} from "./tools/taskTools.js";

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Read the model from .env.
// If GEMINI_MODEL is not configured, use the current model.
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

// Execute the requested JavaScript tool
function executeTaskTool(name, args) {
  switch (name) {
    case "addTask":
      if (
        typeof args.title !== "string" ||
        !args.title.trim() ||
        !Number.isInteger(args.duration) ||
        args.duration <= 0 ||
        args.duration > 1440
      ) {
        return {
          success: false,
          message: "Invalid task title or duration",
        };
      }

      return addTask(args.title.trim(), args.duration);

    case "getTasks":
      return getTasks();

    case "completeTask":
      if (!Number.isInteger(args.id) || args.id <= 0) {
        return {
          success: false,
          message: "Invalid task ID",
        };
      }

      return completeTask(args.id);

    case "deleteTask":
      if (!Number.isInteger(args.id) || args.id <= 0) {
        return {
          success: false,
          message: "Invalid task ID",
        };
      }

      return deleteTask(args.id);

    default:
      return {
        success: false,
        message: "Unknown tool",
      };
  }
}

// Communicate with Gemini and execute tools
export async function askGemini(message) {
  // Initial request to Gemini
  let interaction = await ai.interactions.create({
    model: GEMINI_MODEL,
    input: message,
    system_instruction: agentInstructions,
    tools: taskToolDefinitions,
  });

  // Allow multiple tool-calling rounds
  let toolRounds = 0;
  const MAX_TOOL_ROUNDS = 5;

  while (true) {
    // Find function calls requested by Gemini
    const functionCalls = (interaction.outputs || []).filter(
      (output) => output.type === "function_call"
    );

    // Return final response when no more tools are requested
    if (functionCalls.length === 0) {
      return interaction.output_text || "No response generated.";
    }

    if (toolRounds >= MAX_TOOL_ROUNDS) {
      throw new Error("Maximum tool execution rounds exceeded");
    }

    // Execute requested functions
    const functionResults = functionCalls.map((call) => {
      let args = call.arguments || {};

      // Handle arguments returned as JSON text
      if (typeof args === "string") {
        try {
          args = JSON.parse(args);
        } catch {
          return {
            type: "function_result",
            name: call.name,
            call_id: call.id,
            result: {
              success: false,
              message: "Invalid tool arguments received from AI",
            },
          };
        }
      }

      // Ensure arguments are an object
      if (
        typeof args !== "object" ||
        args === null ||
        Array.isArray(args)
      ) {
        args = {};
      }

      console.log("Tool selected:", call.name);
      console.log("Tool arguments:", args);

      const result = executeTaskTool(call.name, args);

      console.log("Tool result:", result);

      return {
        type: "function_result",
        name: call.name,
        call_id: call.id,
        result: result,
      };
    });

    // Send tool results back to Gemini
    interaction = await ai.interactions.create({
      previous_interaction_id: interaction.id,
      input: functionResults,
    });

    toolRounds++;
  }
}
