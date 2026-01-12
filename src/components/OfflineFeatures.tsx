import { motion } from "framer-motion";
import { Radio, MapPin, Volume2, Flashlight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const features = [
  {
    icon: Radio,
    label: "Bluetooth Alert",
    description: "Send alerts via Bluetooth",
  },
  {
    icon: MapPin,
    label: "GPS Tracking",
    description: "Share last known location",
  },
  {
    icon: Volume2,
    label: "Siren Mode",
    description: "Loud alarm sound",
  },
  {
    icon: Flashlight,
    label: "SOS Flash",
    description: "Flash SOS signal",
  },
];

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
      <h2 className="text-lg font-display font-semibold text-foreground mb-2">
        Offline Features
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        These features work even without network
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, index) => {
          const isActive = activeFeatures.includes(feature.label);
          return (
            <motion.button
              key={feature.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleFeature(feature.label)}
              className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-all duration-300 ${
                isActive
                  ? "bg-secondary/20 border-secondary/50"
                  : "bg-card border-border hover:border-secondary/30"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <feature.icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className={`font-medium text-sm ${isActive ? "text-secondary" : "text-foreground"}`}>
                  {feature.label}
                </p>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
