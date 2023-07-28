const router = require("express").Router();
const user = require("./user");
const clothingItem = require("./clothingItem");
const { createUser, login } = require("../controllers/user");
const { validateUser, validateSignin } = require("../middlewares/validation");
const NotFoundError = require("../errors/NotFoundError");

router.post("/signup", validateUser, createUser);
router.post("/signin", validateSignin, login);

router.use("/users", user);
router.use("/items", clothingItem);

router.use((req, res, next) => {
  next(new NotFoundError("Not Found"));
});

module.exports = router;
