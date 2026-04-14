// ─── Theme Context ─── 
// Manages dark ↔ batman theme with smooth transitions.

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

// Pre-computed background colors matching CSS variables
const THEME_BG: Record<Theme, string> = {
  dark: "hsl(222, 47%, 11%)",
  batman: "hsl(240, 10%, 6%)",
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "dark";
    }
    return "dark";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const applyTheme = useCallback((t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("dark", "batman");
    root.classList.add(t);
    localStorage.setItem("theme", t);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTheme = useCallback(() => {
    const currentTheme = theme;
    const nextTheme = THEME_ORDER[(THEME_ORDER.indexOf(currentTheme) + 1) % THEME_ORDER.length];
    
    setIsTransitioning(true);

    // Create a snapshot overlay with the CURRENT theme's bg color
    // This covers the screen BEFORE we swap CSS variables
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: ${THEME_BG[currentTheme]};
      opacity: 1;
      pointer-events: none;
      transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1);
      will-change: opacity;
    `;
    document.body.appendChild(overlay);

    // Force a paint so the overlay is visible before we swap
    overlay.getBoundingClientRect();

    // Now swap the theme (CSS variables change instantly, but hidden by overlay)
    applyTheme(nextTheme);
    setTheme(nextTheme);

    // Next frame: start fading the overlay to reveal the new theme
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.opacity = "0";
        
        const onEnd = () => {
          overlay.remove();
          setIsTransitioning(false);
        };
        overlay.addEventListener("transitionend", onEnd, { once: true });
        // Safety timeout
        setTimeout(onEnd, 600);
      });
    });
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};
