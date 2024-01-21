// helpers/validateBody.js
import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      next(HttpError(400, `Validation error: ${errorMessage}`));
    } else {
      next();
    }
  };

  return func;
};

export default validateBody;
