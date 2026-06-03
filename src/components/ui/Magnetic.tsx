import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Magnetic = ({ children, strength = 0.3, radius = 100, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX**2 + distanceY**2);

      if (distance < radius) {
        setPosition({
          x: (distanceX / radius) * 20 * strength,
          y: (distanceY / radius) * 20 * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength, radius]);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
