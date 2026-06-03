import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Shield, AlertTriangle, Lock, Crosshair } from "lucide-react";
import { useRef, useCallback, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useProjects } from "@/hooks/useSupabaseData";

const ICON_MAP = {
  Shield,
  AlertTriangle,
  Lock,
  Crosshair,
};

const normalCategories = ["All", "Web", "App", "Design"];
const batmanCategories = ["All", "Intel", "Defense", "Gear"];

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setRotate({ x: -y * 12, y: x * 12 });
    setGlare({ x: (e.clientX - rect.left), y: (e.clientY - rect.top) });
  }, []);
  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 0, y: 0 });
  }, []);
  return <div
    ref={ref}
    className={className}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    style={{ 
      transition: "transform 0.1s ease-out", 
      willChange: "transform",
      transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
    }}
  >
      {children}
      <div 
        className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden z-0"
        style={{
          background: `radial-gradient(circle at ${glare.x}px ${glare.y}px, rgba(255,255,255,0.15) 0%, transparent 80%)`
        }}
      />
    </div>;
};

const ProjectsSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const [activeFilter, setActiveFilter] = useState("All");

  const { data: projects = [], isLoading } = useProjects(theme);

  const categories = isBatman ? batmanCategories : normalCategories;
  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  if (isLoading) return <div className="py-24 text-center font-mono text-primary">Loading Classified Intel...</div>;

  return <section id="projects" className="py-24">
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

        <motion.div
    className="flex flex-wrap gap-2 mb-8"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.1 }}
  >
          {categories.map((cat) => <button
    key={cat}
    onClick={() => setActiveFilter(cat)}
    className={`rounded-full px-4 py-1.5 font-mono text-xs transition-all duration-300 border ${activeFilter === cat ? "border-primary bg-primary/10 text-primary shadow-[0_0_8px_hsl(var(--primary)/0.3)]" : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"}`}
  >
               {cat}
            </button>)}
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <motion.div
    key={p.id || p.title}
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3, delay: 0.05 * i }}
  >
                <TiltCard className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:border-glow flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {isBatman && p.icon_type ? <div className="text-primary">{React.createElement(ICON_MAP[p.icon_type] || ExternalLink, { size: 18 })}</div> : <ExternalLink className="text-primary" size={18} />}
                    </div>
                    {isBatman ? <span className="font-mono text-xs text-primary/80 uppercase tracking-wider">Classified</span> : p.github ? <a
    href={p.github}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground transition-colors hover:text-primary"
    aria-label={`${p.title} GitHub`}
  >
                        <Github size={20} />
                      </a> : null}
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags?.map((t) => <span key={t} className="font-mono text-xs text-muted-foreground">{t}</span>)}
                  </div>
                </TiltCard>
              </motion.div>)}
          </AnimatePresence>
        </div>
      </div>
    </section>;
};
var stdin_default = ProjectsSection;
export {
  stdin_default as default
};

