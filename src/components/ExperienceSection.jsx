import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Shield, Zap, Crosshair, Lock, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useExperience } from "@/hooks/useSupabaseData";

const ICON_MAP = {
  GraduationCap,
  Briefcase,
  Shield,
  Zap,
  Crosshair,
  Lock,
};

const ExperienceSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const { data: timeline = [], isLoading } = useExperience(theme);
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (isLoading) return <div className="py-24 text-center font-mono text-primary">Scanning Dossiers...</div>;

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

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          {timeline.map((item, i) => {
    const isLeft = i % 2 === 0;
    const isExpanded = expandedIndex === i;
    return <motion.div
      key={item.id || item.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className={`relative flex items-start mb-12 last:mb-0 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
                <motion.div
      className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10 mt-1.5"
      animate={isExpanded ? { scale: 1.5 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    />

                <div className="hidden md:block md:w-1/2" />

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
                        {item.icon_type ? <div className="text-primary">{React.createElement(ICON_MAP[item.icon_type] || Briefcase, { size: 16 })}</div> : <Briefcase className="text-primary" size={16} />}
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

                    <AnimatePresence>
                      {isExpanded && <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
                           <ul className="mt-4 pt-4 border-t border-border space-y-2">
                             {item.details?.map((detail, j) => <motion.li
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
                </div
              </motion.div>;
   })}
        </div
      </div
    </section>;
};
var stdin_default = ExperienceSection;
export {
  stdin_default as default
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
