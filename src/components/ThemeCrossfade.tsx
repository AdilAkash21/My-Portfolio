// ─── Theme Crossfade Overlay ───
// Renders a brief full-screen colored overlay when the theme changes.
// This masks the instant CSS variable swap, creating a smooth visual bridge
// between themes instead of a jarring flash.

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState, useRef } from "react";

// Map each theme to its background color for the crossfade overlay
const THEME_BG: Record<string, string> = {
  dark: "hsl(222 47% 11%)", // Dark mode background
  batman: "hsl(240 10% 6%)", // Batman mode background (near-black)
};

const ThemeCrossfade = () => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false); // Whether the overlay is visible
  const prevTheme = useRef(theme); // Track previous theme to detect changes

  useEffect(() => {
    // Only show the overlay when the theme actually changes
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
          className="fixed inset-0 z-[9999] pointer-events-none" // Covers entire screen, doesn't block clicks
          style={{ backgroundColor: THEME_BG[theme] || THEME_BG.dark }}
          initial={{ opacity: 0.4 }} // Start partially visible
          animate={{ opacity: 0 }} // Fade to transparent
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} // Smooth ease-out curve
          onAnimationComplete={() => setShow(false)} // Remove from DOM when done
        />
      )}
    </AnimatePresence>
  );
};

export default ThemeCrossfade;
