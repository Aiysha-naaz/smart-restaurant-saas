const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  restaurantId: {
    type: String,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subscription: {
    type: String,
    enum: ["free", "premium"],
    default: "free"
  }
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);