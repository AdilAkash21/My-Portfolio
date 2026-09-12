import { motion, useInView } from "framer-motion";
import { Palette, Layout, Code2, Smartphone } from "lucide-react";
import { useRef } from "react";
import ParticleField from "@/components/ParticleField";

const skills = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "Tailwind CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 82 },
  { name: "Kotlin", level: 75 },
  { name: "Flutter", level: 72 },
  { name: "Java", level: 70 },
  { name: "C", level: 65 },
  { name: "C++", level: 60 },
];

const services = [
  { icon: Palette, title: "UI/UX Design", desc: "Creating intuitive user interfaces that delight and engage." },
  { icon: Layout, title: "Custom Web Design", desc: "Bespoke layouts tailored to your brand identity." },
  { icon: Code2, title: "Front-End Development", desc: "Clean, responsive coding with modern frameworks." },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Cross-platform and native mobile apps built with Kotlin and Flutter.",
  },
];

const ProgressRing = ({ name, level, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const size = 104;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.06 * index }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.2, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.35))" }}
          />
        </svg>
        <motion.span
          className="absolute inset-0 flex items-center justify-center font-serif text-lg text-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.25 + 0.08 * index }}
        >
          {level}
          <span className="text-xs text-muted-foreground ml-0.5">%</span>
        </motion.span>
      </div>
      <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-muted-foreground text-center">
        {name}
      </span>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <ParticleField density={34} className="opacity-35" />
      <motion.div
        aria-hidden="true"
        className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/[0.06] blur-[130px] pointer-events-none"
        animate={{ x: [0, 90, 0], y: [0, -35, 0], scale: [1, 1.12, 1], opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-40 bottom-16 h-[360px] w-[360px] rounded-full bg-primary/[0.045] blur-[120px] pointer-events-none"
        animate={{ x: [0, -70, 0], y: [0, 45, 0], scale: [1.08, 0.96, 1.08], opacity: [0.7, 0.35, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-14"
        >
          <p className="font-mono text-[0.7rem] tracking-[0.35em] uppercase text-muted-foreground mb-4">
            03 — Skills &amp; Services
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
            Craft, tools &amp; <span className="gradient-text">what I offer</span>
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground font-serif italic">
            “Whatever the client demands, my job is to fulfill that request.”
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 max-w-6xl mx-auto mb-20">
          {skills.map((s, i) => (
            <ProgressRing key={s.name} name={s.name} level={s.level} index={i} />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group rounded-2xl border border-primary/15 bg-card/40 backdrop-blur-sm p-7 transition-all hover:border-primary/40 hover:-translate-y-1"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <svc.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-serif text-xl mb-2 text-foreground">{svc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
