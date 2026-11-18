type Task = {
  id: number;
  title: string;
  duration: number;
  completed: boolean;
};

type TaskCardProps = {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  return (
    <article className={`task-item ${task.completed ? "task-completed" : ""}`}>
      <div className="task-details">
        <div className="task-title-row">
          <h3 className={task.completed ? "completed" : ""}>
            {task.title}
          </h3>

          <span
            className={`task-status ${task.completed ? "status-completed" : "status-pending"}`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <p>
          <span className="task-duration-icon">◷</span>
          {task.duration} minutes
        </p>
      </div>

      <div className="task-actions">
        {!task.completed && (
          <button
            type="button"
            className="complete-button"
            onClick={() => onComplete(task.id)}
            aria-label={`Complete ${task.title}`}
          >
            ✓ Complete
          </button>
        )}

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;