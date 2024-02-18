const express = require("express");
const validateBody = require("../middlewares/validateBody.js");
const {
  registerSchema,
  loginSchema,
  verificationEmailSchema,
} = require("../schemas/userSchemas.js");
const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../controllers/auth.js");
const { authenticate } = require("../helpers/authenticate.js");
const upload = require("../middlewares/upload.js");

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post(
  "/verify",
  validateBody(verificationEmailSchema),
  resendVerifyEmail
);
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
