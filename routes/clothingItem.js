const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");
const { validateItem, validateId } = require("../middlewares/validation");

// CRUD methods

router.get("/", getItems);
router.post("/", auth, validateItem, createItem);
router.put("/:itemsId/likes", auth, validateId, likeItem);
router.delete("/:itemsId", auth, validateId, deleteItem);
router.delete("/:itemId/likes", auth, validateId, unlikeItem);

module.exports = router;
