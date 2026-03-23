import { useCallback, useState } from "react";
import type { Contact } from "../types";

const STORAGE_KEY = "shedial_contacts";

const defaultContacts: Contact[] = [
  { id: "1", name: "Mom", phone: "+91 98765 43210" },
  { id: "2", name: "Best Friend Priya", phone: "+91 87654 32109" },
  { id: "3", name: "Sister Neha", phone: "+91 76543 21098" },
];

function loadContacts(): Contact[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContacts));
  return defaultContacts;
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>(loadContacts);

  const save = useCallback((updated: Contact[]) => {
    setContacts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addContact = useCallback(
    (name: string, phone: string) => {
      const newContact: Contact = { id: Date.now().toString(), name, phone };
      save([...contacts, newContact]);
    },
    [contacts, save],
  );

  const editContact = useCallback(
    (id: string, name: string, phone: string) => {
      save(contacts.map((c) => (c.id === id ? { ...c, name, phone } : c)));
    },
    [contacts, save],
  );

  const deleteContact = useCallback(
    (id: string) => {
      save(contacts.filter((c) => c.id !== id));
    },
    [contacts, save],
  );

  return { contacts, addContact, editContact, deleteContact };
}
