const express = require("express");
const router = express.Router();

const {
  createTable,
  getTables,
  updateTableStatus,
  markTableClean
} = require("../controllers/tableController");

// CREATE TABLE
router.post("/:restaurantId", createTable);

// GET ALL TABLES
router.get("/:restaurantId", getTables);

// UPDATE TABLE STATUS
router.patch("/:id/status", updateTableStatus);
router.patch("/:id/clean", markTableClean);

module.exports = router;