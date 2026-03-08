import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const BatIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 60"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M50 0 C48 4, 44 8, 42 6 C40 4, 38 2, 36 8 C34 14, 30 12, 24 16 C18 20, 10 22, 0 28 C4 32, 12 34, 20 36 C16 40, 20 44, 28 48 C34 52, 38 56, 44 48 C47 44, 49 58, 50 60 C51 58, 53 44, 56 48 C62 56, 66 52, 72 48 C80 44, 84 40, 80 36 C88 34, 96 32, 100 28 C90 22, 82 20, 76 16 C70 12, 66 14, 64 8 C62 2, 60 4, 58 6 C56 8, 52 4, 50 0Z" />
  </svg>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    setRipple(true);
    toggleTheme();
    setTimeout(() => setRipple(false), 500);
  };

  const label =
    theme === "dark"
      ? "Switch to light mode"
      : theme === "light"
      ? "Switch to Batman mode"
      : "Switch to dark mode";

  const iconKey = theme === "dark" ? "sun" : theme === "light" ? "bat" : "moon";

  return (
    <button
      onClick={handleClick}
      className="relative rounded-full p-2 text-muted-foreground transition-colors hover:text-primary hover:bg-accent/50 overflow-hidden"
      aria-label={label}
    >
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

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={iconKey}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="relative block"
        >
          {iconKey === "sun" && <Sun size={18} />}
          {iconKey === "moon" && <Moon size={18} />}
          {iconKey === "bat" && <BatIcon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
