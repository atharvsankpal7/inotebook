import React, { useState, useRef, useEffect } from "react";
import "../css/chatbot.css";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you?", isUser: false },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        // Scroll to the bottom when messages change
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault(); // to avoid reloading due to the use of `form` tag

        if (newMessage.trim() === "") return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: newMessage, isUser: true },
        ]);

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: "Sure thing! I am just a demo chatbot.",
                    isUser: false,
                },
            ]);
        }, 500);

        setNewMessage("");
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <div className="chatbox">
                        {messages.map((msg, index) => (
                            <div className="d-grid w-100" key={index}>
                                <div
                                    className={
                                        msg.isUser
                                            ? "user-message"
                                            : "bot-message"
                                    }
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div>
                    <form onSubmit={handleSendMessage}>
                        <div className="input-group mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
