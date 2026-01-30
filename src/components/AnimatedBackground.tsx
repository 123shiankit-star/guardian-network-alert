import { motion } from "framer-motion";

// Floating orb component
const FloatingOrb = ({ 
  delay, 
  duration, 
  size, 
  left, 
  top,
  color
}: { 
  delay: number; 
  duration: number; 
  size: number; 
  left: string; 
  top: string;
  color: string;
}) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ 
        left, 
        top,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
      animate={{ 
        y: [0, -20, 0],
        x: [0, 15, 0],
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Particle component
const Particle = ({ delay, index }: { delay: number; index: number }) => {
  const isLeft = Math.random() > 0.5;
  const color = index % 2 === 0 ? 'hsl(280 80% 65%)' : 'hsl(175 80% 50%)';
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: Math.random() * 3 + 1,
        height: Math.random() * 3 + 1,
        background: color,
        boxShadow: `0 0 8px ${color}`,
      }}
      animate={{
        y: isLeft ? [0, -100, 0] : [0, 100, 0],
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, hsl(280 80% 65% / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, hsl(175 80% 50% / 0.08) 0%, transparent 50%),
            linear-gradient(180deg, hsl(250 30% 6%) 0%, hsl(250 30% 4%) 100%)
          `,
        }}
      />

      {/* Main floating orbs */}
      <FloatingOrb delay={0} duration={20} size={400} left="-100px" top="-100px" color="hsl(280 80% 65% / 0.3)" />
      <FloatingOrb delay={3} duration={25} size={300} left="80%" top="20%" color="hsl(175 80% 50% / 0.25)" />
      <FloatingOrb delay={6} duration={22} size={350} left="50%" top="80%" color="hsl(220 90% 60% / 0.2)" />

      {/* Animated gradient shapes */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          top: "10%",
          left: "5%",
          background: 'radial-gradient(circle, hsl(280 80% 65% / 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          bottom: "10%",
          right: "10%",
          background: 'radial-gradient(circle, hsl(175 80% 50% / 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <Particle key={i} index={i} delay={Math.random() * 6} />
      ))}

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(175 80% 50%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(175 80% 50%) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(250 30% 6% / 0.5) 100%)',
        }}
      />
    </div>
  );
};
