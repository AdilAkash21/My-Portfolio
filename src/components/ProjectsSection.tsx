import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useRef, useCallback } from "react";

const projects = [
  {
    title: "Portfolio Website",
    description: "A sleek, responsive personal portfolio built with React and Tailwind CSS to showcase projects and skills.",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com",
  },
  {
    title: "E-Commerce UI",
    description: "A modern e-commerce front-end with product grids, cart functionality, and clean responsive design.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com",
  },
  {
    title: "Task Manager App",
    description: "A productivity app with CRUD operations, filtering, and local storage persistence.",
    tags: ["Java", "CSS", "JavaScript"],
    github: "https://github.com",
  },
  {
    title: "Landing Page Template",
    description: "A conversion-optimized landing page template with smooth animations and CTA sections.",
    tags: ["Tailwind CSS", "JavaScript"],
    github: "https://github.com",
  },
];

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
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-sm text-primary mb-2">03.</h2>
          <h3 className="text-3xl font-bold mb-12">Featured Projects</h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <TiltCard className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:border-glow flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ExternalLink className="text-primary" size={18} />
                  </div>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label={`${p.title} GitHub`}
                  >
                    <Github size={20} />
                  </a>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="font-mono text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
