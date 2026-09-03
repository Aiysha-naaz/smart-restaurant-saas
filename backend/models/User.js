const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,

  // ✅ FIXED (IMPORTANT)
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);