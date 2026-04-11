// ─── Projects Section ───
// Showcases featured projects with category filtering tabs.
// Each card has a 3D tilt effect on mouse hover.
// In batman mode: shows classified Gotham operations.

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Shield, AlertTriangle, Lock, Crosshair } from "lucide-react";
import { useRef, useCallback, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Normal mode projects with categories
const normalProjects = [
  {
    title: "Portfolio Website",
    description: "A sleek, responsive personal portfolio built with React and Tailwind CSS to showcase projects and skills.",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    category: "Web",
    github: "https://github.com",
  },
  {
    title: "E-Commerce UI",
    description: "A modern e-commerce front-end with product grids, cart functionality, and clean responsive design.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Web",
    github: "https://github.com",
  },
  {
    title: "Task Manager App",
    description: "A productivity app with CRUD operations, filtering, and local storage persistence.",
    tags: ["Java", "CSS", "JavaScript"],
    category: "App",
    github: "https://github.com",
  },
  {
    title: "Landing Page Template",
    description: "A conversion-optimized landing page template with smooth animations and CTA sections.",
    tags: ["Tailwind CSS", "JavaScript"],
    category: "Design",
    github: "https://github.com",
  },
];

const batmanProjects = [
  {
    title: "Batcomputer v7.0",
    description: "AI-powered crime analysis and prediction system. Processes real-time Gotham surveillance data.",
    tags: ["Neural Networks", "Surveillance", "Predictive AI"],
    category: "Intel",
    icon: Crosshair,
  },
  {
    title: "Arkham Firewall",
    description: "Military-grade cybersecurity framework protecting Wayne Enterprises and the Batcave network.",
    tags: ["Encryption", "Zero-Trust", "Intrusion Detection"],
    category: "Defense",
    icon: Lock,
  },
  {
    title: "Gotham Threat Tracker",
    description: "Real-time villain tracking and threat-level classification system across Gotham's underworld.",
    tags: ["Forensics", "GIS Mapping", "Data Mining"],
    category: "Intel",
    icon: AlertTriangle,
  },
  {
    title: "Wayne Tech Gadget Suite",
    description: "R&D platform for designing and deploying next-gen crime-fighting gadgets.",
    tags: ["Hardware Design", "3D Printing", "Ballistics"],
    category: "Gear",
    icon: Shield,
  },
];

const normalCategories = ["All", "Web", "App", "Design"];
const batmanCategories = ["All", "Intel", "Defense", "Gear"];

// ─── TiltCard Component ───
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out', willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

const ProjectsSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = isBatman ? batmanProjects : normalProjects;
  const categories = isBatman ? batmanCategories : normalCategories;
  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-sm text-primary mb-2">04.</h2>
          <h3 className="text-3xl font-bold mb-8">
            {isBatman ? "Classified Operations" : "Featured Projects"}
          </h3>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-1.5 font-mono text-xs transition-all duration-300 border ${
                activeFilter === cat
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project cards grid with AnimatePresence for filter transitions */}
        <div className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              >
                <TiltCard className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:border-glow flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {isBatman && 'icon' in p ? (
                        <p.icon className="text-primary" size={18} />
                      ) : (
                        <ExternalLink className="text-primary" size={18} />
                      )}
                    </div>
                    {isBatman ? (
                      <span className="font-mono text-xs text-primary/80 uppercase tracking-wider">Classified</span>
                    ) : 'github' in p ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                        aria-label={`${p.title} GitHub`}
                      >
                        <Github size={20} />
                      </a>
                    ) : null}
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="font-mono text-xs text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
