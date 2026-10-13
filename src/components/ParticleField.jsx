import { useEffect, useRef } from "react";

/**
 * Live geometric + particle background (canvas).
 * Draws a slowly drifting grid of gold points with connecting lines,
 * plus floating particles. Respects reduced-motion and pauses offscreen.
 */
const ParticleField = ({ density = 46, className = "", animateOnMobile = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse), (max-width: 767px)").matches;
    const staticBackground = reduced || (coarse && !animateOnMobile);
    let width = 0;
    let height = 0;
    let frameId = 0;
    let running = true;
    // Match the shader layer's DPR floor (1 on small screens) so both
    // background canvases render at the same effective resolution.
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1 : 2);
    let particles = [];

    const seed = () => {
      const maxParticles = coarse ? 12 : density;
      const minParticles = coarse ? 8 : 18;
      const count = Math.round(Math.min(maxParticles, (width * height) / 22000));
      particles = Array.from({ length: Math.max(minParticles, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (coarse ? 0.8 : 0.22),
        vy: (Math.random() - 0.5) * (coarse ? 0.8 : 0.22),
        r: Math.random() * (coarse ? 1.8 : 1.6) + (coarse ? 1.8 : 0.6),
        a: Math.random() * (coarse ? 0.35 : 0.5) + (coarse ? 0.5 : 0.2),
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
      if (staticBackground) draw(0);
    };

    const drawGrid = (t) => {
      const step = 64;
      const offset = (t * 0.008) % step;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255, 184, 0, ${coarse ? 0.1 : staticBackground ? 0.07 : 0.045})`;
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
            const alpha = (1 - d2 / 17000) * (coarse ? 0.24 : 0.16);
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
        ctx.fillStyle = `rgba(255, 184, 0, ${p.a * pulse * (coarse ? 1.1 : 1)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (!staticBackground) {
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
      draw(t);
      frameId = coarse
        ? window.setTimeout(() => loop(performance.now()), 1000 / 30)
        : requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!running || frameId) return;
      frameId = coarse
        ? window.setTimeout(() => loop(performance.now()), 0)
        : requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (!frameId) return;
      if (coarse) window.clearTimeout(frameId);
      else cancelAnimationFrame(frameId);
      frameId = 0;
    };

    resize();
    if (!staticBackground) startLoop();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let io;
    if (!staticBackground) {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          startLoop();
        } else if (!entry.isIntersecting) {
          running = false;
          stopLoop();
        }
      });
      io.observe(canvas);
    }

    const onVisibility = () => {
      if (staticBackground) return;
      if (document.hidden) {
        running = false;
        stopLoop();
      } else if (!running) {
        running = true;
        startLoop();
      }
    };
    if (!staticBackground) document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      stopLoop();
      ro.disconnect();
      io?.disconnect();
      if (!staticBackground) document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, animateOnMobile]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
    />
  );
};

export default ParticleField;
