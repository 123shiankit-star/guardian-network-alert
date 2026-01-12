import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap } from "lucide-react";
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
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-[-20px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / ${isPressed ? 0.3 : 0.1}) 0%, transparent 70%)`,
          }}
          animate={{
            scale: isPressed ? [1, 1.2, 1] : 1,
            opacity: isPressed ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Multiple pulsing rings */}
        <AnimatePresence>
          {isPressed && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-primary/40"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2 + i * 0.3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Activated state rings */}
        <AnimatePresence>
          {isActivated && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`active-${i}`}
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2.5 + i * 0.2, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Progress ring */}
        <svg className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="hsl(var(--primary) / 0.15)"
            strokeWidth="3"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={289}
            strokeDashoffset={289 - (289 * holdProgress) / 100}
            className="transition-all duration-75"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Main button */}
        <motion.button
          onMouseDown={handlePressStart}
          onTouchStart={handlePressStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-500 select-none overflow-hidden ${
            isActivated
              ? "glow-primary animate-glow-pulse"
              : isPressed
              ? "glow-primary"
              : ""
          }`}
          style={{
            background: isActivated
              ? "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--destructive)) 100%)"
              : isPressed
              ? "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)"
              : "linear-gradient(135deg, hsl(var(--primary) / 0.9) 0%, hsl(var(--primary)) 50%, hsl(var(--accent) / 0.8) 100%)",
          }}
          disabled={isActivated}
        >
          {/* Inner shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Rotating gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: "conic-gradient(from 0deg, transparent, hsl(var(--foreground) / 0.1), transparent)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Icon with animation */}
          <motion.div
            animate={isActivated ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {isActivated ? (
              <Zap className="w-14 h-14 text-primary-foreground drop-shadow-lg" />
            ) : (
              <Shield className="w-14 h-14 text-primary-foreground drop-shadow-lg" />
            )}
          </motion.div>
          
          <span className="text-2xl font-display font-bold text-primary-foreground drop-shadow-lg relative z-10">
            {isActivated ? "ACTIVE" : "SOS"}
          </span>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.button>
      </div>

      <motion.p 
        className="text-muted-foreground text-center text-sm max-w-xs"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isActivated
          ? "Emergency services have been alerted"
          : "Press and hold for 3 seconds to activate emergency alert"}
      </motion.p>

      <AnimatePresence>
        {isActivated && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={cancelEmergency}
            className="px-8 py-4 rounded-2xl glass-card-hover text-foreground font-semibold transition-all"
          >
            Cancel Emergency
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
