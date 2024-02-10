const express = require("express");
const contactsControllers = require("../controllers/contactsControllers.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", authMiddleware, contactsControllers.getAllContacts);
router.get("/:id", authMiddleware, contactsControllers.getOneContact);
router.delete("/:id", authMiddleware, contactsControllers.deleteContact);
router.post("/", authMiddleware, contactsControllers.createContact);
router.put("/:id", authMiddleware, contactsControllers.updateContact);

module.exports = router;
