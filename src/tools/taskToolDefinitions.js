
export const taskToolDefinitions = [
  {
    type: "function",
    name: "addTask",
    description: "Add a new task to the user's daily planner.",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The name of the task",
        },
        duration: {
          type: "number",
          description: "The task duration in minutes",
        },
      },
      required: ["title", "duration"],
    },
  },

  {
    type: "function",
    name: "getTasks",
    description: "Retrieve all tasks from the user's daily planner.",
    parameters: {
      type: "object",
      properties: {},
    },
  },

  {
    type: "function",
    name: "completeTask",
    description: "Mark an existing task as completed using its ID.",
    parameters: {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "The ID of the task to complete",
        },
      },
      required: ["id"],
    },
  },

  {
    type: "function",
    name: "deleteTask",
    description: "Delete an existing task using its ID.",
    parameters: {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "The ID of the task to delete",
        },
      },
      required: ["id"],
    },
  },
];
