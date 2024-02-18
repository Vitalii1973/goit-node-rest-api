const HttpError = require("../helpers/HttpError.js");
const { Contact } = require("../models/contact.js");

exports.getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "name email phone favorite", {
      skip,
      limit,
    }).populate("owner", "email subscription");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findById(id).where("owner").equals(owner);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findByIdAndDelete(id)
      .where("owner")
      .equals(owner);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const keys = Object.keys(req.body);

    if (keys.length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
      .where("owner")
      .equals(owner);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateFavorite = async (req, res, next) => {
  try {
    const keys = Object.keys(req.body);

    if (keys.length === 0) {
      throw HttpError(400, "missing field favorite");
    }

    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
      .where("owner")
      .equals(owner);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
