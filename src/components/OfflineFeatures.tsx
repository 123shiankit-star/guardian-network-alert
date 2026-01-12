import { motion, Variants } from "framer-motion";
import { Radio, MapPin, Volume2, Flashlight, Wifi } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const features = [
  {
    icon: Radio,
    label: "Bluetooth Alert",
    description: "Send alerts via Bluetooth",
    activeColor: "from-blue-500 to-blue-600",
  },
  {
    icon: MapPin,
    label: "GPS Tracking",
    description: "Share last known location",
    activeColor: "from-green-500 to-green-600",
  },
  {
    icon: Volume2,
    label: "Siren Mode",
    description: "Loud alarm sound",
    activeColor: "from-red-500 to-red-600",
  },
  {
    icon: Flashlight,
    label: "SOS Flash",
    description: "Flash SOS signal",
    activeColor: "from-yellow-500 to-yellow-600",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export const OfflineFeatures = () => {
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);

  const toggleFeature = (label: string) => {
    if (activeFeatures.includes(label)) {
      setActiveFeatures((prev) => prev.filter((f) => f !== label));
      toast.info(`${label} deactivated`);
    } else {
      setActiveFeatures((prev) => [...prev, label]);
      toast.success(`${label} activated`, {
        description: "Feature is now active",
      });
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-2"
      >
        <span className="w-1 h-6 bg-gradient-to-b from-accent to-secondary rounded-full" />
        <h2 className="text-lg font-display font-semibold text-foreground">
          Offline Features
        </h2>
        <motion.div
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Wifi className="w-3 h-3" />
          <span>Works Offline</span>
        </motion.div>
      </motion.div>
      <p className="text-sm text-muted-foreground mb-4 ml-3">
        These features work even without network
      </p>
      
      <motion.div 
        className="grid grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature) => {
          const isActive = activeFeatures.includes(feature.label);
          return (
            <motion.button
              key={feature.label}
              variants={itemVariants}
              onClick={() => toggleFeature(feature.label)}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex flex-col items-start gap-3 p-4 rounded-2xl overflow-hidden transition-all duration-500 ${
                isActive
                  ? "glass-card"
                  : "glass-card-hover"
              }`}
            >
              {/* Active state background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.activeColor} opacity-0`}
                animate={{ opacity: isActive ? 0.15 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Active border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: isActive
                    ? "inset 0 0 30px hsl(var(--secondary) / 0.2), 0 0 20px hsl(var(--secondary) / 0.1)"
                    : "inset 0 0 0 hsl(var(--secondary) / 0), 0 0 0 hsl(var(--secondary) / 0)",
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Icon container */}
              <motion.div
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden`}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                    : "hsl(var(--muted))",
                }}
                animate={{
                  scale: isActive ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.activeColor}`}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <feature.icon 
                  className={`w-6 h-6 relative z-10 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-muted-foreground"
                  }`} 
                />
                
                {/* Icon glow effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      boxShadow: "inset 0 0 20px rgba(255,255,255,0.3)",
                    }}
                  />
                )}
              </motion.div>
              
              <div className="text-left relative z-10">
                <p className={`font-semibold text-sm transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-foreground"
                }`}>
                  {feature.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {feature.description}
                </p>
              </div>

              {/* Active indicator dot */}
              <motion.div
                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-secondary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-secondary"
                    animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Shimmer effect on active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
