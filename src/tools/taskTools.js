
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "node:fs";

import path from "node:path";
import { fileURLToPath } from "node:url";

// Get the current file location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build the data file path
const dataDirectory = path.join(__dirname, "../../data");
const tasksFilePath = path.join(dataDirectory, "tasks.json");

// Create the data folder if it doesn't exist
mkdirSync(dataDirectory, { recursive: true });

// Create tasks.json if it doesn't exist
if (!existsSync(tasksFilePath)) {
  writeFileSync(tasksFilePath, "[]", "utf-8");
}

// Load existing tasks from the JSON file
let tasks = JSON.parse(
  readFileSync(tasksFilePath, "utf-8")
);

// Generate the next task ID
let nextId =
  tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;

// Save tasks to the JSON file
function saveTasks() {
  writeFileSync(
    tasksFilePath,
    JSON.stringify(tasks, null, 2),
    "utf-8"
  );
}

// Add a task
export function addTask(title, duration) {
  const newTask = {
    id: nextId++,
    title,
    duration,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();

  return newTask;
}

// Get all tasks
export function getTasks() {
  return tasks;
}

// Complete a task
export function completeTask(id) {
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return {
      success: false,
      message: "Task not found",
    };
  }

  task.completed = true;
  saveTasks();

  return {
    success: true,
    message: "Task marked as completed",
    task,
  };
}

// Delete a task
export function deleteTask(id) {
  const taskExists = tasks.some((task) => task.id === id);

  if (!taskExists) {
    return {
      success: false,
      message: "Task not found",
    };
  }

  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();

  return {
    success: true,
    message: "Task deleted successfully",
  };
}
