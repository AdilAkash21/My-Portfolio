import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Layers move at different speeds for depth
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 0.4, 0.3, 0.15]);

  return (
    <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient orb – top left */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{
          y: y1,
          rotate: rotate1,
          opacity,
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Gradient orb – top right */}
      <motion.div
        className="absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          y: y2,
          rotate: rotate2,
          opacity,
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Floating ring – mid left */}
      <motion.div
        className="absolute top-[40%] -left-20 w-72 h-72 rounded-full border border-primary/[0.07]"
        style={{ y: y3, opacity }}
      />

      {/* Gradient orb – bottom center */}
      <motion.div
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          y: y1,
          opacity,
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 65%)",
        }}
      />

      {/* Small accent dot – right side */}
      <motion.div
        className="absolute top-[60%] right-[10%] w-40 h-40 rounded-full"
        style={{
          y: y2,
          opacity,
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
