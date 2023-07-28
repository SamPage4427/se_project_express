const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data passed to the server"));
      }
      return next(e);
    });
};

const deleteItem = (req, res, next) => {
  const { itemsId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemsId)
    .orFail(new NotFoundError("Item could not be found"))
    .then((item) => {
      if (item.owner.equals(userId)) {
        return item.remove(() => res.send({ item }));
      }
      return next(new ForbiddenError("User not authorized to delete item"));
    })
    .catch(next);
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemsId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("Item not found"))
    .then((item) => res.send({ data: item }))
    .catch(next);
};

const unlikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("Item not found"))
    .then((item) => res.send({ data: item }))
    .catch(next);
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
