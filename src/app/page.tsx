'use client'
import { useState } from "react";

const ChatPage = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

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
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "Error: Unable to process your request." },
                ]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Error: Something went wrong." },
            ]);
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
                {loading && (
                    <div style={styles.messageLoading}>Assistant is typing...</div>
                )}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={styles.input}
                    className="text-black"
                />
                <button onClick={handleSendMessage} style={styles.button}>
                    Send
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
        width: "100%",
        justifyContent: "space-between",
        padding: "10px",
    },
    chatBox: {
        flex: 1,
        display: "flex",
        flexDirection: "column" as const,
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
