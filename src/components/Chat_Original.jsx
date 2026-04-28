import { useState } from "react"


const Chat = () => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSend = () => {
        if (input.trim() === "") return; // Evita mensajes vacíos

        const newMessage = {
            id: crypto.randomUUID(), // La clave del éxito
            user: "user", // harcode, sino se toma del contexto o props
            text: input
        };

        setMessages([...messages, newMessage]);
        setInput(""); // Limpia el input
        setIsLoading(true);

        fetch('/api/v1/chat/completions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${""}`
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
                    user: data.choices[0].message.role, // "assistant"
                    text: data.choices[0].message.content
                };
                setMessages(prev => [...prev, respuestaIA]);
            })
            .catch(error => console.error("Error:", error))
            .finally(() => setIsLoading(false))

    }



    // Para que también envíe con la tecla Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    }



    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat</h2>
            </div>
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className="message">
                        <strong>{msg.user}: </strong>
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>
            {isLoading && <div className="chat-loading">Procesando respuesta...</div>}
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Mensaje..."
                />
                <button onClick={handleSend}>Enviar</button>
            </div>
        </div>
    )
}

export default Chat
