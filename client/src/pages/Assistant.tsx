import { useState } from "react";

import AssistantChat from "../components/chat/AssistantChat";
import { useTaskContext } from "../context/TaskContext";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const API_URL = "http://localhost:5000";

function Assistant() {
  const { loadTasks } = useTaskContext();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Smart Daily Planner Agent. I can help you organize tasks, manage your schedule, and stay productive. What would you like to work on?",
    },
  ]);

  async function handleSend() {
    const userMessage = message.trim();

    if (!userMessage || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", content: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.reply },
      ]);

      await loadTasks();
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Unable to contact server",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="assistant-page">
      <section className="assistant-page-header">
        <div>
          <span className="dashboard-eyebrow">AI PRODUCTIVITY</span>
          <h2>Your AI Assistant</h2>
          <p>
            Plan your day, organize tasks, and get help from your personal AI
            assistant.
          </p>
        </div>
      </section>

      <section className="task-panel assistant-workspace">
        <AssistantChat
          messages={messages}
          message={message}
          loading={loading}
          onMessageChange={setMessage}
          onSend={handleSend}
        />
      </section>
    </div>
  );
}

export default Assistant;