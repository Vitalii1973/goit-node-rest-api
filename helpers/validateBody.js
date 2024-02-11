const Joi = require("joi");
const HttpError = require("./HttpError");

const validateBody = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
