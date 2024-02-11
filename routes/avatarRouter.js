const express = require("express");
const validateBody = require("../helpers/validateBody");
const { registerSchema, loginSchema } = require("../schemas/userSchemas");
const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require("../controllers/authControllers");
const authenticate = require("../helpers/authenticate");
const upload = require("../middlewares/upload");

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.get("/current", authenticate, getCurrent);
authRouter.post("/logout", authenticate, logout);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = authRouter;
