import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, Signal, SignalLow, SignalMedium, SignalHigh } from "lucide-react";

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
          icon: <SignalHigh className="w-5 h-5" />,
          label: "Connected",
          bgClass: "bg-secondary/20",
          textClass: "text-secondary",
          dotClass: "bg-secondary",
        };
      case "weak":
        return {
          icon: <SignalLow className="w-5 h-5" />,
          label: "Weak Signal",
          bgClass: "bg-warning/20",
          textClass: "text-warning",
          dotClass: "bg-warning",
        };
      case "offline":
        return {
          icon: <WifiOff className="w-5 h-5" />,
          label: "Offline Mode",
          bgClass: "bg-primary/20",
          textClass: "text-primary",
          dotClass: "bg-primary",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bgClass} ${config.textClass}`}
      >
        <span className={`w-2 h-2 rounded-full ${config.dotClass} animate-pulse`} />
        {config.icon}
        <span className="text-sm font-medium">{config.label}</span>
      </motion.div>

      <AnimatePresence>
        {showAlert && networkState !== "online" && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-4 right-4 z-50"
          >
            <div
              className={`p-4 rounded-xl border ${
                networkState === "offline"
                  ? "bg-primary/10 border-primary/30"
                  : "bg-warning/10 border-warning/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {networkState === "offline" ? (
                    <WifiOff className="w-6 h-6 text-primary" />
                  ) : (
                    <SignalLow className="w-6 h-6 text-warning" />
                  )}
                  <div>
                    <p className="font-semibold text-foreground">
                      {networkState === "offline" ? "No Network Connection" : "Weak Network Detected"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {networkState === "offline"
                        ? "Emergency features are still active"
                        : "Some features may be limited"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAlert(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
