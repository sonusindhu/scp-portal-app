import React from "react";

export const ThemeToggle: React.FC<{ theme: string; setTheme: (t: string) => void }> = ({ theme, setTheme }) => (
  <button
    aria-label="Toggle dark mode"
    style={{ marginLeft: 16 }}
    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  >
    {theme === "light" ? "🌙" : "☀️"}
  </button>
);
