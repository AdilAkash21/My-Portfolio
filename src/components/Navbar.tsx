// ─── Navigation Bar ───
// Fixed top navbar with: logo, nav links, theme toggle, user avatar, and mobile hamburger menu.
// Includes a scroll-linked progress bar at the bottom that fills as the user scrolls down.

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import batLogoImg from "@/assets/bat-logo-gold.png"; // Gold bat logo for batman mode

// Section anchor links for smooth scrolling navigation
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false); // Mobile menu open/closed state
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // User's profile avatar URL
  const [displayName, setDisplayName] = useState<string | null>(null); // User's display name
  const { user } = useAuth();
  const { theme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0); // 0–1 representing scroll position
  const isBatman = theme === "batman";

  // Calculate scroll progress as a percentage of total scrollable height
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
  }, []);

  // Attach passive scroll listener for the progress bar
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Fetch user profile data (avatar & display name) when user changes
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

  // Generate initials for the avatar fallback (first 2 chars of name or email)
  const initials = user
    ? (displayName || user.email || "?").slice(0, 2).toUpperCase()
    : "?";

  // Reusable avatar component linking to the profile/settings page
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
      {/* Scroll progress bar — glowing line at the bottom of the navbar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-primary transition-none"
        style={{
          width: `${scrollProgress * 100}%`,
          boxShadow: "0 0 8px hsl(var(--primary) / 0.6), 0 0 16px hsl(var(--primary) / 0.3)",
        }}
      />

      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left side: avatar (desktop) + logo */}
        <div className="flex items-center gap-4">
          {/* Avatar shown before logo on desktop only */}
          {user && (
            <span className="hidden md:inline-flex">
              <AvatarIcon />
            </span>
          )}
          {/* Logo: bat symbol in batman mode, text logo otherwise */}
          <a href="#home" className="font-mono text-lg font-semibold text-primary flex items-center gap-2">
            {isBatman ? (
              <img src={batLogoImg} alt="Bat Logo" className="h-10 w-auto drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
            ) : (
              "< ARA />"
            )}
          </a>
        </div>

        {/* Desktop navigation links + settings + theme toggle */}
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
          {/* Settings link — navigates to profile page */}
          <Link
            to="/profile"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover-underline pb-0.5"
          >
            Settings
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile: avatar + theme toggle + hamburger menu button */}
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

      {/* Mobile dropdown menu — animated open/close */}
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
                    onClick={() => setOpen(false)} // Close menu after clicking a link
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
