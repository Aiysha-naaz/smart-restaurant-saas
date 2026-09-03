
// ➕ Add Item
// exports.addInventoryItem = async (req, res) => {
//   try {
//     const { name, quantity, unit, costPerUnit, threshold } = req.body;

//     const item = new Inventory({
//       restaurantId: req.user.restaurantId, // from auth middleware
//       name,
//       quantity,
//       unit,
//       costPerUnit,
//       threshold,
//     });

//     await item.save();

//     res.status(201).json({
//       success: true,
//       data: item,
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// exports.addInventoryItem = async (req, res) => {
//   try {
//     const { name, quantity, unit, costPerUnit, threshold } = req.body;

//     // 🚫 DUPLICATE CHECK (backend)
//     const existing = await Inventory.findOne({
//       name: name.trim(),
//       unit,
//       restaurantId: req.user.restaurantId
//     });

//     if (existing) {
//       return res.status(400).json({
//         message: "Item already exists"
//       });
//     }

//     const item = new Inventory({
//       restaurantId: req.user.restaurantId,
//       name: name.trim(),
//       quantity,
//       unit,
//       costPerUnit,
//       threshold,
//     });

//     await item.save();

//     res.status(201).json({
//       success: true,
//       data: item,
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// exports.addInventoryItem = async (req, res) => {
//   try {
//     let { name, quantity, unit, costPerUnit, threshold } = req.body;

//     // ✅ NORMALIZE
//     name = name.trim().toLowerCase();
//     unit = unit.trim().toLowerCase();

//     // 🚫 DUPLICATE CHECK (strong)
//     const existing = await Inventory.findOne({
//       name,
//       unit,
//       restaurantId: req.user.restaurantId
//     });

//     if (existing) {
//       return res.status(400).json({
//         message: "Item already exists"
//       });
//     }

//     const item = new Inventory({
//       restaurantId: req.user.restaurantId,
//       name,
//       quantity,
//       unit,
//       costPerUnit,
//       threshold,
//     });

//     await item.save();

//     res.status(201).json({
//       success: true,
//       data: item,
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// // ➕ ADD ITEM
// exports.addInventoryItem = async (req, res) => {
//   try {
//     let { name, quantity, unit, costPerUnit, threshold } = req.body;

//     name = name.trim().toLowerCase();
//     unit = unit.trim().toLowerCase();

//     const existing = await Inventory.findOne({
//       name,
//       unit,
//       restaurantId: req.user.restaurantId,
//     });

//     if (existing) {
//       return res.status(400).json({
//         message: "Item already exists",
//       });
//     }

//     const item = new Inventory({
//       restaurantId: req.user.restaurantId,
//       name,
//       quantity,
//       unit,
//       costPerUnit,
//       threshold,
//     });

//     await item.save();

//     res.status(201).json({
//       success: true,
//       data: item,
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



const Inventory = require("../models/Inventory");
const updateMenuAvailability = require("../utils/updateMenuAvailability");


// //working
// exports.addInventoryItem = async (req, res) => {
//   try {
//     let { name, quantity, unit, costPerUnit, threshold } = req.body;

//     if (!name || !unit) {
//       return res.status(400).json({ message: "Name and unit required" });
//     }

//     if (quantity < 0 || costPerUnit < 0) {
//       return res.status(400).json({
//         message: "Quantity and cost must be positive",
//       });
//     }

//     name = name.trim().toLowerCase();
//     unit = unit.trim().toLowerCase();

//     const existing = await Inventory.findOne({
//       name,
//       unit,
//       restaurantId: req.user.restaurantId,
//     });

//     if (existing) {
//       return res.status(400).json({
//         message: "Item already exists",
//       });
//     }

//     const item = new Inventory({
//       restaurantId: req.user.restaurantId,
//       name,
//       quantity,
//       unit,
//       costPerUnit,
//       threshold,
//     });

//     await item.save();
//     await updateMenuAvailability(
//   item.restaurantId,
//   item.name,
//   item.quantity
// );

//     res.status(201).json({
//       success: true,
//       data: item,
//     });

//   } catch (err) {
//     // ✅ Handle duplicate index error
//     if (err.code === 11000) {
//       return res.status(400).json({ message: "Duplicate inventory item" });
//     }

//     res.status(500).json({ message: err.message });
//   }
// };



