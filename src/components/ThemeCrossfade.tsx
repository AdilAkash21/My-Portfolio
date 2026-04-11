// ─── Theme Crossfade Overlay ───
// Renders a cinematic ripple + fade overlay when the theme changes.
// Creates a smooth morphing transition instead of a jarring flash.

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState, useRef } from "react";

const THEME_BG: Record<string, string> = {
  dark: "hsl(222 47% 11%)",
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
          initial={{ opacity: 0.6, scale: 1.1, filter: "blur(8px)" }}
          animate={{ opacity: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setShow(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default ThemeCrossfade;
