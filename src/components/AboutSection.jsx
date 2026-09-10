import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code2, Sparkles } from "lucide-react";

const education = [
  {
    icon: GraduationCap,
    title: "B.Sc. Software Engineering",
    place: "China West Normal University",
    location: "Nanchong, China",
    period: "2024 — 2028",
  },
  {
    icon: GraduationCap,
    title: "H.S.C. — Science",
    place: "Ghatail Cantonment Public School & College",
    location: "Ghatail, Tangail",
    period: "Completed",
  },
];

const facts = [
  { icon: Code2, label: "Focus", value: "Web & Mobile Engineering" },
  { icon: Sparkles, label: "Approach", value: "Logic meets aesthetics" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-primary/[0.05] blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-14"
        >
          <p className="font-mono text-[0.7rem] tracking-[0.35em] uppercase text-muted-foreground mb-4">
            01 — About
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
            The story <span className="gradient-text">behind the code</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 max-w-6xl mx-auto items-start">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-foreground/90 font-serif">
              An international student with a passion for learning and a drive to fulfill client
              needs through code and design.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My journey in tech started with a curiosity for how things work under the hood.
              From low-level programming in C and C++ to crafting modern web interfaces with
              Tailwind CSS and JavaScript, I enjoy bridging the gap between logic and aesthetics.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today I build web and mobile products end to end — designing the experience,
              writing the code, and polishing every detail until it feels effortless.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm p-5"
                >
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <f.icon size={16} />
                    <span className="font-mono text-[0.65rem] tracking-[0.25em] uppercase">
                      {f.label}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90">{f.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-[1.75rem] border border-primary/15 bg-primary/[0.02] p-6 sm:p-8"
          >
            <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Education
            </p>
            <div className="relative pl-6">
              <span className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
              <div className="space-y-8">
                {education.map((e) => (
                  <div key={e.title} className="relative">
                    <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/15" />
                    <p className="font-mono text-[0.65rem] tracking-widest uppercase text-primary mb-1.5">
                      {e.period}
                    </p>
                    <h3 className="font-serif text-xl text-foreground mb-1">{e.title}</h3>
                    <p className="text-sm text-muted-foreground">{e.place}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
                      <MapPin size={12} className="text-primary" />
                      {e.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
