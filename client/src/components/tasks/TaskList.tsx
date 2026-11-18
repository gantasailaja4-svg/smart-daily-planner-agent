import TaskCard from "./TaskCard";

type Task = {
  id: number;
  title: string;
  duration: number;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

function TaskList({ tasks, onComplete, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="task-empty-state">
        <div className="empty-state-icon">✓</div>

        <h3>No tasks found</h3>

        <p>
          There are no tasks in this category. Add a new task or select
          another filter.
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;