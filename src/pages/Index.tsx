import { useState, useEffect } from "react";
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
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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
