const ClothingItem = require("../models/clothingItem");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

// 400 e.name = ValidationError, CastError
// 404 e.name = DocumentNotFoundError
// 500 e.name = InternalServerError, defaultError

const itemError = (req, res, e) => {
  if (e.name === "ValidationError") {
    return res.status(ERROR_400).send({ message: "Invalid Data Input" });
  } else if (e.name === "CastError") {
    return res.status(ERROR_400).send({ message: "Invalid ID" });
  } else if (e.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({ message: "Error: Not Found" });
  }
  return res.status(ERROR_500).send({ message: "Router not found" });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => itemError(req, res, e));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => itemError(req, res, e));
};

const deleteItem = (req, res) => {
  const { itemsId } = req.params;

  ClothingItem.findByIdAndDelete(itemsId)
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((e) => itemError(req, res, e));
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemsId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => itemError(req, res, e));
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => itemError(req, res, e));
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
