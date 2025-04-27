import React, { useState } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import ExpertCard from "./components/ExpertCard";
import ChatWindow from "./components/ChatWindow";
import styles from "./App.module.css";

// Define your experts here
const EXPERTS = [
  {
    key: "finance",
    name: "Finance Guru",
    description: "Personal finance, investing & money advice.",
    icon: "💸"
  },
  {
    key: "gaming",
    name: "Gaming Pro",
    description: "Game tips, strategy, and recommendations.",
    icon: "🎮"
  },
  {
    key: "programming",
    name: "Code Mentor",
    description: "Coding help, debugging, and system design.",
    icon: "💻"
  }
];

function AppContent() {
  const [selected, setSelected] = useState(null);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.bg} data-theme={theme}>
      <button
        style={{position: 'absolute', top: 24, right: 32, zIndex: 2}}
        onClick={toggleTheme}
        aria-label="Toggle dark/light mode"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      <div className={styles.container}>
        <h1 className={styles.title}>Multi-Agent AI Playground</h1>
        <p className={styles.subtitle}>
          Choose an expert and start chatting!
        </p>
        <div className={styles.cardRow}>
          {EXPERTS.map((exp) => (
            <ExpertCard
              key={exp.key}
              name={exp.name}
              description={exp.description}
              icon={exp.icon}
              onClick={() => setSelected(exp)}
            />
          ))}
        </div>
      </div>
      {selected && (
        <ChatWindow agent={selected} onClose={() => setSelected(null)} theme={theme} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
