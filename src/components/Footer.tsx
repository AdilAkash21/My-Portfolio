import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          {isBatman
            ? `Gotham is protected. Built in the Batcave \u00A9 ${new Date().getFullYear()}`
            : `Designed & Built by Adil Rahman Akash \u00A9 ${new Date().getFullYear()}`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
