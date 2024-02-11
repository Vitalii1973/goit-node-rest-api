const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db/contacts.json");

const listContactsService = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactByIdService = async (contactId) => {
  const contacts = await listContactsService();
  const findContact = contacts.find((item) => item.id === contactId);
  return findContact || null;
};

const removeContactService = async (contactId) => {
  const contacts = await listContactsService();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContactService = async (data) => {
  const contacts = await listContactsService();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContactService = async (id, data) => {
  const contacts = await listContactsService();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const contactToUpdate = contacts.find((contact) => contact.id === id);
  contacts[index] = { id, ...contactToUpdate, ...data };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
