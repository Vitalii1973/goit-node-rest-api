const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const HttpError = require("../helpers/HttpError");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new HttpError(401, "Not authorized");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
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
    next(error);
  }
};

module.exports = authMiddleware;
