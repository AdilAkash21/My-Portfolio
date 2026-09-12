import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
const ScrollToTopButton = forwardRef(
  ({ onClick }, ref) => <motion.button
    ref={ref}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
    className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-primary/20 backdrop-blur-sm transition-colors hover:bg-primary/90"
    aria-label="Scroll to top"
  >
      <ArrowUp size={18} />
    </motion.button>
);
ScrollToTopButton.displayName = "ScrollToTopButton";
const ScrollToTop = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={ref}>
      <AnimatePresence>
        {visible && <ScrollToTopButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />}
      </AnimatePresence>
    </div>;
});
ScrollToTop.displayName = "ScrollToTop";
var stdin_default = ScrollToTop;
export {
  stdin_default as default
};
