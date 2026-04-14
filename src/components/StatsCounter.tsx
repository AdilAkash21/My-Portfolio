// ─── Stats Counter Section ───
// Animated counting numbers for key metrics.

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, FolderGit2, Clock, Coffee } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
}

const normalStats: Stat[] = [
  { label: "Projects Completed", value: 15, suffix: "+", icon: FolderGit2 },
  { label: "Years of Experience", value: 4, suffix: "+", icon: Clock },
  { label: "Technologies Used", value: 20, suffix: "+", icon: Code },
  { label: "Cups of Coffee", value: 999, suffix: "+", icon: Coffee },
];

const batmanStats: Stat[] = [
  { label: "Villains Defeated", value: 142, suffix: "+", icon: FolderGit2 },
  { label: "Years Active", value: 6, suffix: "+", icon: Clock },
  { label: "Gadgets Deployed", value: 58, suffix: "+", icon: Code },
  { label: "Sleepless Nights", value: 999, suffix: "+", icon: Coffee },
];

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setDisplay(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}{suffix}
    </span>
  );
};

const StatsCounter = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const stats = isBatman ? batmanStats : normalStats;

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="text-primary" size={22} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
