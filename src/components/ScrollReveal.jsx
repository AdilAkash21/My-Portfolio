import { motion } from "framer-motion";
const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.5,
  className
}) => {
  return <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: false, amount: 0.15 }}
    transition={{
      duration,
      delay,
      ease: "easeOut"
    }}
    className={className}
  >
      {children}
    </motion.div>;
};
var stdin_default = ScrollReveal;
export {
  stdin_default as default
};
