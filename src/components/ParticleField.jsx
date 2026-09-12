import { useEffect, useRef } from "react";

/**
 * Live geometric + particle background (canvas).
 * Draws a slowly drifting grid of gold points with connecting lines,
 * plus floating particles. Respects reduced-motion and pauses offscreen.
 */
const ParticleField = ({ density = 46, className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 2);
    const frameInterval = coarse ? 1000 / 30 : 0;
    let lastFrame = 0;

    let particles = [];

    const seed = () => {
      const count = Math.round(
        Math.min(density, (width * height) / 22000)
      );
      particles = Array.from({ length: Math.max(18, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6,
        a: Math.random() * 0.5 + 0.2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawGrid = (t) => {
      const step = 64;
      const offset = (t * 0.008) % step;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 184, 0, 0.045)";
      ctx.beginPath();
      for (let x = -step + offset; x < width + step; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = -step + offset; y < height + step; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      drawGrid(t);

      // links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 17000) {
            const alpha = (1 - d2 / 17000) * 0.16;
            ctx.strokeStyle = `rgba(255, 184, 0, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const p of particles) {
        const pulse = 0.65 + Math.sin(t * 0.001 + p.x * 0.01) * 0.35;
        ctx.fillStyle = `rgba(255, 184, 0, ${p.a * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }
      }
    };

    const loop = (t) => {
      if (!running) return;
      if (!frameInterval || t - lastFrame >= frameInterval) {
        draw(t);
        lastFrame = t;
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
    />
  );
};

export default ParticleField;
