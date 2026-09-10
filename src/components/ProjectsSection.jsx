import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef, useCallback, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useProjects } from "@/hooks/useSupabaseData";

const categories = ["All", "Web", "App", "Design"];

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 6, y: x * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => setRotate({ x: 0, y: 0 }), []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.25s ease-out",
        willChange: "transform",
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      {children}
    </div>
  );
};

const ProjectsSection = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const { data: projects = [], isLoading } = useProjects(theme);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="absolute -right-32 top-1/4 h-[440px] w-[440px] rounded-full bg-primary/[0.05] blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <p className="font-mono text-[0.7rem] tracking-[0.35em] uppercase text-muted-foreground mb-4">
                04 — Work
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
                Featured <span className="gradient-text">projects</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`rounded-full px-5 py-2 font-mono text-[0.7rem] tracking-widest uppercase transition-all duration-300 border ${
                    activeFilter === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-52 rounded-[1.5rem] border border-border/60 bg-card/30 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground text-sm">No projects in this category yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id || p.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                  >
                    <TiltCard className="group relative h-full rounded-[1.5rem] border border-border/70 bg-card/40 backdrop-blur-sm p-7 flex flex-col overflow-hidden hover:border-primary/40 transition-colors duration-500">
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />

                      <div className="relative flex items-start justify-between mb-6">
                        <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-primary/80">
                          {p.category || "Project"}
                        </span>
                        <div className="flex items-center gap-3">
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              aria-label={`${p.title} on GitHub`}
                            >
                              <Github size={18} />
                            </a>
                          )}
                          <ArrowUpRight
                            size={18}
                            className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <h3 className="relative font-serif text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="relative text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                        {p.description}
                      </p>

                      <div className="relative flex flex-wrap gap-2">
                        {p.tags?.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border/70 px-3 py-1 font-mono text-[0.65rem] tracking-wider text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
