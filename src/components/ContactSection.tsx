import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Facebook, Instagram, Send, Shield } from "lucide-react";
import { z } from "zod";
import { useTheme } from "@/contexts/ThemeContext";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be under 1000 characters"),
});

const socials = [
  { icon: Mail, href: "mailto:adil@example.com", label: "Email" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    alert(isBatman ? "Signal received. The Dark Knight will respond." : "Thanks for reaching out! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-mono text-sm text-primary mb-2">04.</h2>
          <h3 className="text-3xl font-bold mb-4">
            {isBatman ? "Light the Signal" : "Get In Touch"}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {isBatman
              ? "Gotham needs you? Send a signal into the night sky. The Dark Knight is listening."
              : "Have a project in mind or just want to say hello? I'd love to hear from you."}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-lg mx-auto space-y-5"
        >
          <div>
            <label htmlFor="contact-name" className="sr-only">{isBatman ? "Your Alias" : "Your Name"}</label>
            <input
              id="contact-name"
              type="text"
              placeholder={isBatman ? "Your Alias" : "Your Name"}
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors((prev) => ({ ...prev, name: "" })); }}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder={isBatman ? "Secure Channel (Email)" : "Your Email"}
              required
              maxLength={255}
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors((prev) => ({ ...prev, email: "" })); }}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea
              placeholder={isBatman ? "Your Intel Report" : "Your Message"}
              required
              rows={5}
              maxLength={1000}
              value={form.message}
              onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors((prev) => ({ ...prev, message: "" })); }}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
            />
            {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-primary btn-float-hover hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
          >
            {isBatman ? "Send Signal" : "Send Message"}
            {isBatman ? <Shield size={16} /> : <Send size={16} />}
          </button>
        </motion.form>

        {/* Socials */}
        <div className="flex items-center justify-center gap-5 mt-16">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover-icon-fill"
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
