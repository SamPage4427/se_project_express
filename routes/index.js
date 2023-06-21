const router = require("express").Router();
const user = require("./user");
const clothingItem = require("./clothingItem");
const { ERROR_404 } = require("../utils/errors");
const { createUser, login } = require("../controllers/user");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", user);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Requested resource not found" });
});

module.exports = router;
