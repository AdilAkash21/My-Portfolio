// ─── Lazy Image Component ───
// Progressively loads images with a blur-up placeholder effect.
// Shows a blurred low-res version (or solid bg) while the full image loads,
// then crossfades to the sharp version once ready.

import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** The full-resolution image source */
  src: string;
  /** Optional CSS class for the wrapper div */
  wrapperClassName?: string;
}

const LazyImage = ({ src, alt, className, wrapperClassName, ...props }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false); // Tracks when full image has loaded
  const [inView, setInView] = useState(false); // Tracks when element enters viewport
  const ref = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to defer loading until the image is near the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { rootMargin: "200px" } // Start loading 200px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${wrapperClassName ?? ""}`}>
      {/* Blurred placeholder background — visible until full image loads */}
      <div
        className={`absolute inset-0 bg-muted/30 backdrop-blur-xl transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Full-resolution image — only starts loading when in viewport */}
      {inView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
          onLoad={() => setLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
