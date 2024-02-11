const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must contain at least 6 characters",
    "any.required": "Password is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid address",
    "any.required": "Email is a required field",
  }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "any.only":
      "Subscription must be one of the following: starter, pro, business",
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must contain at least 6 characters",
    "any.required": "Password is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid address",
    "any.required": "Email is a required field",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
