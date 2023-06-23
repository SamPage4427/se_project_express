const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { itemError, ERROR_409 } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((e) => itemError(req, res, e));
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => itemError(req, res, e));
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((user) => res.send({ name, avatar, email: user.email }))
      .catch((e) => {
        console.error(e);
        if (e.code === 11000) {
          const error = new Error("User already exists");
          return res.status(ERROR_409).send(error);
        }

        return itemError(req, res, e);
      });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password).then((user) =>
    res.send({
      token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
    })
  );
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true, upsert: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => itemError(req, res, e));
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  login,
  updateProfile,
};
