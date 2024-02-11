const express = require("express");
const contactsController = require("../controllers/contactsControllers");
const validateBody = require("../helpers/validateBody");
const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../schemas/contactsSchemas");
const isValidId = require("../helpers/isValidId");
const authenticate = require("../helpers/authenticate");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsController.getAllContacts);

contactsRouter.get(
  "/:id",
  authenticate,
  isValidId,
  contactsController.getContactById
);

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsController.deleteContact
);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  contactsController.createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  contactsController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsController.updateFavorite
);

module.exports = contactsRouter;
