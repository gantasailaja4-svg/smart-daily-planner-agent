import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import useTasks from "../hooks/useTasks";

type TaskContextType = ReturnType<typeof useTasks>;
const TaskContext = createContext<TaskContextType | undefined>(undefined);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const taskData = useTasks();

  return (
    <TaskContext.Provider value={taskData}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTaskContext must be used within a TaskProvider"
    );
  }

  return context;
}