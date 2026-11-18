import { Link } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import TaskList from "../components/tasks/TaskList";

function Dashboard() {
  const { tasks, handleCompleteTask, handleDeleteTask } = useTaskContext();

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  const completionPercentage =
    tasks.length > 0
      ? Math.round((completedCount / tasks.length) * 100)
      : 0;

  const recentTasks = [...tasks].slice(-5).reverse();

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-container">
      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">YOUR WORKSPACE</span>
          <h2>Welcome back!</h2>
          <p>Stay focused and make today productive.</p>
          <span className="dashboard-date">{currentDate}</span>
        </div>

        <Link to="/tasks" className="primary-action">
          + Add New Task
        </Link>
      </section>

      <section className="dashboard-stats">
        <div className="stat-card total-stat">
          <div className="stat-card-top">
            <span>Total Tasks</span>
            <span className="stat-icon">☷</span>
          </div>
          <strong>{tasks.length}</strong>
          <p>All your tasks</p>
        </div>

        <div className="stat-card completed-stat">
          <div className="stat-card-top">
            <span>Completed</span>
            <span className="stat-icon">✓</span>
          </div>
          <strong>{completedCount}</strong>
          <p>Successfully finished</p>
        </div>

        <div className="stat-card pending-stat">
          <div className="stat-card-top">
            <span>Pending</span>
            <span className="stat-icon">◷</span>
          </div>
          <strong>{pendingCount}</strong>
          <p>Waiting to be completed</p>
        </div>
      </section>

      <section className="task-panel progress-panel">
        <div className="section-heading">
          <div>
            <h2>Task Progress</h2>
            <p>Track your overall productivity</p>
          </div>
          <strong>{completionPercentage}%</strong>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="Task completion"
          aria-valuenow={completionPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <p className="progress-caption">
          {completedCount} of {tasks.length} tasks completed
        </p>
      </section>

      <section className="task-panel recent-tasks-panel">
        <div className="section-heading">
          <div>
            <h2>Recent Tasks</h2>
            <p>Your latest activities</p>
          </div>

          <Link to="/tasks" className="text-action">
            View all tasks →
          </Link>
        </div>

        <TaskList
          tasks={recentTasks}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
        />
      </section>
    </div>
  );
}

export default Dashboard;