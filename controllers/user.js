const User = require("../models/user");
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

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => itemError(req, res, e));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  console.log(req.params);

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => itemError(req, res, e));
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => itemError(req, res, e));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
