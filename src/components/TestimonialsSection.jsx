import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
const normalTestimonials = [
  {
    quote: "Akash delivered an outstanding website with clean code and pixel-perfect design. His attention to detail is remarkable.",
    name: "Sarah Chen",
    role: "Product Manager, TechCorp",
    initials: "SC"
  },
  {
    quote: "Working with Akash was a great experience. He understood our requirements perfectly and delivered ahead of schedule.",
    name: "James Wilson",
    role: "Founder, StartupXYZ",
    initials: "JW"
  },
  {
    quote: "Impressive problem-solving skills and a true passion for development. Akash is the kind of developer every team needs.",
    name: "Maria Rodriguez",
    role: "Senior Developer, WebFlow Inc.",
    initials: "MR"
  }
];
const batmanTestimonials = [
  {
    quote: "After decades of service, I can confidently say Master Wayne's code is as disciplined as his combat training. Impeccable, sir.",
    name: "Alfred Pennyworth",
    role: "Butler & Systems Administrator",
    initials: "AP"
  },
  {
    quote: "He's a vigilante, but I'll be damned if his crime-tracking software hasn't cut Gotham's crime rate by 40%. Off the record, of course.",
    name: "James Gordon",
    role: "Commissioner, GCPD",
    initials: "JG"
  },
  {
    quote: "The Batcomputer's neural network is... annoyingly superior to anything at S.T.A.R. Labs. Not that I'd ever admit that publicly.",
    name: "Lucius Fox",
    role: "CEO, Wayne Enterprises",
    initials: "LF"
  }
];
const TestimonialsSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  const testimonials = isBatman ? batmanTestimonials : normalTestimonials;
  return <section id="testimonials" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
          <h2 className="font-mono text-sm text-primary mb-2">06.</h2>
          <h3 className="text-3xl font-bold mb-12">
            {isBatman ? "Allied Testimonies" : "What People Say"}
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => <motion.div
    key={t.name}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.1 * i }}
    className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors flex flex-col"
  >
              <Quote className="text-primary/30 mb-4" size={24} />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
var stdin_default = TestimonialsSection;
export {
  stdin_default as default
};
