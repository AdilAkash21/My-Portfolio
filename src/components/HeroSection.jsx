import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import profileImg from "@/assets/profile-optimized.webp";
import ShaderBackground from "@/components/ShaderBackground";
import ParticleField from "@/components/ParticleField";

const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "image";
preloadLink.type = "image/webp";
preloadLink.href = profileImg;
document.head.appendChild(preloadLink);

const ROLES = [
  "Software Engineer | Web Developer",
  "Mobile App Developer | Designer",
];

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [typed, setTyped] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const handleScroll = useCallback(() => setScrollY(window.scrollY), []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Typewriter for the role line
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(ROLES[0]);
      return;
    }
    const full = ROLES[roleIdx];
    const done = !deleting && typed === full;
    const empty = deleting && typed === "";
    const delay = done ? 2200 : empty ? 300 : deleting ? 35 : 65;
    const t = setTimeout(() => {
      if (done) return setDeleting(true);
      if (empty) {
        setDeleting(false);
        return setRoleIdx((i) => (i + 1) % ROLES.length);
      }
      setTyped(deleting ? full.slice(0, typed.length - 1) : full.slice(0, typed.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  const parallaxOffset = scrollY * 0.3;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* WebGL aurora */}
      <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen">
        <ShaderBackground intensity={0.55} />
      </div>

      {/* Live geometric + particle field */}
      <ParticleField className="opacity-70" />

      {/* Animated ambient glows */}
      <motion.div
        className="absolute left-[10%] w-[560px] h-[560px] rounded-full bg-primary/[0.09] blur-[140px] pointer-events-none will-change-transform"
        style={{ top: `calc(20% - ${parallaxOffset}px)` }}
        animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.12, 1], x: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] w-[420px] h-[420px] rounded-full bg-primary/[0.07] blur-[120px] pointer-events-none will-change-transform"
        style={{ top: `calc(45% - ${parallaxOffset * 0.5}px)` }}
        animate={{ opacity: [0.9, 0.45, 0.9], scale: [1.1, 1, 1.1], y: [0, -30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[160px] pointer-events-none"
        animate={{ opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-14 lg:gap-20 max-w-6xl mx-auto">
          {/* ─── Left: copy ─── */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-[0.7rem] tracking-[0.35em] uppercase text-muted-foreground mb-6">
              Personal Portfolio
            </p>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
              <span className="block text-foreground">Adil Rahman</span>
              <span className="block gradient-text">Akash</span>
            </h1>

            <h2 className="text-lg sm:text-xl font-medium text-foreground/90 mb-6 min-h-[1.75rem]">
              {typed}
              <span className="inline-block w-[2px] h-[1.1em] align-[-0.15em] ml-0.5 bg-primary animate-pulse" />
            </h2>

            <p className="text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-9 leading-relaxed">
              A software engineer who believes every project teaches something new — building
              functional, beautiful digital experiences from Nanchong to the world.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground btn-float-hover hover:shadow-[0_0_30px_hsl(var(--primary)/0.35)] transition-shadow"
                >
                  View Profile
                  <ArrowUpRight size={16} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground/90 btn-float-hover hover:border-primary hover:text-primary transition-colors"
                >
                  Download CV
                  <Download size={16} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground/90 btn-float-hover hover:border-primary hover:text-primary transition-colors"
                >
                  Contact Me
                  <Mail size={16} />
                </a>
              </Magnetic>
            </div>

            <div className="mt-9 flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
              <MapPin size={15} className="text-primary" />
              Nanchong, Sichuan, China
            </div>
          </motion.div>

          {/* ─── Right: framed portrait ─── */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative group">
              {/* Outer nested frames */}
              <div className="rounded-[2.25rem] border border-primary/15 bg-primary/[0.03] p-3 sm:p-4 shadow-[0_30px_80px_-40px_hsl(var(--primary)/0.5)]">
                <div className="rounded-[1.75rem] border border-primary/20 bg-card/40 p-2.5 sm:p-3 backdrop-blur-sm">
                  <div className="relative w-60 h-[19rem] sm:w-[19rem] sm:h-[24rem] overflow-hidden rounded-[1.25rem] ring-1 ring-primary/25">
                    <img
                      src={profileImg}
                      alt="Adil Rahman Akash"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      fetchPriority="high"
                      loading="eager"
                      width={304}
                      height={384}
                      decoding="sync"
                    />
                    {/* Eyelid reveal */}
                    <motion.div
                      className="absolute inset-x-0 top-0 h-1/2 bg-background z-10 origin-top"
                      initial={{ scaleY: 1 }}
                      animate={{ scaleY: 0 }}
                      transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.div
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-background z-10 origin-bottom"
                      initial={{ scaleY: 1 }}
                      animate={{ scaleY: 0 }}
                      transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating info card */}
              <motion.div
                className="absolute -bottom-6 -left-6 sm:-left-10 rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-md px-5 py-4 shadow-xl max-w-[16rem]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <p className="font-serif text-xl text-primary leading-none mb-1.5">2026</p>
                <p className="text-xs text-muted-foreground leading-snug">
                  Currently in progress — B.Sc. in Software Engineering
                </p>
              </motion.div>

              {/* Availability chip */}
              <div className="absolute -top-4 right-4 flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur px-3 py-1.5 shadow-lg ring-1 ring-border">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs font-medium text-foreground">Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
