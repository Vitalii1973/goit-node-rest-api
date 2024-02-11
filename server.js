const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/contactsRouter");
const avatarRouter = require("./routes/avatarRouter");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.static("public/avatars"));
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/users", avatarRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { MONGODB_URI, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
