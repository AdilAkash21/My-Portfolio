// ─── Custom Cursor ───
// Themed cursor with trailing dot and ring that reacts to hover on interactive elements.

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let hovering = false;
    let clicking = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onDown = () => { clicking = true; update(); };
    const onUp = () => { clicking = false; update(); };

    const interactiveSelector = "a, button, [role='button'], input, textarea, select, [data-cursor='pointer'], .cursor-pointer";

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(interactiveSelector)) hovering = true;
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(interactiveSelector)) hovering = false;
    };

    const update = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      // Ring follows with lerp
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      const scale = clicking ? 0.6 : hovering ? 1.8 : 1;
      const opacity = hovering ? 0.6 : 0.4;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${scale})`;
      ring.style.opacity = String(opacity);

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(${clicking ? 0.5 : hovering ? 1.5 : 1})`;

      raf = requestAnimationFrame(update);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.style.cursor = "none";
    raf = requestAnimationFrame(update);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(raf);
    };
  }, []);

  // Hide on touch devices via CSS
  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: isBatman ? "hsl(var(--primary))" : "hsl(var(--primary))",
          transition: "background-color 0.3s",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1.5px solid hsl(var(--primary) / 0.5)`,
          transition: "border-color 0.3s, width 0.2s, height 0.2s",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
};

export default CustomCursor;
