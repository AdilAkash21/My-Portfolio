// ─── Skills & Services Section ───
// Displays skill tags (tech stack) and service cards.
// In batman mode: shows combat abilities and vigilante services instead.

import { motion } from "framer-motion";
import { Palette, Layout, Code2, Shield, Swords, Search, Eye, Cpu, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Normal mode skill tags
const normalSkills = [
  "HTML", "CSS", "Tailwind CSS", "JavaScript", "Java", "C", "C++"
];

// Batman mode skill tags
const batmanSkills = [
  "Stealth", "Combat", "Detective Work", "Hacking", "Intimidation", "Gadgetry", "Martial Arts"
];

// Normal mode service cards
const normalServices = [
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Creating intuitive user interfaces that delight and engage.",
  },
  {
    icon: Layout,
    title: "Custom Web Design",
    desc: "Bespoke layouts tailored to your brand identity.",
  },
  {
    icon: Code2,
    title: "Front-End Development",
    desc: "Clean, responsive coding with modern frameworks.",
  },
];

// Batman mode service cards
const batmanServices = [
  {
    icon: Shield,
    title: "Gotham Defense",
    desc: "Protecting the city from criminal masterminds and supervillains, one night at a time.",
  },
  {
    icon: Search,
    title: "World's Greatest Detective",
    desc: "Forensic analysis, crime scene reconstruction, and intel gathering that would make the FBI jealous.",
  },
  {
    icon: Swords,
    title: "Combat & Tactics",
    desc: "Mastery of 127 martial arts styles, strategic planning, and zero-casualty takedowns.",
  },
];

const SkillsSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const skills = isBatman ? batmanSkills : normalSkills; // Choose skill set based on theme
  const services = isBatman ? batmanServices : normalServices; // Choose services based on theme

  return (
    <section id="skills" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        {/* Section header with numbered label */}
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
          {/* Inspirational quote */}
          <p className="text-muted-foreground mb-12 max-w-xl">
            {isBatman
              ? '"It\'s not who I am underneath, but what I do that defines me."'
              : '"Whatever the client demands, my job is to fulfill that request."'}
          </p>
        </motion.div>

        {/* Skill tags — horizontally wrapping pill-shaped badges */}
        <motion.div
          className="flex flex-wrap gap-3 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-md border border-border bg-secondary px-4 py-2 font-mono text-sm text-secondary-foreground transition-colors hover:border-primary hover:text-primary hover-tag cursor-default"
            >
              {s}
            </span>
          ))}
        </motion.div>

        {/* Service cards — 3-column grid on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }} // Staggered entrance
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:border-glow hover-lift"
            >
              <svc.icon className="text-primary mb-4" size={28} />
              <h4 className="text-lg font-semibold mb-2 text-foreground">{svc.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
