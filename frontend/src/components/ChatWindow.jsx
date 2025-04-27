// ChatWindow.jsx
// Chat UI for conversation with selected expert
// Props: agent, onClose
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./ChatWindow.module.css";

const ChatWindow = ({ agent, onClose, theme }) => {
  const [messages, setMessages] = useState([
    { role: "agent", content: `Hi! I'm your ${agent.name}. Ask me anything.` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send user message to backend and get agent reply
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    setInput("");
    try {
      const res = await fetch("http://127.0.0.1:8000/ask_agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent: agent.key, question: input })
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "agent", content: data.answer || data.error || "(No response)" }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: "agent", content: "Error contacting backend." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => setInput(e.target.value);
  const handleKeyDown = (e) => { if (e.key === "Enter") sendMessage(); };

  return (
    <div className={styles.overlay} data-theme={theme}>
      <div className={styles.window + ' ' + styles[theme]}>
        <div className={styles.header}>
          <span>{agent.icon} {agent.name}</span>
          <button className={styles.close} onClick={onClose}>×</button>
        </div>
        <div className={styles.body}>
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? `${styles.userMsg} ${styles[theme]}` : `${styles.agentMsg} ${styles[theme]}`}>
              {msg.role === "agent" ? (
                <ReactMarkdown
                  components={{
                    code({node, inline, className, children, ...props}) {
                      return inline ? (
                        <code className={styles.inlineCode} {...props}>{children}</code>
                      ) : (
                        <pre className={styles.codeBlock}><code {...props}>{children}</code></pre>
                      );
                    }
                  }}
                >{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className={styles.inputBar}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={loading}
            style={{ color: '#111', background: theme === 'dark' ? 'rgba(40,40,40,0.93)' : 'rgba(255,255,255,0.85)', border: theme === 'dark' ? '1px solid #444' : '1px solid #e3e6f3' }}
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
