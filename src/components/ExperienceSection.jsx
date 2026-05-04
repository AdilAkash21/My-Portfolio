import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Shield, Zap, Crosshair, Lock, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
const normalTimeline = [
  {
    year: "2024 \u2013 Present",
    title: "Software Engineering (BSc)",
    organization: "China West Normal University",
    description: "Pursuing a Bachelor's degree in Software Engineering, focusing on full-stack development, algorithms, and system design.",
    icon: GraduationCap,
    type: "education",
    details: [
      "Coursework: Data Structures, Algorithms, Database Systems, Software Architecture",
      "GPA: Maintaining strong academic standing",
      "Active member of the university coding club",
      "Working on capstone project involving cloud-native microservices"
    ]
  },
  {
    year: "2022 \u2013 2023",
    title: "Freelance Web Developer",
    organization: "Self-Employed",
    description: "Built responsive websites and web applications for clients, honing skills in React, Tailwind CSS, and modern JavaScript.",
    icon: Briefcase,
    type: "work",
    details: [
      "Delivered 10+ client projects on time and within budget",
      "Specialized in React, TypeScript, and Tailwind CSS",
      "Implemented SEO best practices increasing client traffic by 40%",
      "Managed full project lifecycle from requirements to deployment"
    ]
  },
  {
    year: "2020 \u2013 2022",
    title: "Higher Secondary Certificate (H.S.C.)",
    organization: "Ghatail Cantonment Public School & College, Tangail",
    description: "Completed higher secondary education with a focus on science, building a strong foundation in mathematics and physics.",
    icon: GraduationCap,
    type: "education",
    details: [
      "Science stream with focus on Mathematics and Physics",
      "Participated in inter-school science competitions",
      "Started learning programming during this period"
    ]
  },
  {
    year: "2018 \u2013 2020",
    title: "Self-Taught Developer",
    organization: "Online Learning",
    description: "Began the coding journey through online courses, tutorials, and open-source contributions. Learned HTML, CSS, JavaScript, and Git.",
    icon: Briefcase,
    type: "work",
    details: [
      "Completed 20+ online courses on platforms like freeCodeCamp and Udemy",
      "Built personal projects to practice HTML, CSS, and JavaScript",
      "Made first open-source contributions on GitHub",
      "Learned version control with Git and collaborative workflows"
    ]
  }
];
const batmanTimeline = [
  {
    year: "2024 \u2013 Present",
    title: "Lead Vigilante Operations",
    organization: "Gotham City",
    description: "Coordinating multi-front operations against organized crime, utilizing Batcomputer v7.0 for predictive crime analysis.",
    icon: Shield,
    type: "work",
    details: [
      "Neutralized 47 organized crime operations in Q1 alone",
      "Deployed AI-driven surveillance across 12 Gotham districts",
      "Coordinated with GCPD on 15 high-profile cases",
      "Reduced Gotham crime rate by 23% year-over-year"
    ]
  },
  {
    year: "2023",
    title: "Arkham Firewall Deployment",
    organization: "Wayne Enterprises R&D",
    description: "Deployed military-grade cybersecurity infrastructure protecting critical Gotham systems from digital threats.",
    icon: Lock,
    type: "work",
    details: [
      "Designed zero-trust architecture for Gotham's power grid",
      "Blocked 1.2M cyber intrusion attempts in first month",
      "Implemented quantum-resistant encryption protocols"
    ]
  },
  {
    year: "2022",
    title: "League of Shadows Training",
    organization: "Classified Location",
    description: "Advanced combat training, stealth operations, and strategic warfare under Ra's al Ghul's tutelage.",
    icon: Crosshair,
    type: "education",
    details: [
      "Mastered 7 martial arts disciplines",
      "Completed stealth infiltration certification",
      "Graduated top of the class in strategic warfare"
    ]
  },
  {
    year: "2020 \u2013 2022",
    title: "Wayne Tech Gadget Suite R&D",
    organization: "Batcave Labs",
    description: "Designed and deployed next-generation crime-fighting gadgets including grapple systems and EMP batarangs.",
    icon: Zap,
    type: "work",
    details: [
      "Engineered grapple gun with 500m range and 200kg capacity",
      "Developed EMP batarangs capable of disabling vehicles",
      "Created smoke pellets with 30-second coverage radius",
      "Filed 12 patents under Wayne Enterprises"
    ]
  }
];
const ExperienceSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const timeline = isBatman ? batmanTimeline : normalTimeline;
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return <section id="experience" className="py-24">
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

        {
    /* Vertical timeline */
  }
        <div className="relative max-w-3xl mx-auto">
          {
    /* Center line */
  }
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          {timeline.map((item, i) => {
    const isLeft = i % 2 === 0;
    const isExpanded = expandedIndex === i;
    return <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className={`relative flex items-start mb-12 last:mb-0 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
                {
      /* Timeline dot */
    }
                <motion.div
      className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10 mt-1.5"
      animate={isExpanded ? { scale: 1.5 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    />

                {
      /* Spacer for the opposite side on desktop */
    }
                <div className="hidden md:block md:w-1/2" />

                {
      /* Card */
    }
                <div
      className={`ml-14 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-10" : "md:pl-10"}`}
    >
                  <motion.div
      className="group rounded-xl border border-border bg-card p-5 cursor-pointer select-none hover:border-primary/40 transition-colors"
      onClick={() => toggleExpand(i)}
      whileTap={{ scale: 0.98 }}
    >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-primary" size={16} />
                      </div>
                      <span className="font-mono text-xs text-primary">{item.year}</span>
                      <motion.div
      className="ml-auto"
      animate={{ rotate: isExpanded ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
                        <ChevronDown className="text-muted-foreground" size={16} />
                      </motion.div>
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

                    {
      /* Expandable details */
    }
                    <AnimatePresence>
                      {isExpanded && <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
                          <ul className="mt-4 pt-4 border-t border-border space-y-2">
                            {item.details.map((detail, j) => <motion.li
      key={j}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: j * 0.05 }}
      className="text-sm text-muted-foreground flex items-start gap-2"
    >
                                <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                                {detail}
                              </motion.li>)}
                          </ul>
                        </motion.div>}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>;
  })}
        </div>
      </div>
    </section>;
};
var stdin_default = ExperienceSection;
export {
  stdin_default as default
};
