'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ChatPage.module.scss';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useTheme } from '../../context/ThemeContext';

interface historyChat {
    id: string;
    question: string;
    answer: string
}

// Function to fetch chat history
async function fetchChatHistory() {
    try {
        const response = await fetch('/api/history', {
            method: 'GET',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch chat history');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching chat history:', error);
        return { history: [] };
    }
}

const ChatPage = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [chatHistory, setChatHistory] = useState<historyChat[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('chat');
    const { data: session } = useSession();
    const { theme } = useTheme();

    const MIN_LENGTH = 5;
    const MAX_LENGTH = 200;

    // Fetch chat history on component mount
    useEffect(() => {
        const loadChatHistory = async () => {
            const { history } = await fetchChatHistory();
            setChatHistory(history);
        };

        loadChatHistory();
    }, []);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        // Simula un saludo inicial del asistente
        setLoading(true);
        const timeout = setTimeout(() => {
            setMessages([
                { role: 'assistant', content: `¡${t("hello")} ${session?.user?.name || 'usuario'}! ${t("message")}` },
            ]);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [t, session?.user?.name,]);

    const handleSendMessage = async () => {
        if (!input.trim()) {
            setError('El mensaje no puede estar vacío.');
            return;
        }

        if (input.length < MIN_LENGTH) {
            setError(`El mensaje debe tener al menos ${MIN_LENGTH} caracteres.`);
            return;
        }

        if (input.length > MAX_LENGTH) {
            setError(`El mensaje no puede superar los ${MAX_LENGTH} caracteres.`);
            return;
        }

        setError(''); // Limpia el error si todo está bien

        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

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
        <div className={`${styles.chatContainer} ${theme === 'dark' ? styles.dark : styles.light}`}>
            {/* Historial de mensajes a la izquierda */}
            
            <div className={styles.chatHistory}>
                <div className={styles.historyList}>
                    {chatHistory.map((chat) => (
                        <div key={chat.id} className={styles.historyItem}>
                            {/* Globo para la pregunta */}
                            <div className={`${styles.bubble} ${styles.question}`}>
                                <p>{chat.question}</p>
                            </div>
                            {/* Globo para la respuesta */}
                            <div className={`${styles.bubble} ${styles.answer}`}>
                                <p>{chat.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className={`${styles.chatRight} ${theme === 'dark' ? styles.dark : styles.light}`}>
                {/* Caja de chat a la derecha */}
                <div className={styles.chatBox} ref={chatBoxRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`${styles.message} ${styles[msg.role]}`}>
                            {msg.content}
                        </div>
                    ))}
                    {loading && <div className={styles.messageLoading}>{t("assistant")}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t("placeholderChat")}
                        className={styles.input}
                    />
                    <button onClick={handleSendMessage} className={styles.button}>
                        {t("buttonSend")}
                    </button>
                </div>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default ChatPage;