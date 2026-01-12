import { motion, Variants } from "framer-motion";
import { User, Phone, Plus, Star, Sparkles } from "lucide-react";
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  isPrimary: boolean;
}

const defaultContacts: Contact[] = [
  { id: "1", name: "Emergency Services", phone: "911", isPrimary: true },
  { id: "2", name: "Mom", phone: "+1 (555) 123-4567", isPrimary: false },
  { id: "3", name: "Dad", phone: "+1 (555) 987-6543", isPrimary: false },
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
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export const EmergencyContacts = () => {
  const [contacts] = useState<Contact[]>(defaultContacts);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <motion.h2 
          className="text-lg font-display font-semibold text-foreground flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="w-1 h-6 bg-gradient-to-b from-secondary to-accent rounded-full" />
          Emergency Contacts
        </motion.h2>
        <motion.button 
          className="p-2.5 rounded-xl glass-card-hover group"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>
      </div>
      
      <motion.div 
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 5 }}
            className="relative flex items-center gap-4 p-4 rounded-2xl glass-card-hover group overflow-hidden"
          >
            {/* Animated background gradient on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            <div className="relative">
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.1 }}
              >
                <User className="w-7 h-7 text-muted-foreground" />
                
                {/* Avatar ring glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    boxShadow: contact.isPrimary 
                      ? "inset 0 0 15px hsl(var(--primary) / 0.3)"
                      : "inset 0 0 15px hsl(var(--secondary) / 0.3)",
                  }}
                />
              </motion.div>
              
              {contact.isPrimary && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <Star className="w-3.5 h-3.5 text-primary-foreground" />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 hsl(var(--primary) / 0.4)",
                        "0 0 0 6px hsl(var(--primary) / 0)",
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </div>
            
            <div className="flex-1 min-w-0 relative z-10">
              <p className="font-semibold text-foreground truncate flex items-center gap-2">
                {contact.name}
                {contact.isPrimary && (
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                  </motion.span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">{contact.phone}</p>
            </div>
            
            <motion.button 
              className="relative p-3.5 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 text-secondary overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Phone className="w-5 h-5 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-secondary/30"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
