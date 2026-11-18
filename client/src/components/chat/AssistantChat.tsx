type Message = {
  role: "user" | "assistant";
  content: string;
};

type AssistantChatProps = {
  messages: Message[];
  message: string;
  loading: boolean;
  onMessageChange: (value: string) => void;
  onSend: () => void;
};

const suggestions = [
  "Help me plan my day",
  "Show my pending tasks",
  "Add a task to learn React",
];

function AssistantChat({
  messages,
  message,
  loading,
  onMessageChange,
  onSend,
}: AssistantChatProps) {
  return (
    <div className="chat-container">
      <div className="chat-heading">
        <div className="assistant-profile">
          <div className="assistant-avatar">AI</div>

          <div>
            <h2>Smart Planner Assistant</h2>
            <div className="assistant-status">
              <span className="status-dot" />
              Ready to help
            </div>
          </div>
        </div>

        <span className="assistant-model-label">AI ASSISTANT</span>
      </div>

      <div className="chat-messages" aria-live="polite">
        {messages.map((item, index) => (
          <div key={index} className={`message-row ${item.role}`}>
            {item.role === "assistant" && (
              <div className="message-avatar">AI</div>
            )}

            <div className={`${item.role}-message`}>
              {item.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row assistant">
            <div className="message-avatar">AI</div>
            <div className="assistant-message typing-indicator">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="chat-suggestions">
          <p>Try asking me</p>

          <div className="suggestion-list">
            {suggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => onMessageChange(suggestion)}
                disabled={loading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        className="chat-input-container"
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
      >
        <input
          type="text"
          placeholder="Ask me to organize your day..."
          value={message}
          onChange={(event) => onMessageChange(event.target.value)}
          disabled={loading}
          aria-label="Message your AI assistant"
        />

        <button type="submit" disabled={loading || !message.trim()}>
          {loading ? "Sending..." : "Send ↑"}
        </button>
      </form>

      <p className="chat-disclaimer">
        Your AI assistant can make mistakes. Review important actions.
      </p>
    </div>
  );
}

export default AssistantChat;