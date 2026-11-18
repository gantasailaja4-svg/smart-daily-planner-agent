import type { FormEvent } from "react";

type TaskFormProps = {
  title: string;
  duration: string;
  loading: boolean;
  onTitleChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function TaskForm({
  title,
  duration,
  loading,
  onTitleChange,
  onDurationChange,
  onSubmit,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <div className="task-form-fields">
        <div className="task-form-field">
          <label htmlFor="task-title">Task name</label>
          <input
            id="task-title"
            type="text"
            placeholder="e.g. Learn React and TypeScript"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            maxLength={150}
            required
          />
        </div>

        <div className="task-form-field">
          <label htmlFor="task-duration">Estimated duration</label>
          <div className="duration-input-wrapper">
            <input
              id="task-duration"
              type="number"
              min="1"
              max="1440"
              placeholder="30"
              value={duration}
              onChange={(event) => onDurationChange(event.target.value)}
              required
            />
            <span>minutes</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !title.trim() || Number(duration) <= 0 || Number(duration) > 1440}
      >
        {loading ? "Adding Task..." : "+ Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;