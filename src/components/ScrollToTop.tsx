// ─── Scroll To Top Button ───
// A floating button that appears in the bottom-right corner after scrolling
// past 400px. Clicking it smoothly scrolls the page back to the top.
// Uses Framer Motion for enter/exit animations.

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false); // Whether the button is shown

  // Listen for scroll events and show/hide the button based on scroll position
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }} // Start small and transparent
          animate={{ opacity: 1, scale: 1 }} // Grow to full size
          exit={{ opacity: 0, scale: 0.8 }} // Shrink on exit
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // Smooth scroll to top
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-primary/20 backdrop-blur-sm transition-colors hover:bg-primary/90"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
