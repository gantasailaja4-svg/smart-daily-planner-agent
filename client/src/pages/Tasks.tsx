import { useState } from "react";
import type { FormEvent } from "react";

import { useTaskContext } from "../context/TaskContext";

import TaskStats from "../components/tasks/TaskStats";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

function Tasks() {
  const {
    tasks,
    taskLoading,
    taskError,
    addTask,
    handleCompleteTask,
    handleDeleteTask,
  } = useTaskContext();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("30");

  const [filter, setFilter] = useState<
    "all" | "pending" | "completed"
  >("all");

  async function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || Number(duration) <= 0 || Number(duration) > 1440) {
      return;
    }

    const success = await addTask(title.trim(), Number(duration));

    if (success) {
      setTitle("");
      setDuration("30");
      setFilter("all");
    }
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="tasks-page">
      <section className="tasks-page-header">
        <div>
          <span className="dashboard-eyebrow">TASK MANAGEMENT</span>
          <h2>My Tasks</h2>
          <p>Organize your work, track progress, and stay productive.</p>
        </div>
      </section>

      <section className="task-panel task-overview-panel">
        <div className="section-heading">
          <div>
            <h2>Task Overview</h2>
            <p>A quick summary of your tasks</p>
          </div>
        </div>

        <TaskStats
          total={tasks.length}
          completed={completedCount}
          pending={pendingCount}
        />
      </section>

      <section className="task-panel task-creation-panel">
        <div className="section-heading">
          <div>
            <h2>Create a New Task</h2>
            <p>Add a task and set the time required to complete it.</p>
          </div>
          <span className="creation-icon">+</span>
        </div>

        <TaskForm
          title={title}
          duration={duration}
          loading={taskLoading}
          onTitleChange={setTitle}
          onDurationChange={setDuration}
          onSubmit={handleAddTask}
        />

        {taskError && (
          <p className="task-error" role="alert">
            {taskError}
          </p>
        )}
      </section>

      <section className="task-panel task-management-panel">
        <div className="section-heading">
          <div>
            <h2>All Tasks</h2>
            <p>Manage and track your daily activities.</p>
          </div>

          <span className="task-count-badge">
            {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
          </span>
        </div>

        <div className="task-filters" aria-label="Filter tasks">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All <span>{tasks.length}</span>
          </button>

          <button
            type="button"
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending <span>{pendingCount}</span>
          </button>

          <button
            type="button"
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed <span>{completedCount}</span>
          </button>
        </div>

        <TaskList
          tasks={filteredTasks}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
        />
      </section>
    </div>
  );
}

export default Tasks;