import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionBackground from "@/components/SectionBackground";

const testimonials = [
  {
    quote:
      "Akash delivered an outstanding website with clean code and pixel-perfect design. His attention to detail is remarkable.",
    name: "Sarah Chen",
    role: "Product Manager, TechCorp",
    initials: "SC",
  },
  {
    quote:
      "Working with Akash was a great experience. He understood our requirements perfectly and delivered ahead of schedule.",
    name: "James Wilson",
    role: "Founder, StartupXYZ",
    initials: "JW",
  },
  {
    quote:
      "Impressive problem-solving skills and a true passion for development. Akash is the kind of developer every team needs.",
    name: "Maria Rodriguez",
    role: "Senior Developer, WebFlow Inc.",
    initials: "MR",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      <SectionBackground density={22} />
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
            06 — Testimonials
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
            What people <span className="gradient-text">say</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group hover-box flex flex-col rounded-2xl border border-primary/15 bg-card/40 backdrop-blur-sm p-7"
            >
              <Quote className="text-primary/40 mb-5" size={26} />
              <blockquote className="font-serif text-[1.02rem] leading-relaxed text-foreground/85 flex-1">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-border/60 pt-5">
                <div className="w-10 h-10 rounded-full border border-primary/25 bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
