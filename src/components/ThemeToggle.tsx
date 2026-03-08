import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const BatIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 70"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="
      M50 3 C48 3,46 0,44 6 C42 12,42 16,40 14 C38 12,36 0,34 6
      C32 12,32 18,28 18 C24 18,16 14,10 20 C4 26,0 34,0 40
      C0 44,2 46,6 46 C10 46,16 44,22 48 C18 54,14 58,14 62
      C14 66,18 68,24 66 C28 64,32 60,36 64 C38 68,40 76,44 72
      C46 70,48 82,50 90 C52 82,54 70,56 72 C60 76,62 68,64 64
      C68 60,72 64,76 66 C82 68,86 66,86 62 C86 58,82 54,78 48
      C84 44,90 46,94 46 C98 46,100 44,100 40 C100 34,96 26,90 20
      C84 14,76 18,72 18 C68 18,68 12,66 6 C64 0,62 12,60 14
      C58 16,58 12,56 6 C54 0,52 3,50 3 Z
    " />
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
