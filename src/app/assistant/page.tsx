'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ChatPage.module.scss';
import {useTranslations} from 'next-intl';
import { useSession } from 'next-auth/react';

const ChatPage = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('chat');
    const { data: session } = useSession();

    const MIN_LENGTH = 5; 
    const MAX_LENGTH = 200; 

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
                { role: 'assistant', content: `¡Hola ${session?.user?.name || 'usuario'}! ¿En qué puedo ayudarte hoy?` },
            ]);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [session?.user?.name]);

    useEffect(() => {
        // Simula un saludo inicial del asistente
        setLoading(true);
        const timeout = setTimeout(() => {
            setMessages([
                { role: 'assistant', content: `¡Hola ${session?.user?.name || 'usuario'}! ¿En qué puedo ayudarte hoy?` },
            ]);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [session?.user?.name]);

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
        <div className={styles.chatContainer}>
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
                    onKeyDown={handleKeyDown} // Agregado el evento onKeyDown
                    placeholder={t("placeholderChat")}
                    className={styles.input}
                />
                <button onClick={handleSendMessage} className={styles.button}>
                {t("buttonSend")}
                </button>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default ChatPage;
