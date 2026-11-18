type TaskStatsProps = {
  total: number;
  completed: number;
  pending: number;
};

function TaskStats({ total, completed, pending }: TaskStatsProps) {
  return (
    <div className="task-summary">
      <span>Total: {total}</span>
      <span>Completed: {completed}</span>
      <span>Pending: {pending}</span>
    </div>
  );
}

export default TaskStats;