import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce"; // Import AuthContext

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const { token } = useContext(AuthContext); // Get the access token

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Make the API call to your backend
    try {
      const response = await fetch("http://localhost:9090/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Send the access token in the Authorization header
          
        },
        body: JSON.stringify({ prompt: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error("Failed to get a response from the LLM backend.");
      }

      const data = await response.json();

      // Add the bot's reply to the chat
      setMessages((prev) => [
        ...prev,
        { text: data.reply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error calling LLM API:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error: Could not get a reply.", sender: "bot" },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    // ... rest of your JSX code is the same
    <div
      style={{
        fontSize: "20px",
        position: "fixed",
        bottom: 20,
        right: 20,
        top: 20,
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
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", padding: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc", fontSize: "20px" }}
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