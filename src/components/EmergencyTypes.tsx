import { motion } from "framer-motion";
import { Phone, Flame, Heart, Car, Shield, Users, LucideIcon } from "lucide-react";
import { toast } from "sonner";

interface EmergencyType {
  icon: LucideIcon;
  label: string;
  gradient: string;
  shadowColor: string;
}

const emergencyTypes: EmergencyType[] = [
  {
    icon: Phone,
    label: "Police",
    gradient: "from-primary/80 to-primary/40",
    shadowColor: "shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
  },
  {
    icon: Flame,
    label: "Fire",
    gradient: "from-warning/80 to-orange-500/40",
    shadowColor: "shadow-[0_0_20px_hsl(var(--warning-glow)/0.3)]",
  },
  {
    icon: Heart,
    label: "Medical",
    gradient: "from-pink-500/80 to-primary/40",
    shadowColor: "shadow-[0_0_20px_rgba(236,72,153,0.3)]",
  },
  {
    icon: Car,
    label: "Accident",
    gradient: "from-warning/80 to-yellow-500/40",
    shadowColor: "shadow-[0_0_20px_hsl(var(--warning-glow)/0.3)]",
  },
  {
    icon: Shield,
    label: "Safety",
    gradient: "from-secondary/80 to-cyan-400/40",
    shadowColor: "shadow-[0_0_20px_hsl(var(--secondary)/0.3)]",
  },
  {
    icon: Users,
    label: "Family",
    gradient: "from-accent/80 to-purple-400/40",
    shadowColor: "shadow-[0_0_20px_hsl(var(--accent)/0.3)]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 200,
    },
  },
};

export const EmergencyTypes = () => {
  const handleEmergencyType = (type: string) => {
    toast.info(`${type} emergency selected`, {
      description: "Hold SOS button to send alert...",
    });
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
        <h2 className="text-xl font-display font-bold text-foreground">
          Quick Emergency
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-3"
      >
        {emergencyTypes.map((type) => (
          <motion.button
            key={type.label}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEmergencyType(type.label)}
            className={`relative flex flex-col items-center gap-3 p-4 rounded-2xl glass border border-border/50 hover:border-transparent transition-all duration-300 group overflow-hidden ${type.shadowColor}`}
          >
            {/* Background gradient on hover */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Icon container */}
            <motion.div
              className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center`}
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
            >
              <type.icon className="w-6 h-6 text-foreground" />
            </motion.div>

            {/* Label */}
            <span className="relative z-10 text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
              {type.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
