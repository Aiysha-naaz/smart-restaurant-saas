const express = require("express");
const router = express.Router();

const {
  addInventoryItem,
  getInventoryItems,
  updateItem,     // ✅ ADD
  deleteInventoryItem       // ✅ ADD
} = require("../controllers/inventoryController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addInventoryItem);
router.get("/", protect, getInventoryItems);

// ✅ NEW ROUTES
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteInventoryItem);

module.exports = router;