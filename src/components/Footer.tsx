// ─── Footer ───
// Simple centered footer with copyright text.
// In batman mode: shows a Gotham-themed message instead.
// Wrapped in forwardRef to avoid React warnings when used inside motion containers.

import { forwardRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  return (
    <footer ref={ref} className="border-t border-border py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          {isBatman
            ? `Gotham is protected. Built in the Batcave \u00A9 ${new Date().getFullYear()}`
            : `Designed & Built by Adil Rahman Akash \u00A9 ${new Date().getFullYear()}`}
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
