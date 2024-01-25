// contactsServices.js
import Contact from "../models/contactModel.js";

const getAllContacts = async () => {
  return await Contact.find();
};

const getOneContact = async (id) => {
  return await Contact.findById(id);
};

const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

const createContact = async (data) => {
  return await Contact.create(data);
};

const updateContact = async (id, data) => {
  return await Contact.findByIdAndUpdate(id, data, { new: true });
};

const updateStatusContact = async (contactId, favorite) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
