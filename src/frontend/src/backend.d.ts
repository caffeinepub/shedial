import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Settings {
    emergencyNumber: string;
}
export interface Contact {
    name: string;
    phoneNumber: string;
}
export interface backendInterface {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
    addContact(name: string, phoneNumber: string): Promise<bigint>;
    deleteContact(id: bigint): Promise<void>;
    editContact(id: bigint, name: string, phoneNumber: string): Promise<void>;
    getAllContacts(): Promise<Array<Contact>>;
    getContact(id: bigint): Promise<Contact>;
    getSettings(): Promise<Settings>;
    updateSettings(emergencyNumber: string): Promise<void>;
}
