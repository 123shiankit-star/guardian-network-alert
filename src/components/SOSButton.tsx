import { useState, useEffect } from "react";
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
    if (isActivated) return;
    setIsPressed(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsActivated(true);
        onActivate?.();
        toast.error("🚨 Emergency SOS Activated!", {
          description: "Alert sent to all emergency contacts",
          duration: 5000,
        });

        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200, 100, 200, 100, 500]);
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
        {/* Outer glow rings */}
        <AnimatePresence>
          {(isPressed || isActivated) && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--primary) / ${0.3 - i * 0.1}) 0%, transparent 70%)`,
                  }}
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{
                    scale: [1, 2 + i * 0.5],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Rotating border */}
        <motion.div
          className="absolute -inset-2 rounded-full"
          style={{
            background: isActivated
              ? "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--warning-glow)), hsl(var(--primary)))"
              : isPressed
              ? "conic-gradient(from 0deg, hsl(var(--primary) / 0.5), transparent, hsl(var(--primary) / 0.5))"
              : "transparent",
            padding: "2px",
          }}
          animate={isActivated || isPressed ? { rotate: 360 } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-background" />
        </motion.div>

        {/* Progress ring */}
        <svg
          className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="2"
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
            className="drop-shadow-[0_0_8px_hsl(var(--primary))]"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--warning-glow))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Main button */}
        <motion.button
          onMouseDown={handlePressStart}
          onTouchStart={handlePressStart}
          whileHover={{ scale: isActivated ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-500 select-none overflow-hidden ${
            isActivated
              ? "glow-primary"
              : ""
          }`}
          style={{
            background: isActivated
              ? "var(--gradient-primary)"
              : isPressed
              ? "linear-gradient(135deg, hsl(var(--primary) / 0.9) 0%, hsl(var(--primary)) 100%)"
              : "linear-gradient(135deg, hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0.6) 100%)",
          }}
          disabled={isActivated}
        >
          {/* Inner shine effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, hsl(0 0% 100% / 0.2) 0%, transparent 50%)",
            }}
            animate={isPressed ? { opacity: [0.5, 0.2, 0.5] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />

          {/* Icon */}
          <motion.div
            animate={isActivated ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5, repeat: isActivated ? Infinity : 0, repeatDelay: 1 }}
          >
            {isActivated ? (
              <Zap className="w-14 h-14 text-primary-foreground drop-shadow-lg" />
            ) : (
              <Shield className="w-14 h-14 text-primary-foreground drop-shadow-lg" />
            )}
          </motion.div>

          {/* Text */}
          <motion.span
            className="text-2xl font-display font-black text-primary-foreground tracking-wider drop-shadow-lg"
            animate={isActivated ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isActivated ? Infinity : 0, repeatDelay: 1 }}
          >
            {isActivated ? "ACTIVE" : "SOS"}
          </motion.span>

          {/* Ripple effect on press */}
          <AnimatePresence>
            {isPressed && !isActivated && (
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Instructions */}
      <motion.p
        className="text-muted-foreground text-center text-sm max-w-xs"
        animate={{ opacity: isPressed ? 0.5 : 1 }}
      >
        {isActivated ? (
          <span className="text-primary font-medium">
            Emergency services have been alerted
          </span>
        ) : (
          <>
            <span className="text-foreground font-medium">Press and hold</span> for 3 seconds
            to activate emergency alert
          </>
        )}
      </motion.p>

      {/* Cancel button */}
      <AnimatePresence>
        {isActivated && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            onClick={cancelEmergency}
            className="px-8 py-4 rounded-2xl glass border border-border hover:border-primary/50 text-foreground font-semibold transition-all duration-300 hover:glow-primary"
          >
            Cancel Emergency
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
