import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.0 - Math.pow(1.0 - t, 3)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infiniteScroll: false,
      mutualScroll: true,
    });

    // expose the instance so other components (e.g., Navbar) can call lenis.scrollTo
    window.lenis = lenis;

    let rafId = 0;
    let running = true;
    function raf(time) {
      rafId = 0;
      if (!running) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    const onVisibilityChange = () => {
      running = !document.hidden;
      if (running && !rafId) rafId = requestAnimationFrame(raf);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    rafId = requestAnimationFrame(raf);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      lenis.destroy();
      if (window.lenis === lenis) window.lenis = undefined;
    };
  }, []);

  return <div className="lenis-wrapper">{children}</div>;
};

export default SmoothScroll;
