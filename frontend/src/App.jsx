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
  },
  {
    key: "travel",
    name: "Travel Guide",
    description: "Trip planning, destinations, and travel tips.",
    icon: "🌍"
  },
  {
    key: "health",
    name: "Health Coach",
    description: "Wellness, nutrition, and fitness advice.",
    icon: "🏋️"
  },
  {
    key: "history",
    name: "History Buff",
    description: "World history, ancient civilizations, events.",
    icon: "📜"
  },
  {
    key: "cooking",
    name: "Chef Bot",
    description: "Recipes, cooking tips, and kitchen advice.",
    icon: "👨‍🍳"
  },
  {
    key: "science",
    name: "Science Wiz",
    description: "Physics, chemistry, biology, astronomy help.",
    icon: "🔬"
  },
  {
    key: "sports",
    name: "Sports Analyst",
    description: "Sports stats, insights, and predictions.",
    icon: "🏆"
  },
  {
    key: "art",
    name: "Art Critic",
    description: "Art movements, techniques, and analysis.",
    icon: "🎨"
  },
  {
    key: "movies",
    name: "Movie Buff",
    description: "Film recommendations, reviews, and trivia.",
    icon: "🎬"
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
