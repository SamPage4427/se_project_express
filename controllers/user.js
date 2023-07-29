const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { JWT_SECRET, NODE_ENV } = process.env;

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(new NotFoundError("User not found"))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new ConflictError("Email already in use"));
      }
      return;
    })
    .then(() =>
      bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({ name, avatar, email, password: hash }).then((user) =>
            res.send({ name, avatar, email: user.email })
          )
        )
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data sent to the server"));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) =>
      res.send({
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "some-secret-key",
          { expiresIn: "7d" }
        ),
      })
    )
    .catch(() => next(new UnauthorizedError("Not authorized")));
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("User not found"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data sent to server"));
      }
      return next(err);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateProfile,
};
