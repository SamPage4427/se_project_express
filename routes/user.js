const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/user");
const auth = require("../middlewares/auth");
const { validateUpdateUser } = require("../middlewares/validation");

// CRUD methods

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUpdateUser, updateProfile);

module.exports = router;
