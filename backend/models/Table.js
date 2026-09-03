const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "occupied", "cleaning"],
      default: "available",
    },
    guests: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);