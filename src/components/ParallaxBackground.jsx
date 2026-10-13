import ShaderBackground from "@/components/ShaderBackground";
import ParticleField from "@/components/ParticleField";

const ParallaxBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="live-background-layer absolute inset-0 opacity-60 mix-blend-screen">
        <ShaderBackground intensity={0.65} />
      </div>
      <ParticleField density={46} className="opacity-70" animateOnMobile />
    </div>
  );
};

export default ParallaxBackground;
