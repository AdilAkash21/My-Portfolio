import { motion } from "framer-motion";
const PageTransition = ({ children }) => <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -12 }}
  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
>
    {children}
  </motion.div>;
var stdin_default = PageTransition;
export {
  stdin_default as default
};
