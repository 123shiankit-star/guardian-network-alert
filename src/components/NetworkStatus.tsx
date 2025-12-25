import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, SignalLow, SignalHigh, X, AlertTriangle } from "lucide-react";

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
          icon: SignalHigh,
          label: "Connected",
          bgClass: "bg-secondary/20",
          textClass: "text-secondary",
          dotClass: "bg-secondary",
          glowClass: "shadow-[0_0_10px_hsl(var(--secondary)/0.5)]",
        };
      case "weak":
        return {
          icon: SignalLow,
          label: "Weak",
          bgClass: "bg-warning/20",
          textClass: "text-warning",
          dotClass: "bg-warning",
          glowClass: "shadow-[0_0_10px_hsl(var(--warning-glow)/0.5)]",
        };
      case "offline":
        return {
          icon: WifiOff,
          label: "Offline",
          bgClass: "bg-primary/20",
          textClass: "text-primary",
          dotClass: "bg-primary",
          glowClass: "shadow-[0_0_10px_hsl(var(--primary)/0.5)]",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass ${config.textClass} ${config.glowClass}`}
      >
        <motion.span
          className={`w-2 h-2 rounded-full ${config.dotClass}`}
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{config.label}</span>
      </motion.div>

      <AnimatePresence>
        {showAlert && networkState !== "online" && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-4 left-4 right-4 z-50"
          >
            <div
              className={`p-4 rounded-2xl glass-strong border ${
                networkState === "offline"
                  ? "border-primary/30"
                  : "border-warning/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    className={`p-2 rounded-xl ${
                      networkState === "offline" ? "bg-primary/20" : "bg-warning/20"
                    }`}
                  >
                    <AlertTriangle
                      className={`w-6 h-6 ${
                        networkState === "offline" ? "text-primary" : "text-warning"
                      }`}
                    />
                  </motion.div>
                  <div>
                    <p className="font-display font-bold text-foreground">
                      {networkState === "offline"
                        ? "No Network Connection"
                        : "Weak Network Detected"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {networkState === "offline"
                        ? "Don't worry! Emergency features are still active"
                        : "Some features may be limited, but you're protected"}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAlert(false)}
                  className="p-2 rounded-xl hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
