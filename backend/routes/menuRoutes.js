// // const express = require("express");
// // const router = express.Router();

// // const {
// //   createMenuItem,
// //   getMenuByRestaurant,
// //   updateMenuItem,
// //   deleteMenuItem,
// // } = require("../controllers/menuController");

// // // router.post("/", createMenuItem);
// // // router.get("/:restaurantId", getMenuByRestaurant);
// // // router.put("/:id", updateMenuItem);
// // // router.delete("/:id", deleteMenuItem);




// const express = require("express");
// const router = express.Router();

// const {
//   createMenuItem,
//   getMenuByRestaurant,
//   updateMenuItem,
//   deleteMenuItem,
// } = require("../controllers/menuController");

// const { protect } = require("../middleware/authMiddleware");

// router.post("/", protect, createMenuItem);
// router.get("/:restaurantId", getMenuByRestaurant); // keep public if customers view menu without login
// router.put("/:id", protect, updateMenuItem);
// router.delete("/:id", protect, deleteMenuItem);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createMenuItem,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

router.get("/:restaurantId", getMenuByRestaurant); // public - customers view menu
router.post("/", protect, createMenuItem);
router.put("/:id", protect, updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

module.exports = router;