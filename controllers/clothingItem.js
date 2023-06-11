//getItem
//createItem
//deleteItem

const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) =>
      res.status(500).send({ message: `Error from find items: ${e}` })
    );
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) =>
      res.status(500).send({ message: `Error from create item: ${e}` })
    );
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => res.status(204).send({}))
    .catch((e) =>
      res.status(500).send({ message: `Error from delete item: ${e}` })
    );
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) =>
      res.status(500).send({ message: `Error from update likes: ${e}` })
    );
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) =>
      res.status(500).send({ message: `Error from remove like: ${e}` })
    );
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
