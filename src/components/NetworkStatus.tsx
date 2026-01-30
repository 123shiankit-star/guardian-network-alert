import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, SignalLow, SignalHigh, X, AlertTriangle, Shield } from "lucide-react";

type NetworkState = "online" | "weak" | "offline";

export const NetworkStatus = () => {
  const [networkState, setNetworkState] = useState<NetworkState>("online");
  const [showAlert, setShowAlert] = useState(false);

  const withAlpha = (color: string, alpha = 0.3) => {
    // If color is an hsl(...) string, insert alpha using modern CSS syntax: hsl(... / alpha)
    const hslMatch = color.match(/^(hsl\([^)]*)\)\s*$/);
    if (hslMatch) return `${hslMatch[1]} / ${alpha})`;
    // Fallback: return original color
    return color;
  };

  useEffect(() => {
    const checkConnection = () => {
      if (!navigator.onLine) {
        setNetworkState("offline");
        setShowAlert(true);
      } else {
        const connection = (navigator as any).connection;
        if (connection) {
          const effectiveType = connection.effectiveType;
          if (effectiveType === "slow-2g" || effectiveType === "2g") {
            setNetworkState("weak");
            setShowAlert(true);
          } else {
            setNetworkState("online");
          }
        } else {
          setNetworkState("online");
        }
      }
    };

    checkConnection();

    window.addEventListener("online", checkConnection);
    window.addEventListener("offline", checkConnection);

    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener("change", checkConnection);
    }

    return () => {
      window.removeEventListener("online", checkConnection);
      window.removeEventListener("offline", checkConnection);
      if (connection) {
        connection.removeEventListener("change", checkConnection);
      }
    };
  }, []);

  const getStatusConfig = () => {
    switch (networkState) {
      case "online":
        return {
          icon: <SignalHigh className="w-4 h-4" />,
          label: "Connected",
          gradient: "from-emerald-500/30 to-teal-500/10",
          textColor: "text-emerald-400",
          dotColor: "bg-emerald-400",
          glowColor: "hsl(160 80% 45%)",
        };
      case "weak":
        return {
          icon: <SignalLow className="w-4 h-4" />,
          label: "Weak Signal",
          gradient: "from-amber-500/30 to-orange-500/10",
          textColor: "text-amber-400",
          dotColor: "bg-amber-400",
          glowColor: "hsl(38 92% 55%)",
        };
      case "offline":
        return {
          icon: <WifiOff className="w-4 h-4" />,
          label: "Offline Mode",
          gradient: "from-purple-500/30 to-violet-500/10",
          textColor: "text-purple-400",
          dotColor: "bg-purple-400",
          glowColor: "hsl(280 80% 65%)",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        whileHover={{ scale: 1.05 }}
        className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden cursor-default ${config.textColor}`}
        style={{
          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
          border: `1px solid ${withAlpha(config.glowColor, 0.3)}`,
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient}`} />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.05), transparent)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        
        {/* Pulsing dot */}
        <motion.span 
          className={`relative w-2 h-2 rounded-full ${config.dotColor}`}
          style={{ boxShadow: `0 0 8px ${config.glowColor}` }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span
            className={`absolute inset-0 rounded-full ${config.dotColor}`}
            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.span>
        
        <motion.span
          className="relative z-10"
          animate={{ rotate: networkState === "offline" ? [0, 10, -10, 0] : 0 }}
          transition={{ duration: 0.5, repeat: networkState === "offline" ? Infinity : 0, repeatDelay: 2 }}
        >
          {config.icon}
        </motion.span>
        
        <span className="text-sm font-medium relative z-10">{config.label}</span>
      </motion.div>

      <AnimatePresence>
        {showAlert && networkState !== "online" && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="fixed top-4 left-4 right-4 z-50"
          >
            <motion.div
              className="relative p-5 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, hsl(250 30% 12%) 0%, hsl(250 30% 8%) 100%)',
                border: `2px solid ${networkState === "offline" ? 'hsl(var(--primary) / 0.4)' : 'hsl(38 92% 55% / 0.4)'}`,
                boxShadow: networkState === "offline" 
                  ? '0 0 40px hsl(var(--primary) / 0.2)'
                  : '0 0 40px hsl(38 92% 55% / 0.2)',
              }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: networkState === "offline"
                    ? 'radial-gradient(circle at top left, hsl(var(--primary) / 0.1), transparent 60%)'
                    : 'radial-gradient(circle at top left, hsl(38 92% 55% / 0.1), transparent 60%)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-3 rounded-xl"
                    style={{
                      background: networkState === "offline"
                        ? 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)'
                        : 'linear-gradient(135deg, hsl(38 92% 55%) 0%, hsl(25 90% 50%) 100%)',
                      boxShadow: networkState === "offline"
                        ? '0 0 20px hsl(var(--primary) / 0.5)'
                        : '0 0 20px hsl(38 92% 55% / 0.5)',
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {networkState === "offline" ? (
                      <Shield className="w-6 h-6 text-white" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-white" />
                    )}
                  </motion.div>
                  
                  <div>
                    <p className="font-semibold text-foreground text-lg">
                      {networkState === "offline" ? "Offline Protection Active" : "Weak Network Detected"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {networkState === "offline"
                        ? "All emergency features remain fully operational"
                        : "Some features may be limited, offline mode available"}
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setShowAlert(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl transition-colors"
                  style={{
                    background: 'hsl(var(--muted))',
                  }}
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
