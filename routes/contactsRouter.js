const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact, // Додайте це імпортування
} = require("../controllers/contactsControllers.js");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post("/", createContact);
contactsRouter.put("/:id", updateContact);

// Додайте обробник маршруту PATCH:
contactsRouter.patch("/:contactId/favorite", updateStatusContact);

module.exports = contactsRouter;
