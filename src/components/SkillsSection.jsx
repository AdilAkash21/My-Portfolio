import { motion, useInView } from "framer-motion";
import { Palette, Layout, Code2, Smartphone, Shield, Swords, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useRef } from "react";
const normalSkills = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "Tailwind CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 82 },
  { name: "Java", level: 70 },
  { name: "C", level: 65 },
  { name: "C++", level: 60 }
];
const batmanSkills = [
  { name: "Stealth", level: 98 },
  { name: "Combat", level: 95 },
  { name: "Detective", level: 99 },
  { name: "Hacking", level: 88 },
  { name: "Intimidation", level: 97 },
  { name: "Gadgetry", level: 92 },
  { name: "Martial Arts", level: 96 }
];
const ProgressRing = ({ name, level, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const size = 100;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - level / 100 * circumference;
  return <motion.div
    ref={ref}
    className="flex flex-col items-center gap-2"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.08 * index }}
  >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {
    /* Background circle */
  }
          <circle
    cx={size / 2}
    cy={size / 2}
    r={radius}
    fill="none"
    stroke="hsl(var(--muted))"
    strokeWidth={stroke}
  />
          {
    /* Animated progress circle */
  }
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
    transition={{ duration: 1.2, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
    style={{
      filter: "drop-shadow(0 0 4px hsl(var(--primary) / 0.4))"
    }}
  />
        </svg>
        {
    /* Percentage in center */
  }
        <motion.span
    className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-foreground"
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    transition={{ duration: 0.4, delay: 0.3 + 0.1 * index }}
  >
          {level}%
        </motion.span>
      </div>
      <span className="font-mono text-xs text-muted-foreground text-center">{name}</span>
    </motion.div>;
};
const normalServices = [
  { icon: Palette, title: "UI/UX Design", desc: "Creating intuitive user interfaces that delight and engage." },
  { icon: Layout, title: "Custom Web Design", desc: "Bespoke layouts tailored to your brand identity." },
  { icon: Code2, title: "Front-End Development", desc: "Clean, responsive coding with modern frameworks." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Cross-platform and native mobile apps built with Kotlin and Flutter." }
];
const batmanServices = [
  { icon: Shield, title: "Gotham Defense", desc: "Protecting the city from criminal masterminds and supervillains, one night at a time." },
  { icon: Search, title: "World's Greatest Detective", desc: "Forensic analysis, crime scene reconstruction, and intel gathering that would make the FBI jealous." },
  { icon: Swords, title: "Combat & Tactics", desc: "Mastery of 127 martial arts styles, strategic planning, and zero-casualty takedowns." }
];
const SkillsSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const skills = isBatman ? batmanSkills : normalSkills;
  const services = isBatman ? batmanServices : normalServices;
  return <section id="skills" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
          <h2 className="font-mono text-sm text-primary mb-2">03.</h2>
          <h3 className="text-3xl font-bold mb-4">
            {isBatman ? "Arsenal & Abilities" : "Skills & Services"}
          </h3>
          <p className="text-muted-foreground mb-12 max-w-xl">
            {isBatman ? `"It's not who I am underneath, but what I do that defines me."` : '"Whatever the client demands, my job is to fulfill that request."'}
          </p>
        </motion.div>

        {
    /* Animated progress rings grid */
  }
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-6 mb-16">
          {skills.map((s, i) => <ProgressRing key={s.name} name={s.name} level={s.level} index={i} />)}
        </div>

        {
    /* Service cards */
  }
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => <motion.div
    key={svc.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.1 * i }}
    className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:border-glow hover-lift"
  >
              <svc.icon className="text-primary mb-4" size={28} />
              <h4 className="text-lg font-semibold mb-2 text-foreground">{svc.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
var stdin_default = SkillsSection;
export {
  stdin_default as default
};
