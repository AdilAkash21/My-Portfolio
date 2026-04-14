// ─── Theme Crossfade Overlay ───
// Full-screen overlay that covers the CSS variable swap, then reveals the new theme
// with a cinematic animation. Works with View Transitions API for extra smoothness.

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState, useRef } from "react";

const ThemeCrossfade = () => {
  const { theme, isTransitioning } = useTheme();
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const prevTheme = useRef(theme);

  useEffect(() => {
    if (prevTheme.current !== theme) {
      prevTheme.current = theme;
      // Phase 1: cover screen instantly
      setPhase("cover");
      // Phase 2: reveal after a brief hold (let CSS vars settle)
      const t = setTimeout(() => setPhase("reveal"), 80);
      return () => clearTimeout(t);
    }
  }, [theme]);

  const handleRevealComplete = () => {
    setPhase("idle");
  };

  if (phase === "idle") return null;

  return (
    <>
      {/* Cover phase: instant opaque overlay to hide the CSS variable swap */}
      {phase === "cover" && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none bg-background"
          style={{ willChange: "opacity" }}
        />
      )}

      {/* Reveal phase: animate the overlay away */}
      {phase === "reveal" && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={handleRevealComplete}
        />
      )}
    </>
  );
};

export default ThemeCrossfade;
