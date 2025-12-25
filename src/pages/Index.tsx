import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { NetworkStatus } from "@/components/NetworkStatus";
import { SOSButton } from "@/components/SOSButton";
import { EmergencyTypes } from "@/components/EmergencyTypes";
import { EmergencyContacts } from "@/components/EmergencyContacts";
import { OfflineFeatures } from "@/components/OfflineFeatures";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-foreground">
                  GuardMe
                </h1>
                <p className="text-xs text-muted-foreground">Your Safety Shield</p>
              </div>
            </motion.div>
            <NetworkStatus />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-lg mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Emergency SOS
            </h2>
            <p className="text-muted-foreground">
              Stay protected, even offline
            </p>
          </motion.div>

          {/* SOS Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <SOSButton />
          </motion.div>

          {/* Offline Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <OfflineFeatures />
          </motion.div>

          {/* Emergency Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            <EmergencyTypes />
          </motion.div>

          {/* Emergency Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full pb-8"
          >
            <EmergencyContacts />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
