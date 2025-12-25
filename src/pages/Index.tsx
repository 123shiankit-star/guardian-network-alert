import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { NetworkStatus } from "@/components/NetworkStatus";
import { SOSButton } from "@/components/SOSButton";
import { EmergencyTypes } from "@/components/EmergencyTypes";
import { EmergencyContacts } from "@/components/EmergencyContacts";
import { OfflineFeatures } from "@/components/OfflineFeatures";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="container max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                className="relative w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Shield className="w-7 h-7 text-primary-foreground relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.div>
              <div>
                <motion.h1
                  className="font-display font-black text-2xl text-gradient-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  GuardMe
                </motion.h1>
                <motion.p
                  className="text-xs text-muted-foreground flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles className="w-3 h-3 text-secondary" />
                  Your Safety Shield
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <NetworkStatus />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-lg mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col items-center gap-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 20 }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">
                Protection Active
              </span>
            </motion.div>
            <h2 className="text-3xl font-display font-black text-foreground mb-3">
              Emergency <span className="text-gradient-primary">SOS</span>
            </h2>
            <p className="text-muted-foreground max-w-xs mx-auto">
              Stay protected anytime, anywhere —{" "}
              <span className="text-secondary font-medium">even offline</span>
            </p>
          </motion.div>

          {/* SOS Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", damping: 15 }}
          >
            <SOSButton />
          </motion.div>

          {/* Offline Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full"
          >
            <OfflineFeatures />
          </motion.div>

          {/* Emergency Types */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full"
          >
            <EmergencyTypes />
          </motion.div>

          {/* Emergency Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full pb-8"
          >
            <EmergencyContacts />
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center pb-8"
          >
            <p className="text-xs text-muted-foreground">
              Made with ❤️ for your safety
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
