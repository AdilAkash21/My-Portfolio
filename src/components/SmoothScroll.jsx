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
    try {
      // attach to window for global access; clean up on unmount
      // eslint-disable-next-line no-undef
      window.lenis = lenis;
    } catch (e) {
      // ignore in environments where window is not writable
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      try {
        // cleanup global reference
        // eslint-disable-next-line no-undef
        if (window.lenis === lenis) window.lenis = undefined;
      } catch (e) {}
    };
  }, []);

  return <div className="lenis-wrapper">{children}</div>;
};

export default SmoothScroll;
