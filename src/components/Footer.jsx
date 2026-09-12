import { forwardRef } from "react";
const Footer = forwardRef((_, ref) => {
  return <footer ref={ref} className="border-t border-border py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          {`Designed & Built by Adil Rahman Akash \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()}`}
        </p>
      </div>
    </footer>;
});
Footer.displayName = "Footer";
var stdin_default = Footer;
export {
  stdin_default as default
};
