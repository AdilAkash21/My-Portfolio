import { useState, useEffect, useRef } from "react";
const LazyImage = ({ src, alt, className, wrapperClassName, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
      // Start loading 200px before entering viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`relative overflow-hidden ${wrapperClassName ?? ""}`}>
      {
    /* Blurred placeholder background — visible until full image loads */
  }
      <div
    className={`absolute inset-0 bg-muted/30 backdrop-blur-xl transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
  />

      {
    /* Full-resolution image — only starts loading when in viewport */
  }
      {inView && <img
    src={src}
    alt={alt}
    className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
    onLoad={() => setLoaded(true)}
    {...props}
  />}
    </div>;
};
var stdin_default = LazyImage;
export {
  stdin_default as default
};
