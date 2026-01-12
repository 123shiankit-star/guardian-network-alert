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
        {/* Outer glow effect */}
        <motion.div
          className="absolute inset-[-40px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / ${isPressed ? 0.4 : 0.15}) 0%, transparent 70%)`,
          }}
          animate={{
            scale: isPressed ? [1, 1.3, 1] : [1, 1.1, 1],
            opacity: isPressed ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Hexagonal orbit rings */}
        <motion.div
          className="absolute inset-[-30px]"
          style={{
            border: '1px solid hsl(var(--secondary) / 0.3)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[-50px]"
          style={{
            border: '1px solid hsl(var(--primary) / 0.2)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing rings on press */}
        <AnimatePresence>
          {isPressed && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary))) 1',
                    borderRadius: '50%',
                    borderColor: i % 2 === 0 ? 'hsl(var(--primary) / 0.5)' : 'hsl(var(--secondary) / 0.5)',
                  }}
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2.5 + i * 0.3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
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
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`active-${i}`}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '2px solid',
                    borderColor: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
                  }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 3 + i * 0.2, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Progress ring SVG */}
        <svg className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="hsl(var(--primary) / 0.1)"
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
            style={{
              filter: 'drop-shadow(0 0 6px hsl(var(--primary)))',
            }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Main button */}
        <motion.button
          onMouseDown={handlePressStart}
          onTouchStart={handlePressStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-52 h-52 rounded-full flex flex-col items-center justify-center gap-3 select-none overflow-hidden"
          style={{
            background: isActivated
              ? 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--destructive)) 50%, hsl(var(--primary)) 100%)'
              : isPressed
              ? 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary) / 0.8) 100%)'
              : 'linear-gradient(135deg, hsl(250 30% 12%) 0%, hsl(250 30% 8%) 100%)',
            border: '2px solid',
            borderColor: isActivated 
              ? 'hsl(var(--primary))' 
              : 'hsl(var(--primary) / 0.4)',
            boxShadow: isActivated
              ? '0 0 60px hsl(var(--primary) / 0.6), 0 0 120px hsl(var(--primary) / 0.3), inset 0 0 60px hsl(var(--primary) / 0.2)'
              : isPressed
              ? '0 0 40px hsl(var(--primary) / 0.4), inset 0 0 40px hsl(var(--primary) / 0.1)'
              : '0 0 30px hsl(var(--primary) / 0.2), inset 0 0 30px hsl(250 30% 6% / 0.5)',
          }}
          disabled={isActivated}
        >
          {/* Inner gradient overlay */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(180deg, hsl(var(--foreground) / 0.1) 0%, transparent 50%, hsl(var(--background) / 0.3) 100%)',
            }}
          />
          
          {/* Rotating glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: 'conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.3), transparent, hsl(var(--secondary) / 0.3), transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Icon with glow */}
          <motion.div
            className="relative z-10"
            animate={isActivated ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            {isActivated ? (
              <Zap 
                className="w-16 h-16 text-primary-foreground" 
                style={{ 
                  filter: 'drop-shadow(0 0 20px hsl(var(--primary)))',
                }} 
              />
            ) : (
              <Shield 
                className="w-16 h-16"
                style={{
                  color: isPressed ? 'hsl(var(--primary-foreground))' : 'hsl(var(--primary))',
                  filter: 'drop-shadow(0 0 15px hsl(var(--primary) / 0.5))',
                }}
              />
            )}
          </motion.div>
          
          <motion.span 
            className="text-2xl font-display font-bold relative z-10"
            style={{
              color: isActivated || isPressed ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
              textShadow: '0 0 20px hsl(var(--primary) / 0.5)',
            }}
          >
            {isActivated ? "ACTIVE" : "SOS"}
          </motion.span>

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.1), transparent)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
          />
        </motion.button>
      </div>

      <motion.p 
        className="text-muted-foreground text-center text-sm max-w-xs"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
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
            className="px-8 py-4 rounded-2xl font-semibold transition-all relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(250 30% 12%) 0%, hsl(250 30% 8%) 100%)',
              border: '1px solid hsl(var(--secondary) / 0.3)',
              color: 'hsl(var(--foreground))',
              boxShadow: '0 0 20px hsl(var(--secondary) / 0.2)',
            }}
          >
            Cancel Emergency
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
