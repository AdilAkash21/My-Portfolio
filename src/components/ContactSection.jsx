import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Phone, MapPin, Send, Loader2, ArrowUpRight } from "lucide-react";
import { z } from "zod";
import SectionBackground from "@/components/SectionBackground";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be under 1000 characters"),
});

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Nanchong, China",
    href: "https://maps.google.com/?q=Nanchong,China",
  },
  {
    icon: Mail,
    label: "Email",
    value: "adilakash23@gmail.com",
    href: "mailto:adilakash23@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "AdilAkash21",
    href: "https://github.com/AdilAkash21",
  },
  {
    icon: Phone,
    label: "Mobile",
    value: "+86 17390219212",
    href: "tel:+8617390219212",
  },
];

const inputClass =
  "w-full rounded-xl border border-border/70 bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus("idle");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitStatus("success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <SectionBackground density={24} />
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="font-mono text-[0.7rem] tracking-[0.35em] uppercase text-muted-foreground mb-4">
            07 — Contact
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-5">
            Let's build something <span className="gradient-text">together</span>
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto items-start">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-3"
          >
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                className="group hover-box flex items-center gap-4 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm p-4 hover:bg-primary/[0.04]"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {item.value}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all"
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hover-box lg:col-span-3 rounded-[1.75rem] border border-primary/15 bg-card/40 backdrop-blur-sm p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  className={inputClass}
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Your Email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className={inputClass}
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">Message</label>
              <textarea
                id="contact-message"
                placeholder="Tell me about your project..."
                required
                rows={6}
                maxLength={1000}
                value={form.message}
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });
                  setErrors((prev) => ({ ...prev, message: "" }));
                }}
                className={`${inputClass} resize-none`}
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground btn-float-hover hover:shadow-[0_0_30px_hsl(var(--primary)/0.35)] disabled:opacity-50 disabled:pointer-events-none transition-shadow"
            >
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : (
                <>Send Message <Send size={16} /></>
              )}
            </button>

            {submitStatus === "success" && (
              <p className="text-sm text-primary">
                Thanks for reaching out! I'll get back to you soon.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
