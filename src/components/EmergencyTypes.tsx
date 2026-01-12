import { motion, Variants } from "framer-motion";
import { Phone, Flame, Heart, Car, Shield, Users } from "lucide-react";
import { toast } from "sonner";

const emergencyTypes = [
  {
    icon: Phone,
    label: "Police",
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
    iconBg: "from-primary to-primary/70",
  },
  {
    icon: Flame,
    label: "Fire",
    color: "warning",
    gradient: "from-orange-500/20 to-orange-500/5",
    iconBg: "from-orange-500 to-orange-600",
  },
  {
    icon: Heart,
    label: "Medical",
    color: "primary",
    gradient: "from-red-500/20 to-red-500/5",
    iconBg: "from-red-500 to-red-600",
  },
  {
    icon: Car,
    label: "Accident",
    color: "warning",
    gradient: "from-amber-500/20 to-amber-500/5",
    iconBg: "from-amber-500 to-amber-600",
  },
  {
    icon: Shield,
    label: "Safety",
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
    iconBg: "from-secondary to-secondary/70",
  },
  {
    icon: Users,
    label: "Family",
    color: "secondary",
    gradient: "from-teal-500/20 to-teal-500/5",
    iconBg: "from-teal-500 to-teal-600",
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
        <span className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
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
            className={`relative flex flex-col items-center gap-3 p-4 rounded-2xl glass-card overflow-hidden group transition-all duration-300`}
          >
            {/* Hover gradient background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, hsl(var(--${type.color}) / 0.3) 0%, transparent 50%, hsl(var(--${type.color}) / 0.3) 100%)`,
                padding: "1px",
              }}
            />
            
            <motion.div
              className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${type.iconBg} flex items-center justify-center shadow-lg`}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <type.icon className="w-6 h-6 text-white drop-shadow-md" />
              
              {/* Icon glow */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `0 0 20px hsl(var(--${type.color}) / 0.5)`,
                }}
              />
            </motion.div>
            
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors relative z-10">
              {type.label}
            </span>

            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              initial={false}
              whileHover={{
                boxShadow: [
                  `inset 0 0 0 0 hsl(var(--${type.color}) / 0)`,
                  `inset 0 0 0 2px hsl(var(--${type.color}) / 0.3)`,
                ],
              }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
