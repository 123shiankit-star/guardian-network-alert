import { motion, Variants } from "framer-motion";
import { Shield, Sparkles, Lock } from "lucide-react";
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
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b" style={{
        background: 'linear-gradient(180deg, hsl(250 30% 8% / 0.9) 0%, hsl(250 30% 6% / 0.8) 100%)',
        borderColor: 'hsl(var(--primary) / 0.15)',
      }}>
        <div className="container max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="flex items-center gap-3"
            >
              <motion.div 
                className="relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
                  boxShadow: '0 0 30px hsl(var(--primary) / 0.4)',
                }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, hsl(var(--foreground) / 0.2) 0%, transparent 50%)',
                  }}
                />
                <Lock className="w-6 h-6 text-primary-foreground relative z-10" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ 
                    boxShadow: [
                      'inset 0 0 20px hsl(var(--foreground) / 0.1)',
                      'inset 0 0 40px hsl(var(--foreground) / 0.2)',
                      'inset 0 0 20px hsl(var(--foreground) / 0.1)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h1 className="font-display font-bold text-xl flex items-center gap-2">
                  <span className="text-gradient-hero">GuardMe</span>
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles className="w-4 h-4 text-secondary" />
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
              className="absolute -inset-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <h2 className="text-4xl font-display font-bold mb-3 relative">
              <span className="text-gradient-hero">Emergency</span>{" "}
              <span className="text-foreground">SOS</span>
            </h2>
            <p className="text-muted-foreground relative flex items-center justify-center gap-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-secondary"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Stay protected, even offline
              <motion.span
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
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
