// app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/contactsRouter.js");
const validateBody = require("./helpers/validateBody");
const contactsService = require("./services/contactsServices");
const { createContactSchema } = require("./schemas/contactsSchemas");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.post("/api/contacts", validateBody(createContactSchema), (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = contactsService.addContact(name, email, phone);

  if (!newContact) {
    return res.status(500).json({ message: "Failed to add contact" });
  }

  return res.status(201).json(newContact);
});

// Додано роутер для інших запитів
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
