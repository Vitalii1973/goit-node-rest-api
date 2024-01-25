const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("./db.js");

const contactsRouter = require("./routes/contactsRouter.js");
const favoriteRouter = require("./routes/favoriteRouter.js"); // Імпортуйте маршрутизатор favoriteRouter

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

mongoose();

app.use("/api/contacts", contactsRouter);
app.use("/api/contacts", favoriteRouter); // Використовуйте favoriteRouter після contactsRouter

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
