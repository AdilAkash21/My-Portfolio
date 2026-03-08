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
    <path d="M12 0C12 0 9 5 6.5 7C4.5 8.5 1 9.5 0 10C1.5 10.5 3.5 11.5 5 13C3.5 14 2 16 1 19C3 17 5.5 15.5 8 15C9 17.5 10.5 20 12 24C13.5 20 15 17.5 16 15C18.5 15.5 21 17 23 19C22 16 20.5 14 19 13C20.5 11.5 22.5 10.5 24 10C23 9.5 19.5 8.5 17.5 7C15 5 12 0 12 0ZM12 8C13 8 14 9 14 10.5C14 11.5 13.5 12.5 12 14C10.5 12.5 10 11.5 10 10.5C10 9 11 8 12 8Z" />
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
      ? "Switch to Batman mode"
      : "Switch to dark mode";

  const iconKey = theme === "dark" ? "bat" : "moon";

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
          {iconKey === "moon" && <Moon size={18} />}
          {iconKey === "bat" && <BatIcon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
