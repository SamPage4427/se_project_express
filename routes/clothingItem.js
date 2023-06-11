const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

// CRUD methods

router.get("/", getItems);
router.post("/", createItem);
router.put("/:itemsId/likes", likeItem);
router.delete("/:itemsId", deleteItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
