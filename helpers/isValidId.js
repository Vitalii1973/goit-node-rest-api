const { isValidObjectId } = require("mongoose");
const HttpError = require("./HttpError");

exports.isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};
