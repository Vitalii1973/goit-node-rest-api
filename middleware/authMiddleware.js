require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const HttpError = require("../helpers/HttpError");

const secretKey = process.env.JWT_SECRET || "default_secret_key";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError(401, "Not authorized");
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, secretKey);
    if (!decodedToken) {
      throw new HttpError(401, "Not authorized");
    }

    const userId = decodedToken.id;

    const user = await User.findById(userId);
    if (!user || user.token !== token) {
      throw new HttpError(401, "Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Server error" });
  }
};

module.exports = authMiddleware;
