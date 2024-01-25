const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Vitalii:Zc8jyQa0KCMbxhnQ@cluster0.unybuf8.mongodb.net/db-contacts?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
