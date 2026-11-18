import { useEffect, useState, useCallback } from "react";

import {
  getTasks,
  createTask,
  completeTask,
  removeTask,
} from "../services/taskService";

// Task type
type Task = {
  id: number;
  title: string;
  duration: number;
  completed: boolean;
};

function useTasks() {
  // 1. Task states
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskError, setTaskError] = useState("");

  // 2. Load tasks
 const loadTasks = useCallback(async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (error) {
      setTaskError(
        error instanceof Error ? error.message : "Unable to load tasks"
      );
    }
  },[])

  // 3. Load tasks when the hook is first used
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // 4. Add a task
 async function addTask(
  title: string,
  duration: number
): Promise<boolean> {
  setTaskLoading(true);
  setTaskError("");

  try {
    const data = await createTask(title, duration);

    setTasks((previous) => [...previous, data.task]);

    return true;
  } catch (error) {
    setTaskError(
      error instanceof Error ? error.message : "Unable to add task"
    );

    return false;
  } finally {
    setTaskLoading(false);
  }
}

  // 5. Complete a task
  async function handleCompleteTask(id: number) {
    try {
      await completeTask(id);

      setTasks((previous) =>
        previous.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      setTaskError(
        error instanceof Error ? error.message : "Unable to complete task"
      );
    }
  }

  // 6. Delete a task
  async function handleDeleteTask(id: number) {
    try {
      await removeTask(id);

      setTasks((previous) =>
        previous.filter((task) => task.id !== id)
      );
    } catch (error) {
      setTaskError(
        error instanceof Error ? error.message : "Unable to delete task"
      );
    }
  }

  // 7. Return values and functions
  return {
    tasks,
    taskLoading,
    taskError,
    addTask,
    loadTasks,
    handleCompleteTask,
    handleDeleteTask,
  };
}

export default useTasks;