import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ChevronDown } from "lucide-react";
import { useExperience } from "@/hooks/useSupabaseData";
import SectionBackground from "@/components/SectionBackground";

const ExperienceSection = () => {
  const { data: timeline = [], isLoading } = useExperience("dark");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <section id="experience" className="relative py-28 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center font-mono text-sm text-muted-foreground">
            Loading education history…
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      <SectionBackground density={24} />
      {/* Top divider */}
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="font-mono text-[0.7rem] tracking-[0.35em] uppercase text-muted-foreground mb-4">
              02 — Education
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
              Academic <span className="gradient-text">journey</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />

            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isExpanded = expandedIndex === i;
              const Icon = GraduationCap;

              return (
                <motion.div
                  key={item.id || item.title || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className={`relative flex items-start mb-10 last:mb-0 ${
                    isLeft ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 mt-1.5 flex items-center justify-center"
                    animate={isExpanded ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </motion.div>

                  {/* Empty spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <motion.div
                      className="group hover-box rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm p-6 cursor-pointer select-none hover:bg-card/60"
                      onClick={() => toggleExpand(i)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-primary" size={18} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-primary">
                              {item.year}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                              className="ml-auto"
                            >
                              <ChevronDown
                                className="text-muted-foreground group-hover:text-primary transition-colors"
                                size={16}
                              />
                            </motion.div>
                          </div>

                          <h4 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-sm font-medium text-muted-foreground mb-3">
                            {item.organization}
                          </p>
                          <p className="text-sm text-muted-foreground/90 leading-relaxed">
                            {item.description}
                          </p>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-5 pt-5 border-t border-border/70 space-y-3">
                                  {item.details?.map((detail, j) => (
                                    <motion.li
                                      key={j}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: j * 0.05 }}
                                      className="text-sm text-muted-foreground flex items-start gap-3"
                                    >
                                      <span className="mt-2 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                                      {detail}
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
