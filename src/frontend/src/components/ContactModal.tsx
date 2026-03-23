import { UserPlus, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Contact } from "../types";

interface ContactModalProps {
  contact?: Contact | null;
  onSave: (name: string, phone: string) => void;
  onClose: () => void;
}

export function ContactModal({ contact, onSave, onClose }: ContactModalProps) {
  const [name, setName] = useState(contact?.name ?? "");
  const [phone, setPhone] = useState(contact?.phone ?? "");

  const handleSave = () => {
    if (name.trim() && phone.trim()) {
      onSave(name.trim(), phone.trim());
      onClose();
    }
  };

  return (
    <motion.div
      data-ocid="contacts.modal"
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: modal backdrop */}
      <div
        role="presentation"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-[430px] rounded-t-3xl card-surface p-6 pb-10"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-sans font-bold text-white text-xl">
            {contact ? "Edit Contact" : "Add Contact"}
          </h2>
          <button
            type="button"
            data-ocid="contacts.close_button"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="contact-name"
              className="text-white/60 text-sm font-medium mb-2 block"
            >
              Name
            </label>
            <input
              id="contact-name"
              data-ocid="contacts.input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-base placeholder-white/30 outline-none focus:border-red-500/60 transition-colors"
              placeholder="Contact name"
            />
          </div>
          <div>
            <label
              htmlFor="contact-phone"
              className="text-white/60 text-sm font-medium mb-2 block"
            >
              Phone Number
            </label>
            <input
              id="contact-phone"
              data-ocid="contacts.phone_input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-base placeholder-white/30 outline-none focus:border-red-500/60 transition-colors"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <button
          type="button"
          data-ocid="contacts.save_button"
          className="w-full mt-6 py-4 rounded-2xl bg-red-500 hover:bg-red-600 active:scale-95 flex items-center justify-center gap-2 text-white font-bold text-base transition-all disabled:opacity-40"
          onClick={handleSave}
          disabled={!name.trim() || !phone.trim()}
        >
          <UserPlus size={18} />
          {contact ? "Save Changes" : "Add Contact"}
        </button>
      </motion.div>
    </motion.div>
  );
}
