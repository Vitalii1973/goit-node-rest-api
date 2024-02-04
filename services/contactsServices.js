const contactsService = require("../services/contactsServices.js");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsService.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOneContact = async (req, res) => {
  try {
    const contact = await contactsService.getOneContact(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await contactsService.deleteContact(
      req.params.contactId
    );
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createContact = async (req, res) => {
  try {
    const newContact = await contactsService.createContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const updatedContact = await contactsService.updateContact(
      req.params.contactId,
      req.body
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
