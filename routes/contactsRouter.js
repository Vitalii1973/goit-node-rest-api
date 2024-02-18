const express = require("express");
const {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} = require("../controllers/contactsControllers.js");
const validateBody = require("../middlewares/validateBody.js");
const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../schemas/contactsSchemas.js");
const { isValidId } = require("../helpers/isValidId.js");
const { authenticate } = require("../helpers/authenticate.js");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getContactById);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateFavorite
);
module.exports = contactsRouter;
