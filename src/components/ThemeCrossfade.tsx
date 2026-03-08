import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState, useRef } from "react";

const THEME_BG: Record<string, string> = {
  dark: "hsl(222 47% 11%)",
  light: "hsl(209 40% 96%)",
  batman: "hsl(240 10% 6%)",
};

const ThemeCrossfade = () => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const prevTheme = useRef(theme);

  useEffect(() => {
    if (prevTheme.current !== theme) {
      setShow(true);
      prevTheme.current = theme;
    }
  }, [theme]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={theme}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{ backgroundColor: THEME_BG[theme] || THEME_BG.dark }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          onAnimationComplete={() => setShow(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default ThemeCrossfade;
