import { motion } from "framer-motion";
import { Palette, Layout, Code2, Smartphone } from "lucide-react";
import SectionBackground from "@/components/SectionBackground";

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

const trainItems = [
  ...skills.map((skill) => ({ ...skill, type: "skill" })),
];

const TrainLocomotive = () => (
  <div className="skills-train__locomotive" aria-hidden="true">
    <div className="skills-train__nose">
      <span className="skills-train__nose-light" />
      <span className="skills-train__nose-line" />
    </div>
    <div className="skills-train__body">
      <div className="skills-train__body-line" />
      <div className="skills-train__body-line skills-train__body-line--lower" />
    </div>
    <div className="skills-train__cab">
      <div className="skills-train__cab-window skills-train__cab-window--front" />
      <div className="skills-train__cab-window skills-train__cab-window--rear" />
    </div>
    <div className="skills-train__locomotive-copy">
      <span className="skills-train__brand-mark">&lt; ARA /&gt;</span>
      <strong className="font-serif text-lg tracking-tight text-foreground">Adil's Express</strong>
    </div>
    <span className="skills-train__drive-wheel skills-train__drive-wheel--front" />
    <span className="skills-train__drive-wheel skills-train__drive-wheel--rear" />
  </div>
);

const TrainItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <div className="skills-train__item">
      <div className="skills-train__icon">
        {Icon ? <Icon size={23} strokeWidth={1.7} /> : <span>{item.name.slice(0, 1)}</span>}
      </div>
      <div className="min-w-0">
        <p className="truncate font-serif text-lg text-foreground">{item.name || item.title}</p>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
          {item.type === "skill" ? `${item.level}% proficiency` : "service"}
        </p>
      </div>
      <span className="skills-train__wheel skills-train__wheel--left" />
      <span className="skills-train__wheel skills-train__wheel--right" />
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <SectionBackground density={34} />
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
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

        <div className="skills-train mb-12" aria-label="Skills train">
          <div className="skills-train__fade skills-train__fade--left" />
          <div className="skills-train__fade skills-train__fade--right" />
          <div className="skills-train__track">
            <div className="skills-train__set">
              <TrainLocomotive />
              {trainItems.map((item) => (
                <TrainItem key={`${item.type}-${item.name || item.title}`} item={item} />
              ))}
            </div>
            <div className="skills-train__set" aria-hidden="true">
              <TrainLocomotive />
              {trainItems.map((item) => (
                <TrainItem key={`duplicate-${item.type}-${item.name || item.title}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid max-w-6xl mx-auto gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group hover-box service-float rounded-2xl border border-primary/15 bg-card/40 p-7 backdrop-blur-sm"
              style={{ "--float-delay": `${i * 0.8}s` }}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <svc.icon className="text-primary" size={20} />
              </div>
              <h3 className="mb-2 font-serif text-xl text-foreground">{svc.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
