import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import profileImg from "@/assets/profile-optimized.webp";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32">
      {/* Subtle bg glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sm text-primary mb-4">Hi, my name is</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Adil Rahman{" "}
              <span className="gradient-text">Akash</span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground mb-6">
              Software Engineer & Web Designer
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              Building functional, beautiful digital experiences from Nanchong to the world.
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              View My Work
              <ArrowDown size={16} />
            </a>
          </motion.div>

          {/* Profile image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative group">
              {/* Gradient ring background */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary via-primary/40 to-transparent opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-500" />

              {/* Main image container */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-2xl overflow-hidden ring-1 ring-primary/20 shadow-xl">
                <img
                  src={profileImg}
                  alt="Adil Rahman Akash"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fetchPriority="high"
                  width={288}
                  height={288}
                  decoding="async"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Status dot */}
              <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-lg ring-1 ring-border">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-foreground">Available</span>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-primary/40 rounded-tl-lg pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-primary/40 rounded-br-lg pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
