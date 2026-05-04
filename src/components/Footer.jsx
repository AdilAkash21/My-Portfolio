import { forwardRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
const Footer = forwardRef((_, ref) => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";
  return <footer ref={ref} className="border-t border-border py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          {isBatman ? `Gotham is protected. Built in the Batcave \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()}` : `Designed & Built by Adil Rahman Akash \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()}`}
        </p>
      </div>
    </footer>;
});
Footer.displayName = "Footer";
var stdin_default = Footer;
export {
  stdin_default as default
};
