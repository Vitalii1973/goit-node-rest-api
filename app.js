const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/contactsRouter.js");
const usersRouter = require("./routes/usersRouter.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Підключення до бази даних MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );

// Маршрути для контактів та користувачів
app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);

// Обробка неправильних маршрутів
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Обробка помилок сервера
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
