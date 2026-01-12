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
          <span 
            className="w-1 h-6 rounded-full"
            style={{
              background: 'linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(220 90% 60%) 100%)',
            }}
          />
          Emergency Contacts
        </motion.h2>
        <motion.button 
          className="p-2.5 rounded-xl group relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(250 30% 12%) 0%, hsl(250 30% 8%) 100%)',
            border: '1px solid hsl(var(--border))',
          }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.2), transparent)',
            }}
          />
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
            className="relative flex items-center gap-4 p-4 rounded-2xl group overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(250 30% 12%) 0%, hsl(250 30% 8%) 100%)',
              border: '1px solid hsl(var(--border))',
            }}
          >
            {/* Hover gradient */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, hsl(var(--secondary) / 0.1) 0%, transparent 50%, hsl(var(--primary) / 0.1) 100%)',
              }}
            />
            
            {/* Border glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                boxShadow: 'inset 0 0 0 1px hsl(var(--primary) / 0.3), 0 0 20px hsl(var(--primary) / 0.1)',
              }}
            />
            
            <div className="relative">
              <motion.div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: contact.isPrimary 
                    ? 'linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--secondary) / 0.2) 100%)'
                    : 'hsl(var(--muted))',
                  border: contact.isPrimary ? '1px solid hsl(var(--primary) / 0.3)' : 'none',
                }}
                whileHover={{ scale: 1.1 }}
              >
                <User className={`w-7 h-7 ${contact.isPrimary ? 'text-primary' : 'text-muted-foreground'}`} />
              </motion.div>
              
              {contact.isPrimary && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
                    boxShadow: '0 0 15px hsl(var(--primary) / 0.5)',
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <Star className="w-3.5 h-3.5 text-primary-foreground" />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'hsl(var(--primary))' }}
                    animate={{ 
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
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
                    <Sparkles className="w-4 h-4 text-secondary" />
                  </motion.span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">{contact.phone}</p>
            </div>
            
            <motion.button 
              className="relative p-3.5 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.2) 0%, hsl(var(--secondary) / 0.1) 100%)',
                border: '1px solid hsl(var(--secondary) / 0.3)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Phone className="w-5 h-5 text-secondary relative z-10" />
              <motion.div
                className="absolute inset-0"
                style={{ background: 'hsl(var(--secondary) / 0.2)' }}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
