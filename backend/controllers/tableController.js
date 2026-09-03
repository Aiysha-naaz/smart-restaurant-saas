const Table = require("../models/Table");

/* =========================
   CREATE TABLE
========================= */
exports.createTable = async (req, res) => {
  try {
    const { number } = req.body;

    const table = await Table.create({
      restaurantId: req.params.restaurantId,
      number: Number(number), // 🔥 force number
      status: "available",
      guests: 0,
    });

    res.json(table);
  } catch (err) {
    console.log("CREATE TABLE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET TABLES
========================= */
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find({
      restaurantId: req.params.restaurantId,
    }).sort({ number: 1 });

    res.json(tables);
  } catch (err) {
    console.log("GET TABLES ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE TABLE STATUS (MANUAL)
========================= */
exports.updateTableStatus = async (req, res) => {
  try {
    const { status, guests } = req.body;

    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    table.status = status || table.status;
    table.guests = guests ?? table.guests;

    await table.save();

    res.json({
      message: "Table updated",
      table,
    });
  } catch (err) {
    console.log("UPDATE TABLE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
// MARK TABLE AS CLEANED
exports.markTableClean = async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      {
        status: "available",
        guests: 0,
      },
      { new: true }
    );

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.json({
      message: "Table marked as cleaned",
      table,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};