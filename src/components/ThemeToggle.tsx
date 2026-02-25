import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    setRipple(true);
    toggleTheme();
    setTimeout(() => setRipple(false), 500);
  };

  return (
    <button
      onClick={handleClick}
      className="relative rounded-full p-2 text-muted-foreground transition-colors hover:text-primary hover:bg-accent/50 overflow-hidden"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Glow ripple */}
      <AnimatePresence>
        {ripple && (
          <motion.span
            key="ripple"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 m-auto w-full h-full rounded-full bg-primary/30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative block"
          >
            <Sun size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative block"
          >
            <Moon size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
