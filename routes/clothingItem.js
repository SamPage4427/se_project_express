const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");

// CRUD methods

router.get("/", getItems);
router.post("/", auth, createItem);
router.put("/:itemsId/likes", auth, likeItem);
router.delete("/:itemsId", auth, deleteItem);
router.delete("/:itemId/likes", auth, unlikeItem);

module.exports = router;
