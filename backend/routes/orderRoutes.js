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


const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getDashboardKPIs,
  getAnalytics
} = require("../controllers/orderController");

router.post("/", createOrder);

// router.get("/dashboard/orders", getDashboardOrders);

router.get("/kpis/:restaurantId", getDashboardKPIs);
router.get("/analytics/:restaurantId", getAnalytics);


router.get("/:restaurantId", getOrders);

// ✅ THIS IS MISSING OR WRONG IN YOUR CASE
// router.patch("/:id/status", updateOrderStatus);
router.patch("/status/:id", updateOrderStatus);


module.exports = router;