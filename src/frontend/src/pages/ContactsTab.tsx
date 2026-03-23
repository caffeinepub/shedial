import { Edit2, Plus, Trash2, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ContactModal } from "../components/ContactModal";
import { useContacts } from "../hooks/useContacts";
import type { Contact } from "../types";

export function ContactsTab() {
  const { contacts, addContact, editContact, deleteContact } = useContacts();
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleSave = (name: string, phone: string) => {
    if (editingContact) {
      editContact(editingContact.id, name, phone);
    } else {
      addContact(name, phone);
    }
    setEditingContact(null);
  };

  return (
    <>
      <AnimatePresence>
        {(showModal || editingContact) && (
          <ContactModal
            key="contact-modal"
            contact={editingContact}
            onSave={handleSave}
            onClose={() => {
              setShowModal(false);
              setEditingContact(null);
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 px-4 pb-24">
        {contacts.length === 0 ? (
          <motion.div
            data-ocid="contacts.empty_state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Users size={28} className="text-red-400" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-base">
                No contacts added yet
              </p>
              <p className="text-white/40 text-sm mt-1">
                Add your emergency contacts below
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-surface overflow-hidden"
          >
            {contacts.map((c, i) => (
              <motion.div
                key={c.id}
                data-ocid={`contacts.item.${i + 1}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 px-4 py-4 ${i < contacts.length - 1 ? "border-b border-white/8" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 font-bold text-base">
                    {c.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-base truncate">
                    {c.name}
                  </p>
                  <p className="text-white/50 text-sm">{c.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-ocid={`contacts.edit_button.${i + 1}`}
                    className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/60 active:scale-90 transition-transform"
                    onClick={() => setEditingContact(c)}
                    aria-label={`Edit ${c.name}`}
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    type="button"
                    data-ocid={`contacts.delete_button.${i + 1}`}
                    className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 active:scale-90 transition-transform"
                    onClick={() => deleteContact(c.id)}
                    aria-label={`Delete ${c.name}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        <p className="text-white/30 text-xs text-center">
          {contacts.length} emergency contact{contacts.length !== 1 ? "s" : ""}{" "}
          saved
        </p>
      </div>

      <button
        type="button"
        data-ocid="contacts.open_modal_button"
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-red-500 shadow-red-glow flex items-center justify-center text-white active:scale-90 transition-transform z-40"
        onClick={() => {
          setEditingContact(null);
          setShowModal(true);
        }}
        aria-label="Add contact"
      >
        <Plus size={26} />
      </button>
    </>
  );
}
