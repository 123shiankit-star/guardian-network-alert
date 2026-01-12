import { motion } from "framer-motion";
import { Phone, Flame, Heart, Car, Shield, Users } from "lucide-react";
import { toast } from "sonner";

const emergencyTypes = [
  {
    icon: Phone,
    label: "Police",
    color: "primary",
  },
  {
    icon: Flame,
    label: "Fire",
    color: "warning",
  },
  {
    icon: Heart,
    label: "Medical",
    color: "primary",
  },
  {
    icon: Car,
    label: "Accident",
    color: "warning",
  },
  {
    icon: Shield,
    label: "Safety",
    color: "secondary",
  },
  {
    icon: Users,
    label: "Family",
    color: "secondary",
  },
];

export const EmergencyTypes = () => {
  const handleEmergencyType = (type: string) => {
    toast.info(`${type} emergency selected`, {
      description: "Preparing to send alert...",
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-display font-semibold text-foreground mb-4">
        Quick Emergency
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {emergencyTypes.map((type, index) => (
          <motion.button
            key={type.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleEmergencyType(type.label)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-${type.color}/50 transition-all duration-300 group`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                type.color === "primary"
                  ? "bg-primary/20 text-primary group-hover:bg-primary/30"
                  : type.color === "warning"
                  ? "bg-warning/20 text-warning group-hover:bg-warning/30"
                  : "bg-secondary/20 text-secondary group-hover:bg-secondary/30"
              }`}
            >
              <type.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {type.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
