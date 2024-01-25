// routes/favoriteRouter.js
const express = require("express");
const {
  updateStatusContact,
} = require("../controllers/contactsControllers.js");

const favoriteRouter = express.Router();

favoriteRouter.patch("/:contactId/favorite", updateStatusContact);

module.exports = favoriteRouter;
