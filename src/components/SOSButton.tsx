import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface SOSButtonProps {
  onActivate?: () => void;
}

export const SOSButton = ({ onActivate }: SOSButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const handlePressStart = () => {
    setIsPressed(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsActivated(true);
        onActivate?.();
        toast.error("Emergency SOS Activated!", {
          description: "Alert sent to emergency contacts",
          duration: 5000,
        });
        
        // Vibrate if available
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200, 100, 200]);
        }
      }
    }, 30);

    const handleRelease = () => {
      clearInterval(interval);
      setIsPressed(false);
      setHoldProgress(0);
      document.removeEventListener("mouseup", handleRelease);
      document.removeEventListener("touchend", handleRelease);
    };

    document.addEventListener("mouseup", handleRelease);
    document.addEventListener("touchend", handleRelease);
  };

  const cancelEmergency = () => {
    setIsActivated(false);
    setHoldProgress(0);
    toast.success("Emergency cancelled", {
      description: "All contacts have been notified",
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Pulsing rings */}
        {isPressed && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}

        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={289}
            strokeDashoffset={289 - (289 * holdProgress) / 100}
            className="transition-all duration-75"
          />
        </svg>

        {/* Main button */}
        <motion.button
          onMouseDown={handlePressStart}
          onTouchStart={handlePressStart}
          whileTap={{ scale: 0.95 }}
          className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-300 select-none ${
            isActivated
              ? "bg-primary glow-primary"
              : isPressed
              ? "bg-primary/80 glow-primary"
              : "bg-gradient-to-br from-primary/80 to-primary hover:from-primary hover:to-primary/90"
          }`}
          disabled={isActivated}
        >
          <Shield className="w-12 h-12 text-primary-foreground" />
          <span className="text-xl font-display font-bold text-primary-foreground">
            {isActivated ? "ACTIVE" : "SOS"}
          </span>
        </motion.button>
      </div>

      <p className="text-muted-foreground text-center text-sm max-w-xs">
        {isActivated
          ? "Emergency services have been alerted"
          : "Press and hold for 3 seconds to activate emergency alert"}
      </p>

      <AnimatePresence>
        {isActivated && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={cancelEmergency}
            className="px-6 py-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors"
          >
            Cancel Emergency
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
