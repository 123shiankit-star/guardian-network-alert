import { motion } from "framer-motion";
import { User, Phone, Plus, Star } from "lucide-react";
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

export const EmergencyContacts = () => {
  const [contacts] = useState<Contact[]>(defaultContacts);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display font-semibold text-foreground">
          Emergency Contacts
        </h2>
        <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
          <Plus className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              {contact.isPrimary && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Star className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.phone}</p>
            </div>
            
            <button className="p-3 rounded-full bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors opacity-0 group-hover:opacity-100">
              <Phone className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
