import { motion, Variants } from "framer-motion";
import { Phone, Flame, Heart, Car, Shield, Users } from "lucide-react";
import { toast } from "sonner";

const emergencyTypes = [
  {
    icon: Phone,
    label: "Police",
    gradient: "from-violet-500 to-purple-600",
    glowColor: "hsl(280 80% 65%)",
  },
  {
    icon: Flame,
    label: "Fire",
    gradient: "from-orange-500 to-red-600",
    glowColor: "hsl(30 90% 55%)",
  },
  {
    icon: Heart,
    label: "Medical",
    gradient: "from-pink-500 to-rose-600",
    glowColor: "hsl(340 80% 60%)",
  },
  {
    icon: Car,
    label: "Accident",
    gradient: "from-amber-500 to-orange-600",
    glowColor: "hsl(38 92% 55%)",
  },
  {
    icon: Shield,
    label: "Safety",
    gradient: "from-cyan-500 to-teal-600",
    glowColor: "hsl(175 80% 50%)",
  },
  {
    icon: Users,
    label: "Family",
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "hsl(220 90% 60%)",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
    },
  },
};

export const EmergencyTypes = () => {
  const handleEmergencyType = (type: string) => {
    toast.info(`${type} emergency selected`, {
      description: "Preparing to send alert...",
    });
  };

  return (
    <div className="w-full">
      <motion.h2 
        className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <span 
          className="w-1 h-6 rounded-full"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
          }}
        />
        Quick Emergency
      </motion.h2>
      <motion.div 
        className="grid grid-cols-3 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {emergencyTypes.map((type) => (
          <motion.button
            key={type.label}
            variants={itemVariants}
            onClick={() => handleEmergencyType(type.label)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex flex-col items-center gap-3 p-4 rounded-2xl overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, hsl(250 30% 12%) 0%, hsl(250 30% 8%) 100%)',
              border: '1px solid hsl(var(--border))',
            }}
          >
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, ${type.glowColor} / 0.15, transparent 70%)`,
              }}
            />
            
            {/* Border glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: `inset 0 0 0 1px ${type.glowColor} / 0.5, 0 0 20px ${type.glowColor} / 0.2`,
              }}
            />
            
            <motion.div
              className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center`}
              style={{
                boxShadow: `0 0 20px ${type.glowColor} / 0.3`,
              }}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <type.icon className="w-6 h-6 text-white" />
              
              {/* Icon inner glow */}
              <div 
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.2) 0%, transparent 50%)',
                }}
              />
            </motion.div>
            
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors relative z-10">
              {type.label}
            </span>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.05), transparent)',
              }}
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
