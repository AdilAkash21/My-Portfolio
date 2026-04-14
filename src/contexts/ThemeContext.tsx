// ─── Theme Context ─── 
// Manages dark ↔ batman theme. Uses View Transitions API when available
// for buttery-smooth theme switches. Falls back to instant swap.

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

type Theme = "dark" | "batman";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  isTransitioning: false,
});

export const useTheme = () => useContext(ThemeContext);

const THEME_ORDER: Theme[] = ["dark", "batman"];

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "dark";
    }
    return "dark";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apply theme class + persist
  const applyTheme = useCallback((t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("dark", "batman");
    root.classList.add(t);
    localStorage.setItem("theme", t);
  }, []);

  // On mount, ensure class matches state
  useEffect(() => {
    applyTheme(theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTheme = useCallback(() => {
    const nextTheme = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length];
    setIsTransitioning(true);

    // Use View Transitions API if available for native smooth transition
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const transition = (document as any).startViewTransition(() => {
        applyTheme(nextTheme);
        setTheme(nextTheme);
      });
      transition.finished.then(() => setIsTransitioning(false));
    } else {
      // Fallback: just swap instantly, overlay handles the visual
      applyTheme(nextTheme);
      setTheme(nextTheme);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};
