import { motion, Variants } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";
import { NetworkStatus } from "@/components/NetworkStatus";
import { SOSButton } from "@/components/SOSButton";
import { EmergencyTypes } from "@/components/EmergencyTypes";
import { EmergencyContacts } from "@/components/EmergencyContacts";
import { OfflineFeatures } from "@/components/OfflineFeatures";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-t-0 border-x-0">
        <div className="container max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="flex items-center gap-3"
            >
              <motion.div 
                className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Shield className="w-7 h-7 text-primary-foreground relative z-10" />
                <motion.div
                  className="absolute -inset-1 bg-primary/50 blur-xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h1 className="font-display font-bold text-xl text-gradient-hero flex items-center gap-2">
                  GuardMe
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                  </motion.span>
                </h1>
                <p className="text-xs text-muted-foreground">Your Safety Shield</p>
              </div>
            </motion.div>
            <NetworkStatus />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-lg mx-auto px-4 py-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-12"
        >
          {/* Hero Section */}
          <motion.div
            variants={itemVariants}
            className="text-center relative"
          >
            <motion.div
              className="absolute -inset-20 bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <h2 className="text-3xl font-display font-bold text-gradient-hero mb-3 relative">
              Emergency SOS
            </h2>
            <p className="text-muted-foreground relative">
              Stay protected, even offline
            </p>
          </motion.div>

          {/* SOS Button */}
          <motion.div variants={itemVariants}>
            <SOSButton />
          </motion.div>

          {/* Offline Features */}
          <motion.div variants={itemVariants} className="w-full">
            <OfflineFeatures />
          </motion.div>

          {/* Emergency Types */}
          <motion.div variants={itemVariants} className="w-full">
            <EmergencyTypes />
          </motion.div>

          {/* Emergency Contacts */}
          <motion.div variants={itemVariants} className="w-full pb-8">
            <EmergencyContacts />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
