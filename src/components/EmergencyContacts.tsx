import { motion } from "framer-motion";
import { User, Phone, Plus, Star, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  isPrimary: boolean;
  avatar?: string;
}

const defaultContacts: Contact[] = [
  { id: "1", name: "Emergency Services", phone: "911", isPrimary: true },
  { id: "2", name: "Mom", phone: "+1 (555) 123-4567", isPrimary: false },
  { id: "3", name: "Dad", phone: "+1 (555) 987-6543", isPrimary: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 200,
    },
  },
};

export const EmergencyContacts = () => {
  const [contacts] = useState<Contact[]>(defaultContacts);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-5"
      >
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-secondary to-accent rounded-full" />
          <h2 className="text-xl font-display font-bold text-foreground">
            Emergency Contacts
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="p-2.5 rounded-xl glass border border-border hover:border-secondary/50 hover:glow-secondary transition-all duration-300"
        >
          <Plus className="w-5 h-5 text-secondary" />
        </motion.button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-3"
      >
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            variants={itemVariants}
            whileHover={{ x: 5 }}
            className="relative flex items-center gap-4 p-4 rounded-2xl glass border border-border/50 hover:border-secondary/30 transition-all duration-300 group cursor-pointer overflow-hidden"
          >
            {/* Gradient line on left */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary to-accent"
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Avatar */}
            <div className="relative">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <User className="w-7 h-7 text-muted-foreground" />
              </motion.div>
              {contact.isPrimary && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-warning flex items-center justify-center shadow-lg"
                >
                  <Star className="w-3 h-3 text-primary-foreground" fill="currentColor" />
                </motion.div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-foreground truncate">
                {contact.name}
              </p>
              <p className="text-sm text-muted-foreground">{contact.phone}</p>
            </div>

            {/* Call button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-xl bg-secondary/20 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <Phone className="w-5 h-5" />
            </motion.button>

            {/* Arrow indicator */}
            <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
