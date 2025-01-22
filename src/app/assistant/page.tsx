'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ChatPage.module.scss';

const ChatPage = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/chats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: input }),
            });

            const data = await response.json();

            if (response.ok) {
                const assistantMessage = { role: 'assistant', content: data.result };
                setMessages((prev) => [...prev, assistantMessage]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: 'Error: No se pudo procesar tu solicitud.' },
                ]);
                setError(data.error || 'Error: No se pudo procesar tu solicitud.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Error: Ocurrió un problema al enviar la solicitud.' },
            ]);
            setError('Error: Ocurrió un problema al enviar la solicitud.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className={styles.chatContainer}>
            {/* Historial de mensajes a la izquierda */}
            <div className={styles.chatHistory}>
                <div className={styles.historyList}>
                    {/* Aquí se pueden mapear los mensajes previos si es necesario */}
                    {messages.map((msg, index) => (
                        <div key={index} className={styles.historyItem}>
                            {msg.content}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                
            </div>
            {/* Caja de chat a la derecha */}
            <div className={styles.chatBox} ref={chatBoxRef}>
                <div className={styles.messages}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`${styles.message} ${styles[msg.role]}`}>
                            {msg.content}
                        </div>
                    ))}
                    {loading && <div className={styles.messageLoading}>Asistente está escribiendo...</div>}
                </div>
            </div>

            {/* Input y botón */}
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu mensaje..."
                    className={styles.input}
                />
                <button onClick={handleSendMessage} className={styles.button}>
                    Enviar
                </button>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default ChatPage;
