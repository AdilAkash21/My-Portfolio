// ─── useIsMobile Hook ───
// Returns true when the viewport width is below 768px (mobile breakpoint).
// Listens for window resize events via matchMedia for efficient updates.

import * as React from "react";

const MOBILE_BREAKPOINT = 768; // Pixels — matches Tailwind's md breakpoint

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Create a media query listener for the mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Update state when the viewport crosses the breakpoint
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); // Set initial value

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile; // Convert undefined → false on first render
}
