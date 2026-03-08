// ─── Contact Section ───
// Two-column layout: contact info cards (left) and a contact form (right).
// Form validates with Zod and submits messages to the database.
// In batman mode: shows redacted contact info and Gotham-themed text.

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Phone, MapPin, Send, Shield, Loader2, ExternalLink } from "lucide-react";
import { z } from "zod"; // Schema validation library
import { useTheme } from "@/contexts/ThemeContext";


// Zod schema for form validation
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be under 1000 characters"),
});

// Contact information data — each item has normal and batman mode variants
const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Nanchong, China",
    href: "https://maps.google.com/?q=Nanchong,China",
    batmanValue: "Gotham City",
    batmanHref: undefined as string | undefined, // No link in batman mode
  },
  {
    icon: Mail,
    label: "Email",
    value: "adilakash23@gmail.com",
    href: "mailto:adilakash23@gmail.com",
    batmanValue: "████████@████.███", // Redacted in batman mode
    batmanHref: undefined as string | undefined,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "AdilAkash21",
    href: "https://github.com/AdilAkash21",
    batmanValue: "██████████",
    batmanHref: undefined as string | undefined,
  },
  {
    icon: Phone,
    label: "Mobile",
    value: "+86 17390219212",
    href: "tel:+8617390219212",
    batmanValue: "███ ████████████",
    batmanHref: undefined as string | undefined,
  },
];

const ContactSection = () => {
  // Form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({}); // Field-level validation errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  // Handle form submission: validate → insert into database → show feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data against Zod schema
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      // Map Zod errors to field-level error messages
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate sending (replace with EmailJS, Formspree, or your own backend)
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setSubmitStatus("success");
    setForm({ name: "", email: "", message: "" }); // Reset form on success
  };

  return (
    <section id="contact" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-mono text-sm text-primary mb-2">04.</h2>
          <h3 className="text-3xl font-bold mb-4">
            {isBatman ? "Light the Signal" : "Get In Touch"}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {isBatman
              ? "Gotham needs you? Send a signal into the night sky."
              : "Have a project in mind or just want to say hello? I'd love to hear from you."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* ─── Left Column: Contact Info Cards ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <h4 className="text-lg font-semibold mb-6">
              {isBatman ? "Batcomputer Channels" : "Contact Info"}
            </h4>
            {contactInfo.map((item, i) => {
              // Choose display value and link based on theme
              const displayValue = isBatman ? (item.batmanValue ?? item.value) : item.value;
              const displayHref = isBatman ? item.batmanHref : item.href;

              return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }} // Staggered entrance
              >
                {displayHref ? (
                  /* Clickable card with external link */
                  <a
                    href={displayHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                        {displayValue}
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                    </div>
                  </a>
                ) : (
                  /* Non-clickable card (redacted in batman mode) */
                  <div className={`flex items-start gap-4 p-4 rounded-xl border border-border bg-background ${isBatman ? 'opacity-90' : ''}`}>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                        {isBatman ? "Classified" : item.label}
                      </p>
                      <p className={`text-sm font-medium text-foreground ${isBatman ? 'font-mono tracking-widest' : ''}`}>{displayValue}</p>
                    </div>
                  </div>
                )}
              </motion.div>
              );
            })}
          </motion.div>

          {/* ─── Right Column: Contact Form ─── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-5"
          >
            <h4 className="text-lg font-semibold mb-6">
              {isBatman ? "Send a Signal" : "Send a Message"}
            </h4>
            {/* Name and email inputs side by side */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder={isBatman ? "Your Alias" : "Your Name"}
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors((prev) => ({ ...prev, name: "" })); }}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder={isBatman ? "Secure Channel" : "Your Email"}
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors((prev) => ({ ...prev, email: "" })); }}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            {/* Message textarea */}
            <div>
              <label htmlFor="contact-message" className="sr-only">Message</label>
              <textarea
                id="contact-message"
                placeholder={isBatman ? "Your Intel Report" : "Your Message"}
                required
                rows={6}
                maxLength={1000}
                value={form.message}
                onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors((prev) => ({ ...prev, message: "" })); }}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>
            {/* Submit button with loading state */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-primary btn-float-hover hover:bg-primary hover:text-primary-foreground hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
            >
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : (
                <>{isBatman ? "Send Signal" : "Send Message"} {isBatman ? <Shield size={16} /> : <Send size={16} />}</>
              )}
            </button>
            {/* Success / error feedback messages */}
            {submitStatus === "success" && (
              <p className="text-sm text-primary">{isBatman ? "Signal received. The Dark Knight will respond." : "Thanks for reaching out! I'll get back to you soon."}</p>
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
