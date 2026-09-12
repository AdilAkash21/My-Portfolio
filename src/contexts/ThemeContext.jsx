import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  isTransitioning: false
});
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme: () => {}, isTransitioning: false }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeProvider, useTheme };
