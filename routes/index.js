const router = require("express").Router();
const user = require("./user");
const clothingItem = require("./clothingItem");

router.use("/users", user);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
