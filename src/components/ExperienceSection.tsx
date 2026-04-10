// ─── Experience Timeline Section ───
// Vertical timeline showing education and work milestones.
// Batman mode: shows Gotham operations history.

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Shield, Zap, Crosshair, Lock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  icon: React.ElementType;
  type: "education" | "work";
}

const normalTimeline: TimelineItem[] = [
  {
    year: "2023 – Present",
    title: "Software Engineering (BSc)",
    organization: "China West Normal University",
    description: "Pursuing a Bachelor's degree in Software Engineering, focusing on full-stack development, algorithms, and system design.",
    icon: GraduationCap,
    type: "education",
  },
  {
    year: "2022 – 2023",
    title: "Freelance Web Developer",
    organization: "Self-Employed",
    description: "Built responsive websites and web applications for clients, honing skills in React, Tailwind CSS, and modern JavaScript.",
    icon: Briefcase,
    type: "work",
  },
  {
    year: "2020 – 2022",
    title: "Higher Secondary Certificate (H.S.C.)",
    organization: "Ghatail Cantonment Public School & College, Tangail",
    description: "Completed higher secondary education with a focus on science, building a strong foundation in mathematics and physics.",
    icon: GraduationCap,
    type: "education",
  },
  {
    year: "2018 – 2020",
    title: "Self-Taught Developer",
    organization: "Online Learning",
    description: "Began the coding journey through online courses, tutorials, and open-source contributions. Learned HTML, CSS, JavaScript, and Git.",
    icon: Briefcase,
    type: "work",
  },
];

const batmanTimeline: TimelineItem[] = [
  {
    year: "2024 – Present",
    title: "Lead Vigilante Operations",
    organization: "Gotham City",
    description: "Coordinating multi-front operations against organized crime, utilizing Batcomputer v7.0 for predictive crime analysis.",
    icon: Shield,
    type: "work",
  },
  {
    year: "2023",
    title: "Arkham Firewall Deployment",
    organization: "Wayne Enterprises R&D",
    description: "Deployed military-grade cybersecurity infrastructure protecting critical Gotham systems from digital threats.",
    icon: Lock,
    type: "work",
  },
  {
    year: "2022",
    title: "League of Shadows Training",
    organization: "Classified Location",
    description: "Advanced combat training, stealth operations, and strategic warfare under Ra's al Ghul's tutelage.",
    icon: Crosshair,
    type: "education",
  },
  {
    year: "2020 – 2022",
    title: "Wayne Tech Gadget Suite R&D",
    organization: "Batcave Labs",
    description: "Designed and deployed next-generation crime-fighting gadgets including grapple systems and EMP batarangs.",
    icon: Zap,
    type: "work",
  },
];

const ExperienceSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const timeline = isBatman ? batmanTimeline : normalTimeline;

  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-sm text-primary mb-2">02.</h2>
          <h3 className="text-3xl font-bold mb-16">
            {isBatman ? "Operations History" : "Experience & Education"}
          </h3>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  // On desktop: alternate left/right. On mobile: always right of the line.
                  isLeft ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10 mt-1.5" />

                {/* Spacer for the opposite side on desktop */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div
                  className={`ml-14 md:ml-0 md:w-1/2 ${
                    isLeft ? "md:pr-10" : "md:pl-10"
                  }`}
                >
                  <div className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-primary" size={16} />
                      </div>
                      <span className="font-mono text-xs text-primary">{item.year}</span>
                    </div>
                    <h4 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {item.organization}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
