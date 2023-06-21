const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { itemError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((e) => itemError(req, res, e));
};

const getCurrentUser = (req, res) => {
  const { _id } = req.params;
  console.log({ _id });
  console.log(req.params);

  User.findById({ _id })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => itemError(req, res, e));
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((user) => res.send({ data: user }))
      .catch((e) => {
        if (e === "MongoServerError") {
          const error = new Error("User already exists");
          error.statusCode = 11000;
          itemError(req, res, e);
        }
      })
      .then((user) => res.send({ data: user }))
      .catch((e) => itemError(req, res, e));
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password).then((user) => {
    return res.send({
      token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
    });
  });
};

const updateProfile = (req, res) => {
  const { name, avatar, _id } = req.body;

  User.findByIdAndUpdate(
    { _id },
    { name, avatar },
    { new: true, runValidators: true, upsert: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => itemError(req, res, e));
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateProfile,
};
