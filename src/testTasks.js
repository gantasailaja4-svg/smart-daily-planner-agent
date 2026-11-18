
import {
  addTask,
  getTasks,
  completeTask,
  deleteTask
} from "./tools/taskTools.js";

// Add three tasks
addTask("Learn React", 60);
addTask("Practice JavaScript", 45);
addTask("Prepare for interview", 90);

// Complete first task
completeTask(1);

// Delete second task
const result = deleteTask(2);

console.log("Delete Result:", result);

// Display remaining tasks
console.log("Remaining Tasks:", getTasks());
