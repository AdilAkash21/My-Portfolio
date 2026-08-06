import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" }
];
const HamburgerIcon = ({ isOpen }) => <div className="w-6 h-5 relative flex flex-col justify-between">
    <motion.span
  className="block h-[2px] w-6 bg-foreground rounded-full origin-left"
  animate={isOpen ? { rotate: 45, x: 2, y: -1 } : { rotate: 0, x: 0, y: 0 }}
  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
/>
    <motion.span
  className="block h-[2px] w-6 bg-foreground rounded-full"
  animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
  transition={{ duration: 0.2, ease: "easeInOut" }}
/>
    <motion.span
  className="block h-[2px] w-6 bg-foreground rounded-full origin-left"
  animate={isOpen ? { rotate: -45, x: 2, y: 1 } : { rotate: 0, x: 0, y: 0 }}
  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
/>
  </div>;
const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 }
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, x: -16, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, x: -16, filter: "blur(4px)", transition: { duration: 0.2 } }
};
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onPointer(e) {
      if (!menuRef.current || !buttonRef.current) return;
      const target = e.target;
      if (open && !menuRef.current.contains(target) && !buttonRef.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
    };
  }, [open]);

  useEffect(() => {
    const doc = document.documentElement;
    const prev = doc.style.overflow;
    if (open) doc.style.overflow = 'hidden';
    else doc.style.overflow = prev || '';
    return () => { doc.style.overflow = prev || ''; };
  }, [open]);

  useEffect(() => {
    if (open) {
      const firstLink = menuRef.current && menuRef.current.querySelector('a[href]');
      if (firstLink) firstLink.focus();
    } else {
      if (buttonRef.current) buttonRef.current.focus();
    }
  }, [open]);

  return <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      {
    /* Scroll progress bar */
  }
      <motion.div
    className="absolute bottom-0 left-0 h-[2px] bg-primary"
    style={{
      width: progressWidth,
      boxShadow: "0 0 8px hsl(var(--primary) / 0.6), 0 0 16px hsl(var(--primary) / 0.3)"
    }}
  />

      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <a href="#home" className="font-mono text-lg font-semibold text-primary flex items-center gap-2">
            {"< ARA />"}
          </a>
        </div>

        {
    /* Desktop nav */
  }
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((l) => <li key={l.href}>
                <a
    href={l.href}
    onClick={(e) => {
      // desktop navigation: allow smooth Lenis scrolling if available, otherwise native smooth scroll
      const id = l.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        // use Lenis if available
        try {
          // eslint-disable-next-line no-undef
          if (window.lenis && typeof window.lenis.scrollTo === 'function') {
            window.lenis.scrollTo(el);
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (err) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }}
    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover-underline pb-0.5"
    aria-label={`Navigate to ${l.label}`}
  >
                    {l.label}
                </a>
              </li>)}

          </ul>
        </div>

        {
    /* Mobile: theme toggle + morphing hamburger */
  }
        <div className="flex md:hidden items-center gap-3">
          <button
            ref={buttonRef}
            onClick={() => setOpen(!open)}
            className="p-1 text-foreground"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
                    <HamburgerIcon isOpen={open} />
                  </button>
                </div>
      </div>

      {
    /* Mobile dropdown — smooth height + staggered items */
  }
      <AnimatePresence>
        {open && <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              aria-hidden="true"
              onClick={() => setOpen(false)}
            />

            <motion.div
              id="mobile-menu"
              ref={menuRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden border-b border-border bg-background/95 backdrop-blur-lg will-change-[height] z-50 relative"
            >
              <motion.ul
                className="flex flex-col gap-0.5 px-6 py-4"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navLinks.map((l, i) => <motion.li key={l.href} variants={itemVariants}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        // close menu and perform smooth scroll to target id
                        setOpen(false);
                        const id = l.href.replace('#', '');
                        const el = document.getElementById(id);
                        if (el) {
                          // prevent native hash change; use Lenis if available
                          e.preventDefault();
                          try {
                            // eslint-disable-next-line no-undef
                            if (window.lenis && typeof window.lenis.scrollTo === 'function') {
                              window.lenis.scrollTo(el);
                            } else {
                              el.scrollIntoView({ behavior: 'smooth' });
                            }
                          } catch (err) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                      className="block py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-primary hover:pl-2"
                    >
                      <span className="font-mono text-primary/50 text-xs mr-2">0{i + 1}.</span>
                      {l.label}
                    </a>
                  </motion.li>)}
              </motion.ul>
            </motion.div>
          </>}
      </AnimatePresence>
    </nav>;
};
var stdin_default = Navbar;
export {
  stdin_default as default
};
