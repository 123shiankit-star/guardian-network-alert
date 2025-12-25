import { motion } from "framer-motion";
import { Radio, MapPin, Volume2, Flashlight, LucideIcon, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: Radio,
    label: "Bluetooth Alert",
    description: "Send via Bluetooth",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: MapPin,
    label: "GPS Tracking",
    description: "Share location",
    gradient: "from-secondary to-emerald-400",
  },
  {
    icon: Volume2,
    label: "Siren Mode",
    description: "Loud alarm",
    gradient: "from-primary to-orange-400",
  },
  {
    icon: Flashlight,
    label: "SOS Flash",
    description: "Flash signal",
    gradient: "from-warning to-yellow-400",
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 200,
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
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-5"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-6 bg-gradient-to-b from-accent to-pink-500 rounded-full" />
          <h2 className="text-xl font-display font-bold text-foreground">
            Offline Features
          </h2>
        </div>
        <p className="text-sm text-muted-foreground ml-4">
          Works even without network connection
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-3"
      >
        {features.map((feature) => {
          const isActive = activeFeatures.includes(feature.label);
          return (
            <motion.button
              key={feature.label}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleFeature(feature.label)}
              className={`relative flex flex-col items-start gap-3 p-4 rounded-2xl border transition-all duration-500 overflow-hidden ${
                isActive
                  ? "glass-strong border-secondary/50 shadow-[0_0_30px_hsl(var(--secondary)/0.2)]"
                  : "glass border-border/50 hover:border-accent/30"
              }`}
            >
              {/* Background glow when active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}

              {/* Icon container */}
              <div className="relative flex items-center justify-between w-full">
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${feature.gradient}`
                      : "bg-muted"
                  }`}
                  animate={isActive ? { rotate: [0, -5, 5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  />
                </motion.div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-secondary-foreground" />
                  </motion.div>
                )}
              </div>

              {/* Text */}
              <div className="relative text-left">
                <p
                  className={`font-display font-semibold text-sm transition-colors ${
                    isActive ? "text-secondary" : "text-foreground"
                  }`}
                >
                  {feature.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {feature.description}
                </p>
              </div>

              {/* Active pulse ring */}
              {isActive && (
                <motion.div
                  className="absolute -inset-1 rounded-2xl border-2 border-secondary/50"
                  animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.3, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
