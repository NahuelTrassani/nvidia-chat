import { useState, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import "./Chat.css"

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    // useEffect: scroll automático al último mensaje
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isLoading])

    const handleSend = () => {
        if (input.trim() === "" || isLoading) return

        const newMessage = {
            id: crypto.randomUUID(),
            user: "user",
            text: input
        }

        setMessages(prev => [...prev, newMessage])
        setInput("")
        setIsLoading(true)

        fetch('/api/v1/chat/completions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // authorization: `Bearer ${}`
            },
            body: JSON.stringify({
                model: "meta/llama-3.1-8b-instruct",
                messages: [...messages, newMessage].map(msg => ({
                    role: msg.user === "user" ? "user" : "assistant",
                    content: msg.text
                }))
            })
        })
            .then(response => response.json())
            .then(data => {
                const respuestaIA = {
                    id: crypto.randomUUID(),
                    user: "assistant",
                    text: data.choices[0].message.content
                }
                setMessages(prev => [...prev, respuestaIA])
            })
            .catch(error => console.error("Error:", error))
            .finally(() => setIsLoading(false))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) handleSend()
    }

    // Componente para renderizar código con syntax highlighting
    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            )
        }
    }

    return (
        <div className="chat-wrapper">
            <div className="chat-header">
                <div className="chat-header-dot" />
                <h2>NVIDIA Chat</h2>
                <span className="chat-header-model">llama-3.1-8b-instruct</span>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.user}`}>
                        <div className="message-meta">
                            <div className="message-avatar">
                                {msg.user === "user" ? "U" : "AI"}
                            </div>
                            <span className="message-label">
                                {msg.user === "user" ? "Vos" : "Llama"}
                            </span>
                        </div>
                        <div className="message-content">
                            {msg.user === "assistant" ? (
                                <ReactMarkdown components={components}>
                                    {msg.text}
                                </ReactMarkdown>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="chat-loading">
                        <div className="chat-loading-dots">
                            <span /><span /><span />
                        </div>
                        <span className="chat-loading-text">pensando...</span>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-wrapper">
                <div className="chat-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Escribí tu mensaje..."
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading}>
                        <svg className="send-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat