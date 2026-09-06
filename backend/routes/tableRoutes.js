// const express = require("express");
// const router = express.Router();

// const {
//   createTable,
//   getTables,
//   updateTableStatus,
//   markTableClean
// } = require("../controllers/tableController");

// // CREATE TABLE
// router.post("/:restaurantId", createTable);

// // GET ALL TABLES
// router.get("/:restaurantId", getTables);

// // UPDATE TABLE STATUS
// router.patch("/:id/status", updateTableStatus);
// router.patch("/:id/clean", markTableClean);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createTable,
  getTables,
  updateTableStatus,
  markTableClean
} = require("../controllers/tableController");

router.post("/:restaurantId", protect, createTable);
router.get("/:restaurantId", protect, getTables);
router.patch("/:id/status", protect, updateTableStatus);
router.patch("/:id/clean", protect, markTableClean);

module.exports = router;