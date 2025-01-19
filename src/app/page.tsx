'use client';

import { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage = { role: "assistant", content: data.result };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        setError(data.error || "Error: No se pudo procesar tu solicitud.");
      }
    } catch (err) {
      console.error("Error enviando el mensaje:", err);
      setError("Error: Ocurrió un problema al enviar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#cef" : "#eee",
            }}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div style={styles.messageLoading}>El asistente está escribiendo...</div>}
      </div>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.button} disabled={loading}>
          Enviar
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    height: "100vh",
    justifyContent: "space-between",
    padding: "10px",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "10px",
    border: "1px solid #ddd",
  },
  message: {
    maxWidth: "60%",
    margin: "5px 0",
    padding: "10px",
    borderRadius: "8px",
  },
  messageLoading: {
    fontStyle: "italic",
    color: "#888",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
  },
};

export default ChatPage;
