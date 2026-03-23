import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type Contact = {
    name : Text;
    phoneNumber : Text;
  };

  module Contact {
    public func compare(contact1 : Contact, contact2 : Contact) : Order.Order {
      Text.compare(contact1.name, contact2.name);
    };
  };

  var nextContactId = 0;
  let contacts = Map.empty<Int, Contact>();

  type Settings = {
    emergencyNumber : Text;
  };

  var userSettings : Settings = {
    emergencyNumber = "911";
  };

  func getContactInternal(id : Int) : Contact {
    switch (contacts.get(id)) {
      case (null) { Runtime.trap("Contact not found") };
      case (?contact) { contact };
    };
  };

  public shared ({ caller }) func addContact(name : Text, phoneNumber : Text) : async Int {
    let contact : Contact = {
      name;
      phoneNumber;
    };
    contacts.add(nextContactId, contact);
    let id = nextContactId;
    nextContactId += 1;
    id;
  };

  public shared ({ caller }) func editContact(id : Int, name : Text, phoneNumber : Text) : async () {
    let contact : Contact = {
      name;
      phoneNumber;
    };
    ignore getContactInternal(id);
    contacts.add(id, contact);
  };

  public shared ({ caller }) func deleteContact(id : Int) : async () {
    ignore getContactInternal(id);
    contacts.remove(id);
  };

  public query ({ caller }) func getContact(id : Int) : async Contact {
    getContactInternal(id);
  };

  public shared ({ caller }) func updateSettings(emergencyNumber : Text) : async () {
    userSettings := {
      emergencyNumber;
    };
  };

  public query ({ caller }) func getSettings() : async Settings {
    userSettings;
  };

  public query ({ caller }) func getAllContacts() : async [Contact] {
    contacts.values().toArray().sort();
  };
};
