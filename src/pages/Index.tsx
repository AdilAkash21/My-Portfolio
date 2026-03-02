import { lazy, Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div className="text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              />
              <motion.h1
                className="text-3xl sm:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Adil Rahman <span className="gradient-text">Akash</span>
              </motion.h1>
              <motion.p
                className="text-muted-foreground font-mono text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
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
    </div>
  );
};

export default Index;
