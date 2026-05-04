import { createContext, useContext, useEffect, useState, useCallback } from "react";
const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {
  },
  isTransitioning: false
});
const useTheme = () => useContext(ThemeContext);
const THEME_ORDER = ["dark", "batman"];
const THEME_BG = {
  dark: "hsl(222, 47%, 11%)",
  batman: "hsl(240, 10%, 6%)"
};
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const applyTheme = useCallback((t) => {
    const root = document.documentElement;
    root.classList.remove("dark", "batman");
    root.classList.add(t);
    localStorage.setItem("theme", t);
  }, []);
  useEffect(() => {
    applyTheme(theme);
  }, []);
  const toggleTheme = useCallback(() => {
    const currentTheme = theme;
    const nextTheme = THEME_ORDER[(THEME_ORDER.indexOf(currentTheme) + 1) % THEME_ORDER.length];
    setIsTransitioning(true);
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
    overlay.getBoundingClientRect();
    applyTheme(nextTheme);
    setTheme(nextTheme);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.opacity = "0";
        const onEnd = () => {
          overlay.remove();
          setIsTransitioning(false);
        };
        overlay.addEventListener("transitionend", onEnd, { once: true });
        setTimeout(onEnd, 600);
      });
    });
  }, [theme, applyTheme]);
  return <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>;
};
export {
  ThemeProvider,
  useTheme
};
