export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export interface AppSettings {
  emergencyNumber: string;
}

export type TabType =
  | "home"
  | "contacts"
  | "helpline"
  | "fakecall"
  | "pitchdeck"
  | "privacy";
