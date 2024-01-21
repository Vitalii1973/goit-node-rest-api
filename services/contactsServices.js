// contactsServices.js
const fs = require("fs");
const path = require("path");
const { updateContactSchema } = require("../schemas/contactsSchemas");

const contactsFilePath = path.join(__dirname, "..", "data", "contacts.json");

const updateContact = (id, data) => {
  const contacts = JSON.parse(fs.readFileSync(contactsFilePath, "utf-8"));

  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null; // Контакт не знайдено
  }

  const updatedContact = { ...contacts[index], ...data };
  contacts[index] = updatedContact;

  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));

  return updatedContact;
};

module.exports = { updateContact };
