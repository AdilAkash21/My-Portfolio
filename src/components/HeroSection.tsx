import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import profileImg from "@/assets/profile-optimized.webp";
import batmanImg from "@/assets/batman-profile.png";

// Preload the profile image as early as possible
const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "image";
preloadLink.type = "image/webp";
preloadLink.href = profileImg;
document.head.appendChild(preloadLink);

const HeroSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const currentImg = isBatman ? batmanImg : profileImg;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32">
      {/* SVG clipPath definition for bat shape */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="bat-clip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.5 0.05
              C 0.5 0.05, 0.48 0.0, 0.46 0.08
              C 0.44 0.16, 0.44 0.2, 0.42 0.18
              C 0.40 0.16, 0.38 0.0, 0.36 0.08
              C 0.34 0.16, 0.34 0.22, 0.30 0.22
              C 0.26 0.22, 0.18 0.18, 0.12 0.24
              C 0.06 0.30, 0.0 0.40, 0.0 0.48
              C 0.0 0.52, 0.02 0.54, 0.06 0.54
              C 0.10 0.54, 0.16 0.52, 0.22 0.56
              C 0.18 0.62, 0.14 0.68, 0.14 0.72
              C 0.14 0.76, 0.18 0.78, 0.24 0.76
              C 0.28 0.74, 0.32 0.70, 0.36 0.74
              C 0.38 0.78, 0.40 0.86, 0.44 0.82
              C 0.46 0.80, 0.48 0.92, 0.50 1.0
              C 0.52 0.92, 0.54 0.80, 0.56 0.82
              C 0.60 0.86, 0.62 0.78, 0.64 0.74
              C 0.68 0.70, 0.72 0.74, 0.76 0.76
              C 0.82 0.78, 0.86 0.76, 0.86 0.72
              C 0.86 0.68, 0.82 0.62, 0.78 0.56
              C 0.84 0.52, 0.90 0.54, 0.94 0.54
              C 0.98 0.54, 1.0 0.52, 1.0 0.48
              C 1.0 0.40, 0.94 0.30, 0.88 0.24
              C 0.82 0.18, 0.74 0.22, 0.70 0.22
              C 0.66 0.22, 0.66 0.16, 0.64 0.08
              C 0.62 0.0, 0.60 0.16, 0.58 0.18
              C 0.56 0.2, 0.56 0.16, 0.54 0.08
              C 0.52 0.0, 0.5 0.05, 0.5 0.05
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      {/* Subtle bg glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sm text-primary mb-4">Hi, my name is</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Adil Rahman{" "}
              <span className="gradient-text">Akash</span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground mb-6">
              Software Engineer & Web Designer
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              Building functional, beautiful digital experiences from Nanchong to the world.
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-primary btn-float-hover hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
            >
              View My Work
              <ArrowDown size={16} />
            </a>
          </motion.div>

          {/* Profile image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative group">
              {/* Outer orbit ring with dots — hidden in batman mode */}
              {!isBatman && (
                <div className="absolute -inset-6 rounded-full animate-spin-slow pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/60 shadow-[0_0_8px_hsl(var(--primary)/0.4)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/30" />
                </div>
              )}

              {/* Inner orbit ring — hidden in batman mode */}
              {!isBatman && (
                <div className="absolute -inset-4 rounded-full border border-dashed border-primary/10 animate-spin-slow-reverse pointer-events-none">
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
                </div>
              )}

              {/* Gradient glow behind */}
              <div
                className="absolute -inset-1 opacity-50 blur-md group-hover:opacity-75 transition-opacity duration-500"
                style={{
                  background: isBatman
                    ? "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)"
                    : undefined,
                  clipPath: isBatman ? "url(#bat-clip)" : undefined,
                  borderRadius: isBatman ? undefined : "9999px",
                  backgroundImage: isBatman
                    ? undefined
                    : "linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary) / 0.3), transparent)",
                }}
              />

              {/* Main image */}
              <div
                className="relative overflow-hidden shadow-xl transition-all duration-700"
                style={{
                  width: isBatman ? "320px" : undefined,
                  height: isBatman ? "240px" : undefined,
                  clipPath: isBatman ? "url(#bat-clip)" : undefined,
                  borderRadius: isBatman ? undefined : "9999px",
                  boxShadow: isBatman
                    ? "0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.15)"
                    : undefined,
                }}
              >
                {!isBatman && (
                  <div className="w-56 h-56 sm:w-72 sm:h-72">
                    <div
                      className="absolute inset-0 ring-2 ring-primary/25 rounded-full z-[1]"
                    />
                    <img
                      src={currentImg}
                      alt="Adil Rahman Akash"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      fetchPriority="high"
                      loading="eager"
                      width={288}
                      height={288}
                      decoding="sync"
                    />
                  </div>
                )}
                {isBatman && (
                  <>
                    <img
                      src={currentImg}
                      alt="Batman"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      fetchPriority="high"
                      loading="eager"
                      width={320}
                      height={240}
                      decoding="sync"
                    />
                  </>
                )}
                {/* Top eyelid */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-1/2 bg-background z-10 origin-top"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Bottom eyelid */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-background z-10 origin-bottom"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Status badge */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-lg ring-1 ring-border z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-foreground">Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
