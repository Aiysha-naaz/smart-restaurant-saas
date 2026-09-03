require("dotenv").config();
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

const MONGO_URI = process.env.MONGO_URI;

const run = async () => {
  try {
    console.log("⏳ Connecting...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to DB");

    const count = await MenuItem.countDocuments();
    console.log("📦 Total menu items:", count);

    const items = await MenuItem.find();
    console.log("🍕 ALL ITEMS:");
    console.log(JSON.stringify(items, null, 2));

    await MenuItem.updateMany(
      { restaurantId: "rest_1" },
      { $set: { restaurantId: "69dd0315fdbaf1fc3e305eb7" } }
    );

    process.exit();
  } catch (err) {
    console.log("❌ ERROR:", err);
    process.exit(1);
  }
};

run();