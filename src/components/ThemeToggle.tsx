import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const BatIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C12 2 7.5 8 4 9.5C2 10.4 0.5 11 0 12C1 12 3 12 4.5 13C3 14.5 2 16.5 1.5 19C3.5 17 5.5 16 7.5 15.5C8.5 17 10 19.5 12 22C14 19.5 15.5 17 16.5 15.5C18.5 16 20.5 17 22.5 19C22 16.5 21 14.5 19.5 13C21 12 23 12 24 12C23.5 11 22 10.4 20 9.5C16.5 8 12 2 12 2Z" />
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
