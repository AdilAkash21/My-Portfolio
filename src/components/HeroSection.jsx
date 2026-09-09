import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Shield, Download } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import Magnetic from "@/components/ui/Magnetic";
import profileImg from "@/assets/profile-optimized.webp";
import ShaderBackground from "@/components/ShaderBackground";
const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "image";
preloadLink.type = "image/webp";
preloadLink.href = profileImg;
document.head.appendChild(preloadLink);
const BAT_CLIP = "polygon(50% 0%, 40% 6%, 32% 1%, 22% 10%, 0% 8%, 4% 28%, 0% 48%, 6% 62%, 1% 78%, 14% 84%, 24% 100%, 38% 92%, 50% 100%, 62% 92%, 76% 100%, 86% 84%, 99% 78%, 94% 62%, 100% 48%, 96% 28%, 100% 8%, 78% 10%, 68% 1%, 60% 6%)";
const HeroSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useCallback((_node) => {
  }, []);
  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  const parallaxOffset = scrollY * 0.3;
  return <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center pt-32 overflow-hidden">

      {
    /* ─── WebGL Shader Background (flowing aurora, theme-aware) ─── */
  }
      <div className="absolute inset-0 pointer-events-none opacity-70 mix-blend-screen">
        <ShaderBackground intensity={isBatman ? 0.45 : 0.6} />
      </div>

      {
    /* ─── Geometric Background ─── */
  }
      {
    /* Floating hexagon outlines */
  }
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {
    /* Large hexagon — top right */
  }
        <motion.div
    className="absolute -top-16 -right-16 w-80 h-80 border border-primary/[0.06] rounded-[2rem] rotate-45"
    animate={{ rotate: [45, 90, 45], y: [0, -20, 0] }}
    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
  />
        {
    /* Medium hexagon — bottom left */
  }
        <motion.div
    className="absolute bottom-[10%] -left-12 w-52 h-52 border border-primary/[0.08] rounded-[1.5rem] -rotate-12"
    animate={{ rotate: [-12, 15, -12], y: [0, 15, 0] }}
    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
  />
        {
    /* Small diamond — center left */
  }
        <motion.div
    className="absolute top-[35%] left-[8%] w-24 h-24 border border-primary/[0.07] rotate-45"
    animate={{ rotate: [45, 135, 45], scale: [1, 1.1, 1] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  />
        {
    /* Triangle outline — top left */
  }
        <motion.svg
    className="absolute top-[15%] left-[15%] w-20 h-20 text-primary/[0.06]"
    viewBox="0 0 100 100"
    animate={{ rotate: [0, 60, 0], y: [0, -10, 0] }}
    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
  >
          <polygon points="50,5 95,95 5,95" fill="none" stroke="currentColor" strokeWidth="1" />
        </motion.svg>
        {
    /* Circle outline — bottom right */
  }
        <motion.div
    className="absolute bottom-[20%] right-[12%] w-32 h-32 rounded-full border border-primary/[0.05]"
    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  />
        {
    /* Dotted line — horizontal accent */
  }
        <motion.div
    className="absolute top-[55%] right-[5%] w-40 h-px"
    style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(var(--primary) / 0.1) 0px, hsl(var(--primary) / 0.1) 4px, transparent 4px, transparent 12px)" }}
    animate={{ opacity: [0.3, 0.7, 0.3], x: [0, 20, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
        {
    /* Small cross — accent */
  }
        <motion.div
    className="absolute top-[25%] right-[25%] text-primary/[0.08] text-2xl font-light"
    animate={{ rotate: [0, 90, 0], opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
  >
          +
        </motion.div>
      </div>

      {
    /* Subtle background glow — parallax-scrolled radial gradient */
  }
      <div
    className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none will-change-transform"
    style={{ top: `calc(25% - ${parallaxOffset}px)` }}
  />

      {
    /* Secondary glow orb */
  }
      <div
    className="absolute right-[10%] w-[300px] h-[300px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none will-change-transform"
    style={{ top: `calc(60% - ${parallaxOffset * 0.5}px)` }}
  />

      <div className="container mx-auto px-6">
        {
    /* Flex layout: text on left, image on right (reversed on mobile for image-first) */
  }
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-5xl mx-auto">
          {
    /* ─── Text Content ─── */
  }
          <motion.div
    className="flex-1 text-center lg:text-left"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
            {
    /* Greeting line */
  }
            <p className="font-mono text-sm text-primary mb-4">
              {isBatman ? "I am" : "Hi, my name is"}
            </p>
            {
    /* Main heading with gradient-highlighted last name */
  }
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {isBatman ? <>
                  The Dark{" "}
                  <span className="gradient-text">Knight</span>
                </> : <>
                  Adil Rahman{" "}
                  <span className="gradient-text">Akash</span>
                </>}
            </h1>
            {
    /* Subtitle / role description */
  }
            <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground mb-6">
              {isBatman ? "Software Engineer by Day. Crime-Fighting Vigilante by Night." : "Software Engineer & Web Developer"}
            </h2>
            {
    /* Brief description paragraph */
  }
            <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              {isBatman ? "The night is darkest just before the dawn. And I promise you, the dawn is coming. Gotham's silent guardian, writing clean code and cleaning up the streets." : "Building functional, beautiful digital experiences from Nanchong to the world."}
            </p>
            {
    /* CTA buttons — centered on mobile, left-aligned on desktop */
  }
             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
               {
     /* Primary CTA: View Work / Enter Batcave */
   }
               <Magnetic>
                 <a
     href={isBatman ? "#about" : "#projects"}
     className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-primary btn-float-hover hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
   >
                     {isBatman ? <>
                         Enter the Batcave
                         <Shield size={16} />
                       </> : <>
                         View My Work
                         <ArrowDown size={16} />
                       </>}
                 </a>
               </Magnetic>
               {
     /* Secondary CTA: Download CV / Download Dossier */
   }
               <Magnetic>
                 <a
      href="#"
     target="_blank"
     rel="noopener noreferrer"
     className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground btn-float-hover hover:border-primary hover:text-primary hover:shadow-lg transition-colors"
   >
                     {isBatman ? "Download Dossier" : "Download CV"}
                     <Download size={16} />
                 </a>
               </Magnetic>
             </div>

          </motion.div>

          {
    /* ─── Profile Image ─── */
  }
          <motion.div
    className="flex-shrink-0"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
            <div className="relative group">
              {
    /* Outer orbit ring with animated dots — visible only in dark mode */
  }
              {!isBatman && <div className="absolute -inset-6 rounded-full animate-spin-slow pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/60 shadow-[0_0_8px_hsl(var(--primary)/0.4)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/30" />
                </div>}

              {
    /* Inner orbit ring with dashed border — visible only in dark mode */
  }
              {!isBatman && <div className="absolute -inset-4 rounded-full border border-dashed border-primary/10 animate-spin-slow-reverse pointer-events-none">
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
                </div>}

              {
    /* Batman pulsing golden aura — only visible in batman mode */
  }
              {isBatman && <div
    className="absolute -inset-4 pointer-events-none"
    style={{
      clipPath: BAT_CLIP,
      // Bat-shaped aura
      animation: "bat-aura-pulse 3s ease-in-out infinite",
      // Pulsing scale + opacity
      background: "radial-gradient(circle, hsl(45 100% 55% / 0.15), hsl(45 100% 50% / 0.05) 60%, transparent 80%)",
      filter: "blur(12px)"
    }}
  />}

              {
    /* Gradient glow behind the profile image */
  }
              <div
    className="absolute -inset-1 opacity-50 blur-md group-hover:opacity-75"
    style={{
      borderRadius: isBatman ? void 0 : "9999px",
      // Circle for dark mode
      clipPath: isBatman ? BAT_CLIP : void 0,
      // Bat shape for batman mode
      background: isBatman ? "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)" : "linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary) / 0.3), transparent)",
      transition: "opacity 0.5s ease"
    }}
  />

              {
    /* Circle profile image — shown in dark mode */
  }
              <div
    className="relative w-56 h-56 sm:w-72 sm:h-72 overflow-hidden shadow-xl rounded-full"
    style={{
      opacity: isBatman ? 0 : 1,
      // Hidden in batman mode
      transition: "opacity 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      position: isBatman ? "absolute" : "relative",
      // Stacked positioning for crossfade
      inset: 0
    }}
  >
                <div className="absolute inset-0 ring-2 ring-primary/25 rounded-full z-[1]" />
                <img
    src={profileImg}
    alt="Adil Rahman Akash"
    className="w-full h-full object-cover scale-125 transition-transform duration-700 group-hover:scale-[1.35]"
    fetchPriority="high"
    loading="eager"
    width={288}
    height={288}
    decoding="sync"
  />
                {
    /* "Eyelid" opening animation — top half slides up to reveal image */
  }
                <motion.div
    className="absolute inset-x-0 top-0 h-1/2 bg-background z-10 origin-top"
    initial={{ scaleY: 1 }}
    animate={{ scaleY: 0 }}
    transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
  />
                {
    /* "Eyelid" opening animation — bottom half slides down */
  }
                <motion.div
    className="absolute inset-x-0 bottom-0 h-1/2 bg-background z-10 origin-bottom"
    initial={{ scaleY: 1 }}
    animate={{ scaleY: 0 }}
    transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
  />
              </div>



              {
    /* Status badge — green "Available" or red "Unavailable" (batman mode) */
  }
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-lg ring-1 ring-border z-10">
                <span className="relative flex h-2 w-2">
                  {
    /* Pinging animation ring */
  }
                  <span
    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
    style={{
      backgroundColor: "hsl(var(--primary) / 0.75)"
    }}
  />
                  {
    /* Solid dot */
  }
                  <span
    className="relative inline-flex rounded-full h-2 w-2"
    style={{
      backgroundColor: "hsl(var(--primary))"
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
    </section>;
};
var stdin_default = HeroSection;
export {
  stdin_default as default
};
