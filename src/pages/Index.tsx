import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollToTop from "@/components/ScrollToTop";
import ParallaxBackground from "@/components/ParallaxBackground";
import profileImg from "@/assets/profile-optimized.webp";
import logoImg from "@/assets/logo-ara.png";
import { useTheme } from "@/contexts/ThemeContext";
import batLogoImg from "@/assets/bat-logo-gold.png";

// Preload bat logo for instant display
const preloadBatLogo = document.createElement("link");
preloadBatLogo.rel = "preload";
preloadBatLogo.as = "image";
preloadBatLogo.href = batLogoImg;
document.head.appendChild(preloadBatLogo);
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// ─── Particle burst component ───
const ParticleBurst = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * 360;
        const rad = (angle * Math.PI) / 180;
        const dist = 60 + Math.random() * 50;
        return {
          id: i,
          x: Math.cos(rad) * dist,
          y: Math.sin(rad) * dist,
          size: 2 + Math.random() * 3,
          delay: Math.random() * 0.15,
        };
      }),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{ width: p.size, height: p.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// ─── Staggered word component ───
const StaggeredWords = ({
  words,
  highlightLast,
}: {
  words: string[];
  highlightLast?: boolean;
}) => (
  <span className="inline-flex flex-wrap justify-center gap-x-3">
    {words.map((word, i) => (
      <motion.span
        key={i}
        className={
          highlightLast && i === words.length - 1 ? "gradient-text" : ""
        }
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: 0.6 + i * 0.15,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {word}
      </motion.span>
    ))}
  </span>
);

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(false);
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const steps = duration / interval;
    const startDelay = 900; // matches progress bar delay
    let step = 0;
    let started = false;

    const startTimer = setTimeout(() => {
      started = true;
      const counter = setInterval(() => {
        step++;
        const val = Math.min(Math.round((step / steps) * 100), 100);
        setProgress(val);
        if (val >= 100) {
          clearInterval(counter);
          setBurst(true);
        }
      }, interval);
      // cleanup ref
      (window as any).__introCounter = counter;
    }, startDelay);

    const hideTimer = setTimeout(() => setShowIntro(false), 4200);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
      if ((window as any).__introCounter) clearInterval((window as any).__introCounter);
    };
  }, []);

  const nameWords = isBatman ? ["The", "Dark", "Knight"] : ["Adil", "Rahman", "Akash"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParallaxBackground />
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
              clipPath: "inset(50% 0% 50% 0%)",
              opacity: 0,
              scale: 1.08,
            }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Cinematic curtain overlays on exit */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 bg-background z-10 origin-top"
              initial={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-background z-10 origin-bottom"
              initial={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.div className="text-center flex flex-col items-center relative z-20">
              {/* Logo / Bat Symbol — blur-to-sharp focus */}
              <motion.div
                className="w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-6 flex items-center justify-center"
                initial={{ scale: 1.3, opacity: 0, filter: "blur(18px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {isBatman ? (
                  <img
                    src={batLogoImg}
                    alt="Bat Symbol"
                    className="w-full h-full object-contain drop-shadow-[0_0_25px_hsl(var(--primary)/0.6)]"
                    fetchPriority="high"
                    loading="eager"
                    decoding="sync"
                  />
                ) : (
                  <img
                    src={logoImg}
                    alt="ARA Logo"
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
                    fetchPriority="high"
                    loading="eager"
                    decoding="sync"
                  />
                )}
              </motion.div>

              {/* Staggered name reveal */}
              <h1 className="text-3xl sm:text-4xl font-bold">
                <StaggeredWords words={nameWords} highlightLast />
              </h1>

              {/* Progress bar with glow */}
              <motion.div
                className="relative w-40 sm:w-48 h-1.5 rounded-full bg-muted overflow-hidden mt-6 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <motion.div
                  className="h-full rounded-full bg-primary relative"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, delay: 0.9, ease: "easeInOut" }}
                >
                  {/* Glow trail */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary/50 blur-md" />
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 1.2,
                      delay: 1.5,
                      repeat: 2,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Percentage + particle burst */}
              <div className="relative">
                <motion.p
                  className="text-muted-foreground font-mono text-sm tabular-nums"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  {progress}%
                </motion.p>
                {burst && <ParticleBurst />}
              </div>

              <motion.p
                className="text-muted-foreground font-mono text-xs mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
              >
                {isBatman ? "Initializing Batcomputer..." : "Loading experience..."}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ visibility: showIntro ? "hidden" : "visible" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Navbar />
        <ScrollReveal direction="up" delay={0}>
          <HeroSection />
        </ScrollReveal>
          <ScrollReveal direction="up" delay={0}>
            <AboutSection />
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.05}>
            <SkillsSection />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.05}>
            <ProjectsSection />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.05}>
            <ContactSection />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0} duration={0.4}>
            <Footer />
          </ScrollReveal>
      </motion.div>
      <ScrollToTop />
    </div>
  );
};

export default Index;
