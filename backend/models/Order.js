// const mongoose = require("mongoose");

// const orderItemSchema = new mongoose.Schema({
//   name: String,
//   qty: Number,
//   price: Number,   // selling price
//   cost: Number,    // calculated later
//   profit: Number,  // calculated later
// });

// const orderSchema = new mongoose.Schema(
//   {
//     restaurantId: {
//       type: String,
//       required: true,
//     },

//     tableId: {
//       type: String,
//       required: true,
//     },

//     items: [orderItemSchema],

//     totalAmount: Number,
//     totalCost: Number,
//     totalProfit: Number,

//     status: {
//       type: String,
//       enum: ["pending", "preparing", "completed"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);






// const mongoose = require("mongoose");

// const orderItemSchema = new mongoose.Schema({
//   menuItemId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "MenuItem",
//   },

//   name: String,
//   qty: Number,

//   unitPrice: Number,   // price per item
//   totalCost: Number,   // total cost for qty
//   totalProfit: Number, // total profit for qty

//   breakdown: [
//     {
//       ingredient: String,
//       usedQty: Number,
//       cost: Number,
//     },
//   ],
// });

// const orderSchema = new mongoose.Schema(
//   {
//     restaurantId: {
//       type: String,
//       required: true,
//     },

//     tableId: {
//       type: String,
//       required: true,
//     },

//     items: [orderItemSchema],

//     totalAmount: Number,
//     totalCost: Number,
//     totalProfit: Number,

//     status: {
//       type: String,
//       enum: ["pending", "accepted", "preparing", "ready", "served", "completed"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);









const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
  },

  name: String,
  qty: Number,

  unitPrice: Number,
  totalPrice: Number,

  unitCost: Number,
  totalCost: Number,

  profit: Number,

  breakdown: [
    {
      ingredient: String,
      usedQty: Number,
      cost: Number,
    },
  ],
});

const orderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      required: true,
    },

    tableId: {
      type: String,
      required: true,
    },

    items: [orderItemSchema],

    totalAmount: Number,

    // 🧠 Step 1 (calculated at order time)
    estimatedCost: Number,
    estimatedProfit: Number,

    // 🧠 Step 3 (final truth after completion)
    finalCost: Number,
    finalProfit: Number,

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "preparing",
        "ready",
        "served",
        "completed",
        "cancelled"
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

const sessionSchema = new mongoose.Schema(
  {
    restaurantId: String,
    tableId: String,

    status: {
      type: String,
      enum: ["active", "idle", "ready_to_close", "closed"],
      default: "active"
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      }
    ],

    totalAmount: { type: Number, default: 0 },
    totalCost: { type: Number, default: 0 },
    totalProfit: { type: Number, default: 0 },

    lastActivityAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);