import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      if (window.lenis === lenis) window.lenis = undefined;
    };
  }, []);

  return <div className="lenis-wrapper">{children}</div>;
};

export default SmoothScroll;
