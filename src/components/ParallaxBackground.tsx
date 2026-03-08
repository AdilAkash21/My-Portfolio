// ─── Parallax Background ───
// A fixed, full-screen background layer with:
// - Multiple gradient orbs that move at different speeds as the user scrolls (parallax effect)
// - A field of twinkling star/particle dots
// - A subtle grid overlay
// - A bat signal with pulsing glow (visible only in batman mode)
// Purely decorative — no interactivity (pointer-events: none).

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

// Shape of a single particle in the star field
interface Particle {
  id: number;
  x: string; // CSS percentage position
  y: string;
  size: number; // Pixel diameter
  delay: number; // Animation delay
  duration: number; // Animation cycle duration
  opacity: number; // Peak opacity
}

const ParallaxBackground = () => {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll(); // 0 at top, 1 at bottom

  // Transform scroll progress into different parallax speeds for each layer
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]); // Slow layer
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); // Fast layer
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]); // Slowest layer
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]); // Rotation for orb 1
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]); // Counter-rotation for orb 2
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 0.4, 0.3, 0.15]); // Fade as user scrolls

  // Generate 45 particles with deterministic pseudo-random positions (seeded for consistency)
  const particles = useMemo<Particle[]>(() => {
    const seed = 42;
    return Array.from({ length: 45 }, (_, i) => {
      const pseudoRand = (n: number) => ((Math.sin(seed + n * 9301 + 49297) % 1) + 1) % 1;
      return {
        id: i,
        x: `${pseudoRand(i * 3) * 100}%`,
        y: `${pseudoRand(i * 7 + 1) * 100}%`,
        size: 2 + pseudoRand(i * 11 + 2) * 3,
        delay: pseudoRand(i * 13 + 3) * 4,
        duration: 2.5 + pseudoRand(i * 17 + 4) * 3.5,
        opacity: 0.35 + pseudoRand(i * 19 + 5) * 0.55,
      };
    });
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient orb — top left: moves slowly and rotates */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{
          y: y1, rotate: rotate1, opacity,
          background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Gradient orb — top right: moves faster with counter-rotation */}
      <motion.div
        className="absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          y: y2, rotate: rotate2, opacity,
          background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Floating ring — middle left: subtle border-only circle */}
      <motion.div
        className="absolute top-[40%] -left-20 w-72 h-72 rounded-full border border-primary/[0.07]"
        style={{ y: y3, opacity }}
      />

      {/* Gradient orb — bottom center: large ambient glow */}
      <motion.div
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          y: y1, opacity,
          background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 65%)",
        }}
      />

      {/* Small accent dot — right side */}
      <motion.div
        className="absolute top-[60%] right-[10%] w-40 h-40 rounded-full"
        style={{
          y: y2, opacity,
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Star / particle field — 300vh tall so particles remain visible at all scroll positions */}
      <div className="absolute inset-x-0 top-0" style={{ height: "300vh" }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{
              opacity: [0, p.opacity, 0], // Twinkle: fade in → hold → fade out
              scale: [0.5, 1, 0.5], // Pulse: small → full → small
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay — thin lines for texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Bat Signal — visible only in batman mode */}
      {theme === "batman" && (
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none" style={{ top: "8%" }}>
          {/* Pulsing golden glow behind the bat silhouette */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(45 100% 51% / 0.08) 0%, hsl(45 100% 51% / 0.03) 40%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Bat silhouette SVG — subtle, slowly pulsing */}
          <motion.svg
            width="180"
            height="180"
            viewBox="0 0 24 24"
            className="relative"
            style={{ filter: "drop-shadow(0 0 40px hsl(45 100% 51% / 0.25)) drop-shadow(0 0 80px hsl(45 100% 51% / 0.1))" }}
            animate={{
              opacity: [0.06, 0.12, 0.06],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M12 2C12 2 7.5 8 4 9.5C2 10.4 0.5 11 0 12C1 12 3 12 4.5 13C3 14.5 2 16.5 1.5 19C3.5 17 5.5 16 7.5 15.5C8.5 17 10 19.5 12 22C14 19.5 15.5 17 16.5 15.5C18.5 16 20.5 17 22.5 19C22 16.5 21 14.5 19.5 13C21 12 23 12 24 12C23.5 11 22 10.4 20 9.5C16.5 8 12 2 12 2Z"
              fill="hsl(45 100% 51% / 0.35)"
            />
          </motion.svg>
        </div>
      )}
    </div>
  );
};

export default ParallaxBackground;
