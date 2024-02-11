// handleMongooseError.cjs
const handleMongooseError = async (error, data, next) => {
  try {
    data.additionalField = "additional value";
    await data.save();
    next();
  } catch (error) {
    console.error("An error occurred in the event handler save:", error);
    next(error);
  }
};

module.exports = handleMongooseError;
