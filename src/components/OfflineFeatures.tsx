import { motion, Variants } from "framer-motion";
import { Radio, MapPin, Volume2, Flashlight, Wifi } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

const features = [
  {
    icon: Radio,
    label: "Bluetooth Alert",
    description: "Send alerts via Bluetooth",
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "hsl(220 90% 60%)",
  },
  {
    icon: MapPin,
    label: "GPS Tracking",
    description: "Share last known location",
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "hsl(160 80% 45%)",
  },
  {
    icon: Volume2,
    label: "Siren Mode",
    description: "Loud alarm sound",
    gradient: "from-rose-500 to-red-600",
    glowColor: "hsl(350 80% 55%)",
  },
  {
    icon: Flashlight,
    label: "SOS Flash",
    description: "Flash SOS signal",
    gradient: "from-amber-500 to-yellow-600",
    glowColor: "hsl(45 90% 55%)",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
    },
  },
};

export const OfflineFeatures = () => {
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const flashIntervalRef = useRef<number | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const toggleFeature = (label: string) => {
    if (activeFeatures.includes(label)) {
      setActiveFeatures((prev) => prev.filter((f) => f !== label));
      toast.info(`${label} deactivated`);
      // stop side-effects
      switch (label) {
        case "Bluetooth Alert":
          // nothing persistent to stop for Bluetooth
          break;
        case "GPS Tracking":
          // no persistent watcher used here
          break;
        case "Siren Mode":
          stopSiren();
          break;
        case "SOS Flash":
          stopFlash();
          break;
        default:
          break;
      }
    } else {
      setActiveFeatures((prev) => [...prev, label]);
      toast.success(`${label} activated`, {
        description: "Feature is now active",
      });

      // start side-effects
      switch (label) {
        case "Bluetooth Alert":
          startBluetoothAlert();
          break;
        case "GPS Tracking":
          startGPSTracking();
          break;
        case "Siren Mode":
          startSiren();
          break;
        case "SOS Flash":
          startFlash();
          break;
        default:
          break;
      }
    }
  };

  // Bluetooth: best-effort request device to prompt Bluetooth permission
  const startBluetoothAlert = async () => {
    try {
      const nav: any = navigator as any;
      if (!nav || !nav.bluetooth) {
        toast.error("Bluetooth API not available on this device/browser");
        return;
      }
      await nav.bluetooth.requestDevice({ acceptAllDevices: true });
      toast.success("Bluetooth alert request shown");
    } catch (err: any) {
      const msg = err?.message || "Bluetooth request cancelled or failed";
      toast.error(msg);
    }
  };

  // GPS: get current position once and copy coords to clipboard
  const startGPSTracking = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
        try {
          await navigator.clipboard.writeText(coords);
          toast.success("Location captured and copied to clipboard", { description: coords });
        } catch {
          toast.success("Location captured", { description: coords });
        }
      },
      (err) => {
        toast.error(`Location error: ${err.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );
  };

  // Siren: use WebAudio oscillator
  const startSiren = () => {
    try {
      if (audioCtxRef.current) return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = 1000;
      gain.gain.value = 0.1;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      audioCtxRef.current = ctx;
      oscillatorRef.current = osc;
    } catch (err) {
      toast.error("Unable to start siren");
    }
  };

  const stopSiren = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch (err) {
      // noop
    }
  };

  // Flash: create overlay and flash it
  const startFlash = () => {
    try {
      if (overlayRef.current) return;
      const el = document.createElement("div");
      el.style.position = "fixed";
      el.style.left = "0";
      el.style.top = "0";
      el.style.right = "0";
      el.style.bottom = "0";
      el.style.zIndex = "9999";
      el.style.pointerEvents = "none";
      el.style.background = "white";
      el.style.opacity = "0";
      el.style.transition = "opacity 150ms linear";
      document.body.appendChild(el);
      overlayRef.current = el;
      flashIntervalRef.current = window.setInterval(() => {
        if (!overlayRef.current) return;
        overlayRef.current.style.opacity = overlayRef.current.style.opacity === "1" ? "0" : "1";
      }, 500) as unknown as number;
    } catch (err) {
      toast.error("Unable to start flash");
    }
  };

  const stopFlash = () => {
    try {
      if (flashIntervalRef.current) {
        clearInterval(flashIntervalRef.current);
        flashIntervalRef.current = null;
      }
      if (overlayRef.current) {
        overlayRef.current.remove();
        overlayRef.current = null;
      }
    } catch (err) {
      // noop
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      stopSiren();
      stopFlash();
    };
  }, []);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-2"
      >
        <span 
          className="w-1 h-6 rounded-full"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--primary)) 100%)',
          }}
        />
        <h2 className="text-lg font-display font-semibold text-foreground">
          Offline Features
        </h2>
        <motion.div
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.2) 0%, hsl(var(--secondary) / 0.1) 100%)',
            color: 'hsl(var(--secondary))',
            border: '1px solid hsl(var(--secondary) / 0.3)',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Wifi className="w-3 h-3" />
          <span>Works Offline</span>
        </motion.div>
      </motion.div>
      <p className="text-sm text-muted-foreground mb-4 ml-3">
        These features work even without network
      </p>
      
      <motion.div 
        className="grid grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature) => {
          const isActive = activeFeatures.includes(feature.label);
          return (
            <motion.button
              key={feature.label}
              variants={itemVariants}
              onClick={() => toggleFeature(feature.label)}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex flex-col items-start gap-3 p-4 rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, hsl(250 30% 15%) 0%, hsl(250 30% 10%) 100%)`
                  : 'linear-gradient(135deg, hsl(250 30% 12%) 0%, hsl(250 30% 8%) 100%)',
                border: `1px solid ${isActive ? feature.glowColor : 'hsl(var(--border))'}`,
                boxShadow: isActive ? `0 0 30px ${feature.glowColor} / 0.2, inset 0 0 30px ${feature.glowColor} / 0.05` : 'none',
              }}
            >
              {/* Active glow background */}
              {isActive && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at top left, ${feature.glowColor} / 0.15, transparent 60%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
              
              {/* Icon container */}
              <motion.div
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300`}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                    : 'hsl(var(--muted))',
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                
                <feature.icon 
                  className={`w-6 h-6 relative z-10 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-muted-foreground"
                  }`} 
                  style={{
                    filter: isActive ? `drop-shadow(0 0 10px ${feature.glowColor})` : 'none',
                  }}
                />
                
                {/* Inner shine */}
                <div 
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.2) 0%, transparent 50%)',
                  }}
                />
              </motion.div>
              
              <div className="text-left relative z-10">
                <p className={`font-semibold text-sm transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-foreground"
                }`}>
                  {feature.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {feature.description}
                </p>
              </div>

              {/* Active indicator */}
              <motion.div
                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                style={{
                  background: isActive ? feature.glowColor : 'transparent',
                  boxShadow: isActive ? `0 0 10px ${feature.glowColor}` : 'none',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: isActive ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: feature.glowColor }}
                    animate={{ scale: [1, 2.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Shimmer on active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.05), transparent)',
                  }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
