import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import profileImg from "@/assets/profile-optimized.webp";
import ShaderBackground from "@/components/ShaderBackground";

const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "image";
preloadLink.type = "image/webp";
preloadLink.href = profileImg;
document.head.appendChild(preloadLink);

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <section
      id="home"
      className="relative flex min-h-[88svh] items-center overflow-hidden border-b border-border pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36"
    >
      <div className="absolute inset-0 pointer-events-none opacity-35 mix-blend-screen">
        <ShaderBackground intensity={0.34} />
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-y-0 left-[7%] w-px bg-border/60" />
        <div className="absolute inset-y-0 right-[7%] w-px bg-border/60" />
        <div className="absolute top-[30%] left-0 h-px w-[17%] bg-primary/25" />
        <div className="absolute right-0 bottom-[22%] h-px w-[20%] bg-primary/20" />
        <div className="absolute top-36 right-[7%] h-2 w-2 translate-x-1/2 rotate-45 border border-primary/60" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="relative lg:col-span-7 lg:pr-6"
            initial={initial}
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7 flex items-center gap-4 font-mono text-[11px] uppercase text-primary sm:text-xs">
              <span className="h-px w-10 bg-primary" />
              Hi, my name is
            </div>

            <h1 className="max-w-4xl font-sans text-5xl font-bold leading-[0.92] text-foreground sm:text-7xl lg:text-8xl xl:text-9xl">
              Adil Rahman
              <span className="mt-1 block text-primary">Akash.</span>
            </h1>

            <div className="mt-8 grid max-w-2xl gap-5 border-t border-border pt-6 sm:grid-cols-[1fr_1.2fr] sm:gap-8">
              <h2 className="text-base font-semibold text-foreground sm:text-lg">
                Software Engineer
                <span className="block text-primary">&amp; Web Developer</span>
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Building functional, beautiful digital experiences from Nanchong to the world.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#projects"
                  className="group relative inline-flex min-h-12 items-center gap-3 border border-primary bg-primary px-6 py-3 text-xs font-bold uppercase text-primary-foreground transition-transform duration-300 hover:-translate-y-1"
                >
                  View My Work
                  <ArrowDownRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" size={16} />
                  <span className="absolute inset-0 -z-10 translate-x-1.5 translate-y-1.5 border border-primary/45 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-3 border border-border bg-background/40 px-6 py-3 text-xs font-bold uppercase text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-primary hover:text-primary"
                >
                  Download CV
                  <Download size={15} />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none"
            initial={initial}
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -top-6 -left-6 hidden font-mono text-[10px] uppercase text-muted-foreground md:block">
              Portrait / 01
            </div>
            <div className="absolute -top-3 -right-3 h-16 w-16 border-t border-r border-primary/70" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
              <img
                src={profileImg}
                alt="Adil Rahman Akash overlooking the Shanghai skyline"
                className="h-full w-full object-cover object-top saturate-[0.85] transition-transform duration-700 ease-out hover:scale-[1.025]"
                fetchpriority="high"
                loading="eager"
                width={720}
                height={900}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase text-primary">Based in</p>
                  <p className="mt-1 text-sm font-medium text-foreground">Nanchong, China</p>
                </div>
                <div className="flex items-center gap-2 border border-border bg-background/80 px-3 py-2 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase text-foreground">Available</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 left-6 right-6 flex items-center gap-3 border border-border bg-card/95 px-5 py-4 shadow-xl backdrop-blur-md sm:left-auto sm:right-[-1.5rem] sm:w-64">
              <span className="h-px w-8 flex-none bg-primary" />
              <p className="text-xs font-medium leading-relaxed text-foreground">
                Functional craft. Beautiful execution.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;