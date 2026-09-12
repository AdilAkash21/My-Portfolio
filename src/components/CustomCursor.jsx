import { useEffect, useRef } from "react";
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const auraRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const aura = auraRef.current;
    if (!cursor || !ring || !aura) return;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let hovering = false;
    let clicking = false;
    let visible = false;
    let raf;
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      visible = true;
    };
    const onLeave = () => {
      visible = false;
    };
    const onEnter = () => {
      visible = true;
    };
    const onDown = () => {
      clicking = true;
      document.documentElement.classList.add("cursor-is-clicking");
    };
    const onUp = () => {
      clicking = false;
      document.documentElement.classList.remove("cursor-is-clicking");
    };
    const interactiveSelector = "a, button, [role='button'], input, textarea, select, [data-cursor='pointer'], .cursor-pointer";
    const onOver = (e) => {
      hovering = Boolean(e.target?.closest?.(interactiveSelector));
      document.documentElement.classList.toggle("cursor-is-hovering", hovering);
    };
    const onOut = (e) => {
      const nextTarget = e.relatedTarget;
      hovering = Boolean(nextTarget?.closest?.(interactiveSelector));
      document.documentElement.classList.toggle("cursor-is-hovering", hovering);
    };
    const update = () => {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${clicking ? 0.72 : hovering ? 1.15 : 1})`;
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      const ringScale = clicking ? 0.75 : hovering ? 1.55 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      aura.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${hovering ? 1.25 : 1})`;
      cursor.style.opacity = visible ? "1" : "0";
      ring.style.opacity = visible ? "1" : "0";
      aura.style.opacity = visible ? "1" : "0";
      raf = requestAnimationFrame(update);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.style.cursor = "none";
    raf = requestAnimationFrame(update);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.style.cursor = "";
      document.documentElement.classList.remove("cursor-is-hovering", "cursor-is-clicking");
      cancelAnimationFrame(raf);
    };
  }, []);
  return <>
      <div
    ref={auraRef}
    className="custom-cursor__aura fixed top-0 left-0 z-[9997] pointer-events-none"
  >
    <span />
  </div>
      <div
    ref={ringRef}
    className="custom-cursor__ring fixed top-0 left-0 z-[9998] pointer-events-none"
  >
    <span className="custom-cursor__tick custom-cursor__tick--top" />
    <span className="custom-cursor__tick custom-cursor__tick--right" />
    <span className="custom-cursor__tick custom-cursor__tick--bottom" />
    <span className="custom-cursor__tick custom-cursor__tick--left" />
    <span className="custom-cursor__scanline" />
  </div>
      <div
    ref={cursorRef}
    className="custom-cursor__core fixed top-0 left-0 z-[9999] pointer-events-none"
  />
    </>;
};
var stdin_default = CustomCursor;
export {
  stdin_default as default
};
