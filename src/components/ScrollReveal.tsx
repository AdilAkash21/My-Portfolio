// ─── Scroll Reveal Wrapper ───
// Wraps child elements in a Framer Motion container that fades them in
// when they enter the viewport. Uses opacity-only animation to avoid
// interfering with scroll position (no translateY, blur, or scale).
// Re-triggers each time the element enters/exits the viewport (once: false).

import { motion, type Variant } from "framer-motion";
import { type ReactNode } from "react";

// Direction type (kept for API compatibility but not used in animation)
type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction; // Legacy prop — animation is opacity-only regardless
  delay?: number; // Delay before the animation starts (seconds)
  duration?: number; // How long the fade-in takes (seconds)
  className?: string;
}

const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.5,
  className,
}: ScrollRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Start invisible
      whileInView={{ opacity: 1 }} // Fade to fully visible when in viewport
      viewport={{ once: false, amount: 0.15 }} // Re-trigger; fire when 15% visible
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
