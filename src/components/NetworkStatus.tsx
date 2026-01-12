import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, SignalLow, SignalHigh, X, AlertTriangle, Shield } from "lucide-react";

type NetworkState = "online" | "weak" | "offline";

export const NetworkStatus = () => {
  const [networkState, setNetworkState] = useState<NetworkState>("online");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const checkConnection = () => {
      if (!navigator.onLine) {
        setNetworkState("offline");
        setShowAlert(true);
      } else {
        // Simulate weak network detection
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
          bgClass: "from-secondary/30 to-secondary/10",
          textClass: "text-secondary",
          dotClass: "bg-secondary",
          glowColor: "var(--secondary)",
        };
      case "weak":
        return {
          icon: <SignalLow className="w-4 h-4" />,
          label: "Weak Signal",
          bgClass: "from-orange-500/30 to-orange-500/10",
          textClass: "text-orange-400",
          dotClass: "bg-orange-400",
          glowColor: "38 92% 55%",
        };
      case "offline":
        return {
          icon: <WifiOff className="w-4 h-4" />,
          label: "Offline Mode",
          bgClass: "from-primary/30 to-primary/10",
          textClass: "text-primary",
          dotClass: "bg-primary",
          glowColor: "var(--primary)",
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
        className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${config.bgClass} ${config.textClass} overflow-hidden cursor-default`}
      >
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        
        {/* Pulsing dot */}
        <motion.span 
          className={`relative w-2 h-2 rounded-full ${config.dotClass}`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span
            className={`absolute inset-0 rounded-full ${config.dotClass}`}
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.span>
        
        <motion.span
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
              className={`relative p-5 rounded-2xl glass-card overflow-hidden border-2 ${
                networkState === "offline"
                  ? "border-primary/40"
                  : "border-orange-500/40"
              }`}
            >
              {/* Animated gradient background */}
              <motion.div
                className={`absolute inset-0 ${
                  networkState === "offline"
                    ? "bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"
                    : "bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-orange-500/10"
                }`}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              {/* Pulsing border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: networkState === "offline"
                    ? [
                        "inset 0 0 20px hsl(var(--primary) / 0.1)",
                        "inset 0 0 40px hsl(var(--primary) / 0.2)",
                        "inset 0 0 20px hsl(var(--primary) / 0.1)",
                      ]
                    : [
                        "inset 0 0 20px hsl(38 92% 55% / 0.1)",
                        "inset 0 0 40px hsl(38 92% 55% / 0.2)",
                        "inset 0 0 20px hsl(38 92% 55% / 0.1)",
                      ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`p-3 rounded-xl ${
                      networkState === "offline"
                        ? "bg-gradient-to-br from-primary to-primary/70"
                        : "bg-gradient-to-br from-orange-500 to-orange-600"
                    }`}
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
                  className="p-2.5 rounded-xl hover:bg-muted/50 transition-colors"
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
