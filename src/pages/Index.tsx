import { lazy, Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollToTop from "@/components/ScrollToTop";
import ParallaxBackground from "@/components/ParallaxBackground";
import profileImg from "@/assets/profile-optimized.webp";
import logoImg from "@/assets/logo-ara.png";
import { useTheme } from "@/contexts/ThemeContext";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParallaxBackground />
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div className="text-center flex flex-col items-center">
              {/* Logo / Bat Symbol */}
              <motion.div
                className="w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-6 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {isBatman ? (
                  <svg
                    viewBox="0 0 200 110"
                    className="w-full h-auto drop-shadow-[0_0_25px_hsl(var(--primary)/0.6)]"
                    fill="hsl(var(--primary))"
                  >
                    <path d="M100 10 C100 10 95 0 88 0 C81 0 76 6 74 12 C72 18 68 22 60 22 C52 22 46 16 42 10 C38 4 34 0 28 2 C22 4 16 12 10 22 C4 32 0 46 0 56 C6 52 16 48 28 48 C40 48 48 54 54 64 C58 70 62 78 68 86 C74 94 82 100 90 104 C94 106 98 108 100 110 C102 108 106 106 110 104 C118 100 126 94 132 86 C138 78 142 70 146 64 C152 54 160 48 172 48 C184 48 194 52 200 56 C200 46 196 32 190 22 C184 12 178 4 172 2 C166 0 162 4 158 10 C154 16 148 22 140 22 C132 22 128 18 126 12 C124 6 119 0 112 0 C105 0 100 10 100 10Z" />
                  </svg>
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
              <motion.h1
                className="text-3xl sm:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {isBatman ? (
                  <>The Dark <span className="gradient-text">Knight</span></>
                ) : (
                  <>Adil Rahman <span className="gradient-text">Akash</span></>
                )}
              </motion.h1>
              {/* Progress bar */}
              <motion.div
                className="w-40 sm:w-48 h-1 rounded-full bg-muted overflow-hidden mt-6 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, delay: 0.9, ease: "easeInOut" }}
                />
              </motion.div>
              <motion.p
                className="text-muted-foreground font-mono text-sm"
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
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Navbar />
        <ScrollReveal direction="up" delay={0}>
          <HeroSection />
        </ScrollReveal>
        <Suspense fallback={null}>
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
        </Suspense>
      </motion.div>
      <ScrollToTop />
    </div>
  );
};

export default Index;
