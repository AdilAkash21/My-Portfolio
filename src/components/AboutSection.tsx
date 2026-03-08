// ─── About Section ───
// Displays personal background info in a two-column layout.
// Left column: descriptive paragraphs about the person.
// Right column: education/experience cards with icons.
// In batman mode: shows Gotham-themed content instead.

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Shield, Skull } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const AboutSection = () => {
  const { theme } = useTheme();
  const isBatman = theme === "batman";

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section header with numbered label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-sm text-primary mb-2">01.</h2>
          <h3 className="text-3xl font-bold mb-12">
            {isBatman ? "The Man Behind the Mask" : "About Me"}
          </h3>
        </motion.div>

        {/* Two-column grid: text paragraphs + info cards */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column — descriptive text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-muted-foreground leading-relaxed"
          >
            {isBatman ? (
              <>
                <p>
                  By day, a software engineer crafting elegant code and building digital
                  experiences. By night, Gotham's silent guardian — patrolling the shadows,
                  fighting injustice, and making sure no bug goes unfixed.
                </p>
                <p>
                  Armed with a utility belt of programming languages and an unbreakable will,
                  I bridge the gap between the digital world and the darkness. Every line of
                  code is a weapon. Every deploy is a mission. Sleep is optional.
                </p>
              </>
            ) : (
              <>
                <p>
                  An international student with a passion for learning and a drive to fulfill client
                  needs through code and design. Currently pursuing my B.Sc. in Software Engineering
                  at China West Normal University in Nanchong, China.
                </p>
                <p>
                  My journey in tech started with a curiosity for how things work under the hood.
                  From low-level programming in C and C++ to crafting modern web interfaces with
                  Tailwind CSS and JavaScript, I enjoy bridging the gap between logic and aesthetics.
                </p>
              </>
            )}
          </motion.div>

          {/* Right column — education / role info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {isBatman ? (
              <>
                {/* Batman role card */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                  <Shield className="text-primary mt-1 flex-shrink-0" size={22} />
                  <div>
                    <h4 className="font-semibold text-foreground">Crime-Fighting Vigilante</h4>
                    <p className="text-sm text-muted-foreground">The Dark Knight of Gotham</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin size={12} /> Gotham City — The Batcave
                    </p>
                  </div>
                </div>
                {/* Wayne Enterprises card */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                  <Skull className="text-primary mt-1 flex-shrink-0" size={22} />
                  <div>
                    <h4 className="font-semibold text-foreground">Master of Shadows</h4>
                    <p className="text-sm text-muted-foreground">Wayne Enterprises R&D Division</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin size={12} /> Classified Location
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* University education card */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                  <GraduationCap className="text-primary mt-1 flex-shrink-0" size={22} />
                  <div>
                    <h4 className="font-semibold text-foreground">B.Sc. Software Engineering</h4>
                    <p className="text-sm text-muted-foreground">China West Normal University</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin size={12} /> Nanchong, China
                    </p>
                  </div>
                </div>
                {/* High school education card */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                  <GraduationCap className="text-primary mt-1 flex-shrink-0" size={22} />
                  <div>
                    <h4 className="font-semibold text-foreground">H.S.C. — Science</h4>
                    <p className="text-sm text-muted-foreground">Ghatail Cantonment Public School & College (G.C.P.S.C)</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin size={12} /> Ghatail, Tangail
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
