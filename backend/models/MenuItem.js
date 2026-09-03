// import mongoose from "mongoose";

// const MenuItemSchema = new mongoose.Schema(
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

//     description: String,

//     price: {
//       type: Number,
//       required: true,
//     },

//     category: {
//       type: String,
//       enum: ["starter", "main", "dessert", "drinks"],
//       required: true,
//     },

//     image: String,

//     available: {
//       type: Boolean,
//       default: true,
//     },

//     tags: [String],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("MenuItem", MenuItemSchema);




// //wroking

// const mongoose = require("mongoose");

// const menuItemSchema = new mongoose.Schema(
//   {
//     restaurantId: {
//       type: String,
//       required: true,
//       index: true,
//     },

//     name: { type: String, required: true },

//     price: { type: Number, required: true },

//     category: { type: String, required: true },

//     image: { type: String }, // REAL IMAGE URL

//     available: { type: Boolean, default: true },

//     tags: [String],

//     // 🍽️ MENU INGREDIENTS (NO INVENTORY LINK YET - STEP 2)
//     ingredients: [
//       {
//         name: String,
//         quantity: Number,
//         unit: String,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("MenuItem", menuItemSchema);




const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity must be positive"],
  },

  unit: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
});

const menuItemSchema = new mongoose.Schema(
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

    price: {
      type: Number,
      required: true,
      min: [0, "Price must be positive"],
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    available: {
      type: Boolean,
      default: true,
    },

    tags: [String],

    ingredients: [ingredientSchema],
  },
  { timestamps: true }
);

// ✅ Prevent duplicate menu items
menuItemSchema.index(
  { restaurantId: 1, name: 1 },
  { unique: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);