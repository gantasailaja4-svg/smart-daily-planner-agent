
const API_URL = "http://localhost:5000";

export async function getTasks() {
  const response = await fetch(`${API_URL}/api/tasks`);

  if (!response.ok) {
    throw new Error("Failed to load tasks");
  }

  return response.json();
}

export async function createTask(title: string, duration: number) {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, duration }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add task");
  }

  return data;
}

export async function completeTask(id: number) {
  const response = await fetch(`${API_URL}/api/tasks/${id}/complete`, {
    method: "PATCH",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to complete task");
  }

  return data;
}

export async function removeTask(id: number) {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete task");
  }

  return data;
}