import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import batLogoImg from "@/assets/bat-logo-gold.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const { user } = useAuth();
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  useEffect(() => {
    if (!user) { setAvatarUrl(null); setDisplayName(null); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("avatar_url, display_name")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setAvatarUrl(data.avatar_url);
        setDisplayName(data.display_name);
      }
    };
    fetch();
  }, [user]);

  const initials = user
    ? (displayName || user.email || "?").slice(0, 2).toUpperCase()
    : "?";

  const AvatarIcon = () => (
    <Link to="/profile" aria-label="Settings">
      <Avatar className="h-8 w-8 border border-primary/30 transition-transform hover:scale-105">
        <AvatarImage src={avatarUrl ?? undefined} alt="Avatar" />
        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
          {initials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Avatar before logo on desktop */}
          {user && (
            <span className="hidden md:inline-flex">
              <AvatarIcon />
            </span>
          )}
          <a href="#home" className="font-mono text-lg font-semibold text-primary flex items-center gap-2">
            {isBatman ? (
              <img src={batLogoImg} alt="Bat Logo" className="h-8 w-auto drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
            ) : (
              "< ARA />"
            )}
          </a>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover-underline pb-0.5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            to="/profile"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover-underline pb-0.5"
          >
            Settings
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile: avatar + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {user && <AvatarIcon />}
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-b border-border bg-background"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
