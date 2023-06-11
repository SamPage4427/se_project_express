//getUsers
//getUser
//createUser

const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) =>
      res.status(500).send({ message: `Error from get users: ${e}` })
    );
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) =>
      res.status(500).send({ message: `Error from get user: ${e}` })
    );
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) =>
      res.status(500).send({ message: `Error from create user: ${e}` })
    );
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
