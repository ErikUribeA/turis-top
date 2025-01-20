"use client"

import { LoginButton } from "@/components/buttons/LoginButton"
import { useState, useRef, useEffect } from "react"

const ChatPage = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const chatBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input }),
      })

      const data = await response.json()

      if (response.ok) {
        const assistantMessage = { role: "assistant", content: data.result }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Error: No se pudo procesar tu solicitud." }])
        setError(data.error || "Error: No se pudo procesar tu solicitud.")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Ocurrió un problema al enviar la solicitud." },
      ])
      setError("Error: Ocurrió un problema al enviar la solicitud.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <LoginButton />
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === "user" ? "user" : "assistant"}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="message-loading">Asistente está escribiendo...</div>}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="input"
        />
        <button onClick={handleSendMessage} className="button">
          Enviar
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <style jsx>{`
                .chat-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    box-sizing: border-box;
                }

                .chat-box {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow-y: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    background-color: #f9f9f9;
                }

                .message {
                    max-width: 70%;
                    margin: 8px 0;
                    padding: 12px;
                    border-radius: 18px;
                    word-wrap: break-word;
                }

                .user {
                    align-self: flex-end;
                    background-color: #007bff;
                    color: white;
                }

                .assistant {
                    align-self: flex-start;
                    background-color: #e9e9e9;
                    color: #333;
                }

                .message-loading {
                    align-self: flex-start;
                    font-style: italic;
                    color: #888;
                    margin: 8px 0;
                }

                .input-container {
                    display: flex;
                    gap: 10px;
                }

                .input {
                    flex: 1;
                    padding: 12px;
                    font-size: 16px;
                    border: 1px solid #ddd;
                    border-radius: 24px;
                    outline: none;
                }

                .button {
                    padding: 12px 24px;
                    font-size: 16px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 24px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .button:hover {
                    background-color: #0056b3;
                }

                .error-message {
                    color: #ff0000;
                    margin-top: 10px;
                    text-align: center;
                }

                @media (max-width: 600px) {
                    .chat-container {
                        padding: 10px;
                    }

                    .message {
                        max-width: 85%;
                    }

                    .input {
                        font-size: 14px;
                    }

                    .button {
                        font-size: 14px;
                        padding: 10px 20px;
                    }
                }
            `}</style>
    </div>
  )
}

export default ChatPage

