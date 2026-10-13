import ShaderBackground from "@/components/ShaderBackground";
import ParticleField from "@/components/ParticleField";

const SectionBackground = ({ density = 28, intensity = 0.32 }) => (
  <div className="live-background-layer absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Mobile opacities match the hero so the aurora + particles read the same on small screens */}
    <div className="absolute inset-0 opacity-85 sm:opacity-45 mix-blend-screen">
      <ShaderBackground intensity={Math.max(intensity, 0.42)} />
    </div>
    <ParticleField density={density} className="opacity-85 sm:opacity-45" />
  </div>
);

export default SectionBackground;
