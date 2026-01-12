import { motion } from "framer-motion";

// Floating 3D geometric shapes
const FloatingShape = ({ 
  delay, 
  duration, 
  size, 
  left, 
  top, 
  type 
}: { 
  delay: number; 
  duration: number; 
  size: number; 
  left: string; 
  top: string; 
  type: 'cube' | 'diamond' | 'hexagon';
}) => {
  const shapes = {
    cube: (
      <div className="relative" style={{ width: size, height: size, transformStyle: 'preserve-3d' }}>
        {/* Front face */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, hsl(280 80% 65% / 0.4), hsl(175 80% 50% / 0.2))',
            border: '1px solid hsl(280 80% 65% / 0.3)',
            boxShadow: '0 0 30px hsl(280 80% 65% / 0.3), inset 0 0 20px hsl(280 80% 65% / 0.1)',
          }}
        />
        {/* Top face */}
        <div 
          className="absolute rounded-lg"
          style={{
            width: size,
            height: size * 0.4,
            top: -size * 0.2,
            left: size * 0.1,
            background: 'linear-gradient(135deg, hsl(175 80% 50% / 0.3), hsl(280 80% 65% / 0.1))',
            border: '1px solid hsl(175 80% 50% / 0.3)',
            transform: 'rotateX(60deg) skewX(-10deg)',
          }}
        />
      </div>
    ),
    diamond: (
      <div 
        className="relative"
        style={{ 
          width: size, 
          height: size, 
          transform: 'rotate(45deg)',
        }}
      >
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, hsl(280 80% 65% / 0.5), hsl(220 90% 60% / 0.3))',
            border: '1px solid hsl(280 80% 65% / 0.4)',
            boxShadow: '0 0 40px hsl(280 80% 65% / 0.4), inset 0 0 20px hsl(280 80% 65% / 0.2)',
          }}
        />
      </div>
    ),
    hexagon: (
      <div 
        className="relative"
        style={{ 
          width: size, 
          height: size * 0.866,
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, hsl(175 80% 50% / 0.4), hsl(280 80% 65% / 0.2))',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            boxShadow: '0 0 30px hsl(175 80% 50% / 0.3)',
          }}
        />
      </div>
    ),
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.1, 1],
        y: [0, -30, 0],
        rotateY: [0, 180, 360],
        rotateZ: [0, 10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {shapes[type]}
    </motion.div>
  );
};

// Circuit lines component
const CircuitLines = () => (
  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
    <defs>
      <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(175 80% 50%)" stopOpacity="0" />
        <stop offset="50%" stopColor="hsl(175 80% 50%)" stopOpacity="1" />
        <stop offset="100%" stopColor="hsl(280 80% 65%)" stopOpacity="0" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Animated circuit paths */}
    <motion.path
      d="M0,500 Q250,400 500,500 T1000,500"
      fill="none"
      stroke="url(#circuitGradient)"
      strokeWidth="2"
      filter="url(#glow)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
    />
    <motion.path
      d="M200,200 L200,400 L400,400 L400,600 L600,600"
      fill="none"
      stroke="url(#circuitGradient)"
      strokeWidth="1.5"
      filter="url(#glow)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse" }}
    />
    <motion.path
      d="M800,100 L800,300 L600,300 L600,500 L800,500 L800,700"
      fill="none"
      stroke="url(#circuitGradient)"
      strokeWidth="1.5"
      filter="url(#glow)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 5, delay: 2, repeat: Infinity, repeatType: "reverse" }}
    />
    
    {/* Circuit nodes */}
    {[
      { cx: 200, cy: 400 },
      { cx: 400, cy: 600 },
      { cx: 600, cy: 300 },
      { cx: 800, cy: 500 },
    ].map((node, i) => (
      <motion.circle
        key={i}
        cx={node.cx}
        cy={node.cy}
        r="6"
        fill="hsl(175 80% 50%)"
        filter="url(#glow)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
      />
    ))}
  </svg>
);

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep space gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsl(280 80% 65% / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsl(175 80% 50% / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(220 90% 60% / 0.05) 0%, transparent 70%),
            linear-gradient(180deg, hsl(250 30% 6%) 0%, hsl(250 30% 4%) 100%)
          `,
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-[-30%] left-[-20%] w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(280 80% 65% / 0.25) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[-30%] right-[-20%] w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(175 80% 50% / 0.2) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(220 90% 60% / 0.15) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Circuit lines */}
      <CircuitLines />

      {/* Floating 3D shapes */}
      <FloatingShape delay={0} duration={12} size={60} left="5%" top="15%" type="cube" />
      <FloatingShape delay={2} duration={15} size={40} left="85%" top="20%" type="diamond" />
      <FloatingShape delay={4} duration={10} size={50} left="75%" top="70%" type="cube" />
      <FloatingShape delay={1} duration={14} size={35} left="10%" top="75%" type="diamond" />
      <FloatingShape delay={3} duration={11} size={45} left="90%" top="50%" type="hexagon" />
      <FloatingShape delay={5} duration={13} size={55} left="15%" top="45%" type="hexagon" />

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            background: i % 2 === 0 
              ? 'hsl(280 80% 65% / 0.6)' 
              : 'hsl(175 80% 50% / 0.6)',
            boxShadow: i % 2 === 0
              ? '0 0 10px hsl(280 80% 65% / 0.5)'
              : '0 0 10px hsl(175 80% 50% / 0.5)',
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(175 80% 50%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(175 80% 50%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(250 30% 6% / 0.4) 100%)',
        }}
      />
    </div>
  );
};
