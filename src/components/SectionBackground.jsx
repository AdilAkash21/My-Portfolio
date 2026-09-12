import ShaderBackground from "@/components/ShaderBackground";
import ParticleField from "@/components/ParticleField";

const SectionBackground = ({ density = 28, intensity = 0.32 }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <div className="absolute inset-0 opacity-45 mix-blend-screen">
      <ShaderBackground intensity={intensity} />
    </div>
    <ParticleField density={density} className="opacity-45" />
  </div>
);

export default SectionBackground;
