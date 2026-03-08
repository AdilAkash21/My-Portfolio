// ─── NavLink Component ───
// A wrapper around React Router's NavLink that supports separate
// className, activeClassName, and pendingClassName props.
// Uses the cn() utility to merge class names based on active/pending state.

import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string; // Base class names (always applied)
  activeClassName?: string; // Additional classes when the link's route is active
  pendingClassName?: string; // Additional classes when the link's route is pending (during navigation)
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
