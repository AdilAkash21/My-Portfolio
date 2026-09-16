import { motion } from "framer-motion";
import { Palette, Layout, Code2, Smartphone } from "lucide-react";
import SectionBackground from "@/components/SectionBackground";
import maskImage from "@/assets/v-mask.png";

const skills = [
  { name: "HTML", level: 95, category: "structure" },
  { name: "CSS", level: 90, category: "visual systems" },
  { name: "Tailwind CSS", level: 85, category: "visual systems" },
  { name: "JavaScript", level: 80, category: "interaction" },
  { name: "React", level: 82, category: "interaction" },
  { name: "Kotlin", level: 75, category: "mobile" },
  { name: "Flutter", level: 72, category: "mobile" },
  { name: "Java", level: 70, category: "systems" },
  { name: "C", level: 65, category: "systems" },
  { name: "C++", level: 60, category: "systems" },
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

        <div className="skills-circuit mb-16" aria-label="Technical skills circuit board">
          <div className="skills-circuit__header">
            <span className="skills-circuit__eyebrow">SYS / 03</span>
            <span className="skills-circuit__status"><i /> all systems operational</span>
            <span className="skills-circuit__serial">ARA—SKILLS—2024</span>
          </div>
          <div className="skills-circuit__board">
            <div className="skills-circuit__traces" aria-hidden="true">
              <span /><span /><span /><span /><span /><span />
            </div>
            <div className="skills-circuit__hud skills-circuit__hud--top" aria-hidden="true">
              <span>ARCHITECTURE / 04</span>
              <span>LATENCY <b>012ms</b></span>
            </div>
            <div className="skills-circuit__hud skills-circuit__hud--bottom" aria-hidden="true">
              <span>CREATIVE OUTPUT</span>
              <span>100% HUMAN / 0% TEMPLATE</span>
            </div>
            <div className="skills-circuit__core">
              <img className="skills-circuit__mask" src={maskImage} alt="Gold theatrical mask" />
            </div>
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skills-circuit__module"
              data-category={skill.category}
              style={{
                "--module-index": index,
                "--module-delay": `${index * 0.12}s`,
              }}
            >
              <div className="skills-circuit__module-top">
                <span className="skills-circuit__module-index">0{index + 1}</span>
                <span className="skills-circuit__module-category">module / {skill.category}</span>
              </div>
              <strong>{skill.name}</strong>
              <div className="skills-circuit__meter"><span style={{ width: `${skill.level}%` }} /></div>
              <small><b>{skill.level}%</b> / proficiency</small>
            </div>
          ))}
          </div>
          <div className="skills-circuit__footer">
            <span>INPUT: CURIOSITY</span>
            <span>PROCESS: PRACTICE + PLAY</span>
            <span>OUTPUT: DIGITAL EXPERIENCES</span>
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
