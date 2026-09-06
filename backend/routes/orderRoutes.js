// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   getOrders,
// } = require("../controllers/orderController");

// router.post("/", createOrder);
// router.get("/:restaurantId", getOrders);

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   getOrders,
// } = require("../controllers/orderController");

// router.post("/", createOrder);
// router.get("/:restaurantId", getOrders);

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   getOrders,
// } = require("../controllers/orderController");

// // CREATE ORDER
// router.post("/", createOrder);

// // GET ORDERS
// router.get("/:restaurantId", getOrders);
// router.get("/dashboard/orders", getDashboardOrders);

// module.exports = router;



// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   getOrders,
//   getDashboardOrders,
//   getAnalytics   
// } = require("../controllers/orderController");


// // =========================
// // DASHBOARD ROUTE (MUST BE FIRST)
// // =========================
// router.get("/dashboard/orders", getDashboardOrders);


// // =========================
// // CREATE ORDER
// // =========================
// router.post("/", createOrder);


// // =========================
// // GET ORDERS BY RESTAURANT
// // =========================
// router.get("/:restaurantId", getOrders);
// // router.get("/analytics/:restaurantId", getAnalytics);

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   getOrders,
//   getOrderById,
//   updateOrderStatus,
//   getDashboardKPIs,
//   getAnalytics
// } = require("../controllers/orderController");

// router.post("/", createOrder);

// router.get("/kpis/:restaurantId", getDashboardKPIs);
// router.get("/analytics/:restaurantId", getAnalytics);
// router.get("/order/:orderId", getOrderById);

// router.get("/:restaurantId", getOrders);

// router.patch("/status/:id", updateOrderStatus);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getDashboardKPIs,
  getAnalytics
} = require("../controllers/orderController");

router.post("/", createOrder); // public - customers place orders
router.get("/order/:orderId", getOrderById); // public - customers check status

router.get("/kpis/:restaurantId", protect, getDashboardKPIs);
router.get("/analytics/:restaurantId", protect, getAnalytics);
router.get("/:restaurantId", protect, getOrders);
router.patch("/status/:id", protect, updateOrderStatus);

module.exports = router;