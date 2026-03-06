import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-sm text-primary mb-2">01.</h2>
          <h3 className="text-3xl font-bold mb-12">About Me</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-muted-foreground leading-relaxed"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
