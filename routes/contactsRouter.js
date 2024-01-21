// contactsRouter.js
const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require("../controllers/contactsControllers.js");

const contactsService = require("../services/contactsServices");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");
const validateBody = require("../helpers/validateBody");

const contactsRouter = express.Router();

// Оголошення маршрутів

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);

// Додавання валідації для POST-маршруту
contactsRouter.post("/", validateBody(createContactSchema), (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = contactsService.addContact(name, email, phone);

  if (!newContact) {
    return res.status(500).json({ message: "Failed to add contact" });
  }

  return res.status(201).json(newContact);
});

// Додавання валідації та обробки PUT-маршруту
contactsRouter.put("/:id", validateBody(updateContactSchema), (req, res) => {
  const { id } = req.params;

  // Перевірка, чи передані поля для оновлення
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }

  const updatedContact = contactsService.updateContact(id, req.body);

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json(updatedContact);
});

module.exports = contactsRouter;
