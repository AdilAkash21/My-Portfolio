import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const ParallaxBackground = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const particles = useMemo(() => {
    const seed = 42;
    return Array.from({ length: 45 }, (_, i) => {
      const pseudoRand = (n) => (Math.sin(seed + n * 9301 + 49297) % 1 + 1) % 1;
      return {
        id: i,
        x: `${pseudoRand(i * 3) * 100}%`,
        y: `${pseudoRand(i * 7 + 1) * 100}%`,
        size: 2 + pseudoRand(i * 11 + 2) * 3,
        delay: pseudoRand(i * 13 + 3) * 4,
        duration: 2.5 + pseudoRand(i * 17 + 4) * 3.5,
        opacity: 0.35 + pseudoRand(i * 19 + 5) * 0.55
      };
    });
  }, []);
  return <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {
    /* Floating ring — middle left: subtle border-only circle */
  }
      <motion.div
    className="absolute top-[40%] -left-20 w-72 h-72 rounded-full border border-primary/[0.07]"
    style={{ y: y3 }}
  />

      {
    /* Star / particle field — 300vh tall so particles remain visible at all scroll positions */
  }
      <div className="absolute inset-x-0 top-0" style={{ height: "300vh" }}>
        {particles.map((p) => <motion.div
    key={p.id}
    className="absolute rounded-full bg-primary"
    style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
    animate={{
      opacity: [0, p.opacity, 0],
      // Twinkle: fade in → hold → fade out
      scale: [0.5, 1, 0.5]
      // Pulse: small → full → small
    }}
    transition={{
      duration: p.duration,
      delay: p.delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />)}
      </div>

      {
    /* Subtle grid overlay — thin lines for texture */
  }
      <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
      backgroundSize: "80px 80px"
    }}
  />

    </div>;
};
var stdin_default = ParallaxBackground;
export {
  stdin_default as default
};
