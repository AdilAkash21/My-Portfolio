// ─── Hero Section ───
// The main landing section with: profile image, name, tagline, description, and CTA buttons.
// In batman mode: shows bat-shaped profile, different text, and themed styling.
// Profile image uses an "eyelid" opening animation on first load.
// Background glow element moves with a subtle parallax effect on scroll.

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Shield, Download } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import profileImg from "@/assets/profile-optimized.webp";
import batmanImg from "@/assets/batman-profile.png";

// Preload the profile image as early as possible to avoid layout shift
const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "image";
preloadLink.type = "image/webp";
preloadLink.href = profileImg;
document.head.appendChild(preloadLink);

// SVG clip-path polygon for the bat-shaped profile image frame
const BAT_CLIP = "polygon(50% 0%, 40% 6%, 32% 1%, 22% 10%, 0% 8%, 4% 28%, 0% 48%, 6% 62%, 1% 78%, 14% 84%, 24% 100%, 38% 92%, 50% 100%, 62% 92%, 76% 100%, 86% 84%, 99% 78%, 94% 62%, 100% 48%, 96% 28%, 100% 8%, 78% 10%, 68% 1%, 60% 6%)";

const HeroSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  // Track scroll position for parallax offset on the background glow
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    node.addEventListener("mousemove", handleMove, { passive: true });
    return () => node.removeEventListener("mousemove", handleMove);
  }, []);
  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Parallax multiplier — glow moves at 30% of scroll speed
  const parallaxOffset = scrollY * 0.3;

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center pt-32 overflow-hidden">
      {/* Mouse-follow glow */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none will-change-transform transition-[left,top] duration-300 ease-out"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          background: "radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: mousePos.x === 0 && mousePos.y === 0 ? 0 : 1,
        }}
      />

      {/* Subtle background glow — parallax-scrolled radial gradient */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none will-change-transform"
        style={{ top: `calc(25% - ${parallaxOffset}px)` }}
      />

      {/* Secondary glow orb — moves at a slower parallax rate for depth */}
      <div
        className="absolute right-[10%] w-[300px] h-[300px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none will-change-transform"
        style={{ top: `calc(60% - ${parallaxOffset * 0.5}px)` }}
      />

      <div className="container mx-auto px-6">
        {/* Flex layout: text on left, image on right (reversed on mobile for image-first) */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* ─── Text Content ─── */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Greeting line */}
            <p className="font-mono text-sm text-primary mb-4">
              {isBatman ? "I am" : "Hi, my name is"}
            </p>
            {/* Main heading with gradient-highlighted last name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {isBatman ? (
                <>
                  The Dark{" "}
                  <span className="gradient-text">Knight</span>
                </>
              ) : (
                <>
                  Adil Rahman{" "}
                  <span className="gradient-text">Akash</span>
                </>
              )}
            </h1>
            {/* Subtitle / role description */}
            <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground mb-6">
              {isBatman
                ? "Software Engineer by Day. Crime-Fighting Vigilante by Night."
                : "Software Engineer & Web Developer"}
            </h2>
            {/* Brief description paragraph */}
            <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              {isBatman
                ? "The night is darkest just before the dawn. And I promise you, the dawn is coming. Gotham's silent guardian, writing clean code and cleaning up the streets."
                : "Building functional, beautiful digital experiences from Nanchong to the world."}
            </p>
            {/* CTA buttons — centered on mobile, left-aligned on desktop */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Primary CTA: View Work / Enter Batcave */}
              <a
                href={isBatman ? "#about" : "#projects"}
                className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-primary btn-float-hover hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
              >
                {isBatman ? (
                  <>
                    Enter the Batcave
                    <Shield size={16} />
                  </>
                ) : (
                  <>
                    View My Work
                    <ArrowDown size={16} />
                  </>
                )}
              </a>
              {/* Secondary CTA: Download CV (hidden in batman mode) */}
              {!isBatman && (
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground btn-float-hover hover:border-primary hover:text-primary hover:shadow-lg transition-colors"
                >
                  Download CV
                  <Download size={16} />
                </a>
              )}
            </div>
          </motion.div>

          {/* ─── Profile Image ─── */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative group">
              {/* Outer orbit ring with animated dots — visible only in dark mode */}
              {!isBatman && (
                <div className="absolute -inset-6 rounded-full animate-spin-slow pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/60 shadow-[0_0_8px_hsl(var(--primary)/0.4)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/30" />
                </div>
              )}

              {/* Inner orbit ring with dashed border — visible only in dark mode */}
              {!isBatman && (
                <div className="absolute -inset-4 rounded-full border border-dashed border-primary/10 animate-spin-slow-reverse pointer-events-none">
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
                </div>
              )}

              {/* Batman pulsing golden aura — only visible in batman mode */}
              {isBatman && (
                <div
                  className="absolute -inset-4 pointer-events-none"
                  style={{
                    clipPath: BAT_CLIP, // Bat-shaped aura
                    animation: "bat-aura-pulse 3s ease-in-out infinite", // Pulsing scale + opacity
                    background: "radial-gradient(circle, hsl(45 100% 55% / 0.15), hsl(45 100% 50% / 0.05) 60%, transparent 80%)",
                    filter: "blur(12px)",
                  }}
                />
              )}

              {/* Gradient glow behind the profile image */}
              <div
                className="absolute -inset-1 opacity-50 blur-md group-hover:opacity-75"
                style={{
                  borderRadius: isBatman ? undefined : "9999px", // Circle for dark mode
                  clipPath: isBatman ? BAT_CLIP : undefined, // Bat shape for batman mode
                  background: isBatman
                    ? "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)"
                    : "linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary) / 0.3), transparent)",
                  transition: "opacity 0.5s ease",
                }}
              />

              {/* Circle profile image — shown in dark mode */}
              <div
                className="relative w-56 h-56 sm:w-72 sm:h-72 overflow-hidden shadow-xl rounded-full"
                style={{
                  opacity: isBatman ? 0 : 1, // Hidden in batman mode
                  transition: "opacity 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  position: isBatman ? "absolute" : "relative", // Stacked positioning for crossfade
                  inset: 0,
                }}
              >
                <div className="absolute inset-0 ring-2 ring-primary/25 rounded-full z-[1]" />
                <img
                  src={profileImg}
                  alt="Adil Rahman Akash"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fetchPriority="high"
                  loading="eager"
                  width={288}
                  height={288}
                  decoding="sync"
                />
                {/* "Eyelid" opening animation — top half slides up to reveal image */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-1/2 bg-background z-10 origin-top"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* "Eyelid" opening animation — bottom half slides down */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-background z-10 origin-bottom"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Bat-shaped profile image — shown only in batman mode */}
              <div
                className="w-56 h-56 sm:w-72 sm:h-72 overflow-hidden"
                style={{
                  clipPath: BAT_CLIP, // Bat-shaped mask
                  opacity: isBatman ? 1 : 0, // Visible only in batman mode
                  transition: "opacity 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  position: isBatman ? "relative" : "absolute",
                  inset: 0,
                  boxShadow: "0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.15)",
                }}
              >
                <div
                  className="absolute inset-0 ring-2 ring-primary/25 z-[1]"
                  style={{ clipPath: BAT_CLIP }}
                />
                <img
                  src={batmanImg}
                  alt="Batman"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  width={288}
                  height={288}
                />
                {/* Dark vignette overlay for cinematic effect */}
                <div
                  className="absolute inset-0 pointer-events-none z-[2]"
                  style={{
                    background: "radial-gradient(circle, transparent 40%, hsl(240 10% 4% / 0.4) 100%)",
                  }}
                />
              </div>

              {/* Status badge — green "Available" or red "Unavailable" (batman mode) */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-lg ring-1 ring-border z-10">
                <span className="relative flex h-2 w-2">
                  {/* Pinging animation ring */}
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{
                      backgroundColor: isBatman ? "hsl(0 84% 60%)" : "hsl(142 71% 45%)",
                    }}
                  />
                  {/* Solid dot */}
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{
                      backgroundColor: isBatman ? "hsl(0 84% 50%)" : "hsl(142 76% 36%)",
                    }}
                  />
                </span>
                <span className="text-xs font-medium text-foreground">
                  {isBatman ? "Unavailable" : "Available"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
