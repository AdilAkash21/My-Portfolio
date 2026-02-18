import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Facebook, Instagram, Send } from "lucide-react";

const socials = [
  { icon: Mail, href: "mailto:adil@example.com", label: "Email" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder – integrate backend later
    alert("Thanks for reaching out! I'll get back to you soon.");
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
          <h3 className="text-3xl font-bold mb-4">Get In Touch</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you.
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
          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
          <textarea
            placeholder="Your Message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Send Message
            <Send size={16} />
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
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground transition-all hover:border-primary hover:text-primary"
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
