// ─── Theme Context ─── 
// Manages the application's theme state (dark ↔ batman).
// Stores the selected theme in localStorage for persistence across sessions.
// Applies the theme as a CSS class on <html> so CSS variables in index.css take effect.

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Only two themes are supported: dark mode and batman mode
type Theme = "dark" | "batman";

// Shape of the context value
interface ThemeContextType {
  theme: Theme; // Current active theme
  toggleTheme: () => void; // Cycles to the next theme in the order
}

// Default context (used if no provider is found — shouldn't happen in practice)
const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

// Custom hook for consuming the theme context
export const useTheme = () => useContext(ThemeContext);

// The order in which themes cycle when the toggle button is clicked
const THEME_ORDER: Theme[] = ["dark", "batman"];

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize theme from localStorage, defaulting to "dark"
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "dark";
    }
    return "dark";
  });

  // When theme changes: update the <html> class and persist to localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "batman"); // Remove all theme classes
    root.classList.add(theme); // Apply the new theme class
    localStorage.setItem("theme", theme); // Persist for next visit
  }, [theme]);

  // Toggle to the next theme in the cycle
  const toggleTheme = () =>
    setTheme((t) => {
      const idx = THEME_ORDER.indexOf(t);
      return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
