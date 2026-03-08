import { lazy, Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollToTop from "@/components/ScrollToTop";
import ParallaxBackground from "@/components/ParallaxBackground";
import profileImg from "@/assets/profile-optimized.webp";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
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
              {/* Circular profile logo */}
              <motion.div
                className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-lg shadow-primary/10"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <img
                  src={profileImg}
                  alt="Adil Rahman Akash"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                />
              </motion.div>
              <motion.h1
                className="text-3xl sm:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Adil Rahman <span className="gradient-text">Akash</span>
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
                  transition={{ duration: 2.0, delay: 0.9, ease: "easeInOut" }}
                />
              </motion.div>
              <motion.p
                className="text-muted-foreground font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
              >
                Loading experience...
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
