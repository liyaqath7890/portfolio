import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({ children, className = '', hoverEffect = false, ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={hoverEffect ? { y: -5, boxShadow: '0 15px 40px -10px rgba(56, 189, 248, 0.3)' } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
