import React, { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is a bot reply", sender: "bot" },
      ]);
    }, 1000);
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        fontSize: "20px",
        position: "fixed",
        bottom: 20,
        right: 20,
        top:20,
        width: 600,
        height: "calc(100vh - 40px)",
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
        boxShadow: "0 10px 15px rgba(0,0,0,0.2)",
        overflow: "hidden",
        backgroundColor: "white",
        
      }}
    >
      {/* Messages area */}
      <div
        style={{
          flex: 1,
          padding: 16,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.sender === "user" ? "#1976d2" : "#e0e0e0",
              color: msg.sender === "user" ? "white" : "black",
              padding: "8px 12px",
              borderRadius: 12,
              maxWidth: "70%",
            }}
          >
            {msg.text}
          </div>
        ))}
        {/* Dummy div to scroll into */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div style={{ display: "flex", padding: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" , fontSize : "20px"}}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: 8,
            padding: "8px 16px",
            borderRadius: 8,
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
