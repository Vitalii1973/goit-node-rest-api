const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Missing required name field" }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid address",
    "any.required": "Missing required email field",
  }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "Missing required phone field" }),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),

  email: Joi.string(),

  phone: Joi.string(),

  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
};
