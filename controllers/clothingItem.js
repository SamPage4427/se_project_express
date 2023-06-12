const ClothingItem = require("../models/clothingItem");
const { itemError } = require("../utils/errors");

// 400 e.name = ValidationError, CastError
// 404 e.name = DocumentNotFoundError
// 500 e.name = InternalServerError, defaultError

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((e) => itemError(req, res, e));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
    .catch((e) => itemError(req, res, e));
};

const deleteItem = (req, res) => {
  const { itemsId } = req.params;

  ClothingItem.findByIdAndDelete(itemsId)
    .orFail()
    .then((item) => res.send({ item }))
    .catch((e) => itemError(req, res, e));
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemsId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => itemError(req, res, e));
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((e) => itemError(req, res, e));
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
