// const mongoose = require("mongoose");

// const inventorySchema = new mongoose.Schema(
//   {
//     restaurantId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Restaurant",
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     unit: {
//       type: String,
//       required: true,
//     },
//     costPerUnit: {
//       type: Number,
//       required: true,
//     },
//     threshold: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Inventory", inventorySchema);






//working
// const mongoose = require("mongoose");

// const inventorySchema = new mongoose.Schema(
//   {
//     restaurantId: {
//       type: String,
//       required: true,
//       index: true,
//     },

//     name: {
//       type: String,
//       required: true,
//     },

//     quantity: {
//       type: Number,
//       required: true,
//     },

//     unit: {
//       type: String,
//       required: true,
//     },

//     costPerUnit: {
//       type: Number,
//       required: true,
//     },

//     threshold: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Inventory", inventorySchema);




const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"], // ✅ FIX
    },

    unit: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    costPerUnit: {
      type: Number,
      required: true,
      min: [0, "Cost must be positive"], // ✅ FIX
    },

    threshold: {
      type: Number,
      default: 0,
      min: [0, "Threshold cannot be negative"], // ✅ FIX
    },
  },
  { timestamps: true }
);

// ✅ STRONG DUPLICATE PROTECTION (DB LEVEL)
inventorySchema.index(
  { restaurantId: 1, name: 1, unit: 1 },
  { unique: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);