exports.addInventoryItem = async (req, res) => {
  try {
    let { name, quantity, unit, costPerUnit, threshold } = req.body;

    if (!name || !unit) {
      return res.status(400).json({ message: "Name and unit required" });
    }

    name = name.trim().toLowerCase();
    unit = unit.trim().toLowerCase();

    const existing = await Inventory.findOne({
      name,
      unit,
      restaurantId: req.user.restaurantId,
    });

    if (existing) {
      return res.status(400).json({ message: "Item already exists" });
    }

    const item = new Inventory({
      restaurantId: req.user.restaurantId,
      name,
      quantity,
      unit,
      costPerUnit,
      threshold,
    });

    await item.save();

    // ✅ FIXED CALL
    await updateMenuAvailability(req.user.restaurantId);

    res.status(201).json({
      success: true,
      data: item,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// // 📄 Get Items
// exports.getInventoryItems = async (req, res) => {
// //   try {
// //     // const items = await Inventory.find({
// //     //   restaurantId: req.user.restaurantId,
// //     // });
// //     const items = await Inventory.find({
// //   restaurantId: req.params.restaurantId,
// // });
// try {
//     const items = await Inventory.find({
//       restaurantId: req.user.restaurantId,
//     });

//     res.json({
//       success: true,
//       data: items,
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


exports.getInventoryItems = async (req, res) => {
  try {
    const items = await Inventory.find({
      restaurantId: req.user.restaurantId,
    });

    res.json({
      success: true,
      data: items,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// exports.updateItem = async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     if (item.restaurantId.toString() !== req.user.restaurantId.toString()) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     item.name = req.body.name;
//     item.quantity = req.body.quantity;
//     item.unit = req.body.unit;
//     item.costPerUnit = req.body.costPerUnit;
//     item.threshold = req.body.threshold;

//     const updatedItem = await item.save();

//     res.json({ success: true, data: updatedItem });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// exports.updateItem = async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     if (item.restaurantId.toString() !== req.user.restaurantId.toString()) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

// //     if (item.restaurantId.toString() !== req.body.restaurantId.toString()) {
// //   return res.status(401).json({ message: "Not authorized" });
// // }

//     // ✅ NORMALIZE AGAIN (VERY IMPORTANT)
//     if (req.body.name) item.name = req.body.name.trim().toLowerCase();
//     if (req.body.unit) item.unit = req.body.unit.trim().toLowerCase();

//     if (req.body.quantity !== undefined) item.quantity = req.body.quantity;
//     if (req.body.costPerUnit !== undefined) item.costPerUnit = req.body.costPerUnit;
//     if (req.body.threshold !== undefined) item.threshold = req.body.threshold;

//     const updatedItem = await item.save();

//     res.json({ success: true, data: updatedItem });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




// //working
// exports.updateItem = async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     if (item.restaurantId.toString() !== req.user.restaurantId.toString()) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     if (req.body.name) item.name = req.body.name.trim().toLowerCase();
//     if (req.body.unit) item.unit = req.body.unit.trim().toLowerCase();

//     if (req.body.quantity !== undefined) {
//       if (req.body.quantity < 0) {
//         return res.status(400).json({ message: "Quantity cannot be negative" });
//       }
//       item.quantity = req.body.quantity;
//     }

//     if (req.body.costPerUnit !== undefined) {
//       if (req.body.costPerUnit < 0) {
//         return res.status(400).json({ message: "Invalid cost" });
//       }
//       item.costPerUnit = req.body.costPerUnit;
//     }

//     if (req.body.threshold !== undefined) {
//       if (req.body.threshold < 0) {
//         return res.status(400).json({ message: "Invalid threshold" });
//       }
//       item.threshold = req.body.threshold;
//     }

//     const updatedItem = await item.save();
//     await updateMenuAvailability(
//   item.restaurantId,
//   item.name,
//   item.quantity
// );

//     res.json({ success: true, data: updatedItem });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



exports.updateItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.restaurantId.toString() !== req.user.restaurantId.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (req.body.name) item.name = req.body.name.trim().toLowerCase();
    if (req.body.unit) item.unit = req.body.unit.trim().toLowerCase();

    if (req.body.quantity !== undefined) {
      item.quantity = req.body.quantity;
    }

    if (req.body.costPerUnit !== undefined) {
      item.costPerUnit = req.body.costPerUnit;
    }

    if (req.body.threshold !== undefined) {
      item.threshold = req.body.threshold;
    }

    const updatedItem = await item.save();

    // 🔥 IMPORTANT: trigger availability check
    await updateMenuAvailability(
      updatedItem.restaurantId,
      updatedItem.name,
      updatedItem.unit,
      updatedItem.quantity
    );

    res.json({ success: true, data: updatedItem });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// exports.deleteItem = async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     if (item.restaurantId !== req.user.restaurantId) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     await item.deleteOne();

//     res.json({ success: true, message: "Item deleted" });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// exports.deleteInventoryItem = async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id);
//     console.log("REQ.USER:", req.user);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     // ✅ FIXED comparison
//     if (item.restaurantId.toString() !== req.user.restaurantId.toString()) {
//       return res.status(401).json({ message: "Not authorized" });
//     }
// //     if (item.restaurantId.toString() !== req.body.restaurantId.toString()) {
// //   return res.status(401).json({ message: "Not authorized" });
// // }

//     await item.deleteOne(); // OR findByIdAndDelete

//     res.json({
//       success: true,
//       message: "Item deleted permanently"
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


exports.deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.restaurantId.toString() !== req.user.restaurantId.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await item.deleteOne();

    res.json({
      success: true,
      message: "Item deleted permanently",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};