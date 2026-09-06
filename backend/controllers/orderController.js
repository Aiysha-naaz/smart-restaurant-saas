// // const Order = require("../models/Order");
// // const MenuItem = require("../models/MenuItem");
// // const Inventory = require("../models/Inventory");

// // // ➕ CREATE ORDER
// // exports.createOrder = async (req, res) => {
// //   try {
// //     const { restaurantId, tableId, items } = req.body;

// //     let totalAmount = 0;
// //     let totalCost = 0;
// //     let totalProfit = 0;

// //     const processedItems = [];

// //     for (let item of items) {
// //       // 1️⃣ Get menu item
// //       const menuItem = await MenuItem.findOne({
// //         name: item.name,
// //         restaurantId,
// //       });

// //       if (!menuItem) {
// //         return res.status(404).json({
// //           message: `Menu item ${item.name} not found`,
// //         });
// //       }

// //       let itemCost = 0;

// //       // 2️⃣ Calculate cost from ingredients
// //       // for (let ing of menuItem.ingredients) {
// //       //   const inv = await Inventory.findOne({
// //       //     name: ing.name,
// //       //     restaurantId,
// //       //   });

// //       //   if (!inv) continue;

// //       //   const cost = ing.quantity * inv.costPerUnit;
// //       //   itemCost += cost;

// //       //   // 3️⃣ Deduct inventory
// //       //   inv.quantity -= ing.quantity * item.qty;
// //       //   await inv.save();

// //       //   // ⚠️ Auto disable if out of stock
// //       //   if (inv.quantity <= 0) {
// //       //     await MenuItem.updateMany(
// //       //       { "ingredients.name": ing.name },
// //       //       { available: false }
// //       //     );
// //       //   }
// //       // }


// //       for (let ing of menuItem.ingredients) {
// //   console.log("Ingredient:", ing);

// //   const inv = await Inventory.findOne({
// //     name: ing.name,
// //     restaurantId,
// //   });

// //   console.log("Inventory:", inv);

// //   if (!inv) {
// //     console.log("❌ Inventory NOT FOUND for", ing.name);
// //     continue;
// //   }

// //   const cost = ing.quantity * inv.costPerUnit;
// //   itemCost += cost;

// //   inv.quantity -= ing.quantity * item.qty;
// //   await inv.save();
// // }

// //       const itemTotalCost = itemCost * item.qty;
// //       const itemTotalPrice = menuItem.price * item.qty;
// //       const itemProfit = itemTotalPrice - itemTotalCost;

// //       totalAmount += itemTotalPrice;
// //       totalCost += itemTotalCost;
// //       totalProfit += itemProfit;

// //       processedItems.push({
// //         name: menuItem.name,
// //         qty: item.qty,
// //         price: menuItem.price,
// //         cost: itemCost,
// //         profit: menuItem.price - itemCost,
// //       });
// //     }

// //     // 4️⃣ Save order
// //     const order = new Order({
// //       restaurantId,
// //       tableId,
// //       items: processedItems,
// //       totalAmount,
// //       totalCost,
// //       totalProfit,
// //     });

// //     const saved = await order.save();

// //     res.json(saved);
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // 📥 GET ORDERS
// // exports.getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({
// //       restaurantId: req.params.restaurantId,
// //     }).sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };





// // const Order = require("../models/Order");
// // const MenuItem = require("../models/MenuItem");
// // const Inventory = require("../models/Inventory");

// // // ➕ CREATE ORDER
// // exports.createOrder = async (req, res) => {
// //   try {
// //     const restaurantId = "69dd0315fdbaf1fc3e305eb7";
// //     const { restaurantId, tableId, items } = req.body;

// //     let totalAmount = 0;
// //     let totalCost = 0;
// //     let totalProfit = 0;

// //     const processedItems = [];

// //     for (let item of items) {
// //       // 1️⃣ Get menu item
// //       const menuItem = await MenuItem.findOne({
// //         name: item.name,
// //         restaurantId,
// //       });

// //       if (!menuItem) {
// //         return res.status(404).json({
// //           message: `Menu item ${item.name} not found`,
// //         });
// //       }
// // console.log("REQ restaurantId:", restaurantId);
// // const allInventory = await Inventory.find({});
// // console.log("Inventory docs:", allInventory);
// //       let itemCostPerUnit = 0;
// //       const breakdown = [];

// //       // 2️⃣ Calculate cost from ingredients
// //       for (let ing of menuItem.ingredients) {
// //       const inv = await Inventory.findOne({
// //   restaurantId,
// //   name: { $regex: `^${ing.name}$`, $options: "i" },
// // });
// // console.log("Searching for:", ing.name);

// //         if (!inv) {
// //           console.log("❌ Inventory NOT FOUND for", ing.name);
// //           continue;
// //         }

// //         // ⚠️ Ensure units match (basic assumption for now)
// //         const cost = ing.quantity * inv.costPerUnit;
// //         itemCostPerUnit += cost;

// //         breakdown.push({
// //           ingredient: ing.name,
// //           cost,
// //         });

// //         // 3️⃣ STOCK CHECK
// //         const requiredQty = ing.quantity * item.qty;

// //         if (inv.quantity < requiredQty) {
// //           console.log("⚠️ Not enough stock for", ing.name);
// //         }

// //         // 4️⃣ Deduct inventory
// //         inv.quantity -= requiredQty;
// //         await inv.save();

// //         // 5️⃣ Auto disable items if out of stock
// //         if (inv.quantity <= 0) {
// //           await MenuItem.updateMany(
// //             {
// //               restaurantId,
// //               "ingredients.name": ing.name,
// //             },
// //             { available: false }
// //           );
// //         }
// //       }

// //       // 6️⃣ Final calculations
// //       const itemTotalCost = itemCostPerUnit * item.qty;
// //       const itemTotalPrice = menuItem.price * item.qty;
// //       const itemProfit = itemTotalPrice - itemTotalCost;

// //       totalAmount += itemTotalPrice;
// //       totalCost += itemTotalCost;
// //       totalProfit += itemProfit;

// //       // 7️⃣ Store processed item
// //       processedItems.push({
// //         name: menuItem.name,
// //         qty: item.qty,
// //         price: menuItem.price,
// //         cost: itemTotalCost,     // ✅ FIXED
// //         profit: itemProfit,      // ✅ FIXED
// //         costBreakdown: breakdown // 🚀 BONUS
// //       });
// //     }

// //     // 8️⃣ Save order
// //     const order = new Order({
// //       restaurantId,
// //       tableId,
// //       items: processedItems,
// //       totalAmount,
// //       totalCost,
// //       totalProfit,
// //     });

// //     const saved = await order.save();

// //     res.json(saved);
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // 📥 GET ORDERS
// // exports.getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({
// //       restaurantId: req.params.restaurantId,
// //     }).sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };


// // const Order = require("../models/Order");
// // const MenuItem = require("../models/MenuItem");
// // const Inventory = require("../models/Inventory");

// // // ➕ CREATE ORDER
// // exports.createOrder = async (req, res) => {
// //   try {
// //     // ✅ FIXED restaurantId (same as inventory)
// //    const restaurantId = req.user.restaurantId;

// //     // ✅ removed duplicate restaurantId
// //     const { tableId, items } = req.body;

// //     let totalAmount = 0;
// //     let totalCost = 0;
// //     let totalProfit = 0;

// //     const processedItems = [];

// //     for (let item of items) {
// //       // 1️⃣ Get menu item
// //       const menuItem = await MenuItem.findOne({
// //   restaurantId,
// //   name: { $regex: `^${item.name}$`, $options: "i" },
// // });

// //       if (!menuItem) {
// //         return res.status(404).json({
// //           message: `Menu item ${item.name} not found`,
// //         });
// //       }

// //       console.log("REQ restaurantId:", restaurantId);
// //       const allInv = await Inventory.find({ restaurantId });
// // console.log("ALL INVENTORY:", allInv.map(i => i.name));

// //       let itemCostPerUnit = 0;
// //       const breakdown = [];

// //       // 2️⃣ Calculate cost from ingredients
// //       for (let ing of menuItem.ingredients) {
// //         console.log("Searching for:", ing.name);

// //         const inv = await Inventory.findOne({
// //   restaurantId,
// //   name: ing.name.trim().toLowerCase(),
// // });

// //         if (!inv) {
// //           console.log("❌ Inventory NOT FOUND for", ing.name);
// //           continue;
// //         }

// //         console.log("✅ Found:", inv.name);

// //         const cost = ing.quantity * inv.costPerUnit;
// //         itemCostPerUnit += cost;

// //         breakdown.push({
// //           ingredient: ing.name,
// //           cost,
// //         });

// //         // 3️⃣ STOCK CHECK
// //         const requiredQty = ing.quantity * item.qty;

// //         if (inv.quantity < requiredQty) {
// //           console.log("⚠️ Not enough stock for", ing.name);
// //         }

// //         // 4️⃣ Deduct inventory
// //         inv.quantity -= requiredQty;
// //         await inv.save();

// //         // 5️⃣ Auto disable menu item if ingredient finished
// //         if (inv.quantity <= 0) {
// //           await MenuItem.updateMany(
// //             {
// //               restaurantId,
// //               "ingredients.name": ing.name,
// //             },
// //             { available: false }
// //           );
// //         }
// //       }

// //       // 6️⃣ Final calculations
// //       const itemTotalCost = itemCostPerUnit * item.qty;
// //       const itemTotalPrice = menuItem.price * item.qty;
// //       const itemProfit = itemTotalPrice - itemTotalCost;

// //       totalAmount += itemTotalPrice;
// //       totalCost += itemTotalCost;
// //       totalProfit += itemProfit;

// //       // 7️⃣ Store processed item
// //       processedItems.push({
// //         name: menuItem.name,
// //         qty: item.qty,
// //         price: menuItem.price,
// //         cost: itemTotalCost,     // ✅ correct total cost
// //         profit: itemProfit,      // ✅ correct total profit
// //         costBreakdown: breakdown // 🚀 bonus detail
// //       });
// //     }

// //     // 8️⃣ Save order
// //     const order = new Order({
// //       restaurantId,
// //       tableId,
// //       items: processedItems,
// //       totalAmount,
// //       totalCost,
// //       totalProfit,
// //     });

// //     const saved = await order.save();

// //     res.json(saved);
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // 📥 GET ORDERS
// // exports.getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({
// //       restaurantId: req.params.restaurantId,
// //     }).sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };
// // controllers/orderController.js (FULLY OPTIMIZED VERSION)






// //working

// // const Order = require("../models/Order");
// // const MenuItem = require("../models/MenuItem");
// // const Inventory = require("../models/Inventory");

// // // helper
// // const normalize = (str) => str?.trim()?.toLowerCase();

// // // ➕ CREATE ORDER
// // exports.createOrder = async (req, res) => {
// //   try {
// //     // ✅ USE SAME restaurantId EVERYWHERE
// //     const { restaurantId, tableId, items } = req.body;

// //     let totalAmount = 0;
// //     let totalCost = 0;
// //     let totalProfit = 0;

// //     const processedItems = [];

// //     for (let item of items) {

// //       // ✅ FIX: normalize menu name
// //       const menuItem = await MenuItem.findOne({
// //         restaurantId,
// //         name: normalize(item.name),
// //       });

// //       if (!menuItem) {
// //         return res.status(404).json({
// //           message: `Menu item '${item.name}' not found`,
// //         });
// //       }

// //       let itemCostPerUnit = 0;
// //       const breakdown = [];

// //       for (let ing of menuItem.ingredients) {
// //         const ingredientName = normalize(ing.name);

// //         // ✅ FIX: exact match with normalized value
// //         const inv = await Inventory.findOne({
// //           restaurantId,
// //           name: ingredientName,
// //         });

// //         if (!inv) {
// //           console.log(`❌ Inventory NOT FOUND for ${ingredientName}`);
// //           continue;
// //         }

// //         // 💰 cost per unit
// //         const cost = ing.quantity * inv.costPerUnit;
// //         itemCostPerUnit += cost;

// //         const requiredQty = ing.quantity * item.qty;

// //         // ⚠️ stock warning
// //         if (inv.quantity < requiredQty) {
// //           console.log(
// //             `⚠️ LOW STOCK: ${ingredientName} required=${requiredQty}, available=${inv.quantity}`
// //           );
// //         }

// //         // 📉 deduct stock
// //         inv.quantity -= requiredQty;
// //         await inv.save();

// //         // 🚫 auto disable menu if out
// //         if (inv.quantity <= 0) {
// //           await MenuItem.updateMany(
// //             {
// //               restaurantId,
// //               "ingredients.name": ingredientName,
// //             },
// //             { available: false }
// //           );
// //         }

// //         breakdown.push({
// //           ingredient: ingredientName,
// //           cost,
// //           usedQty: requiredQty,
// //         });
// //       }

// //       // 📊 totals
// //       const itemTotalCost = itemCostPerUnit * item.qty;
// //       const itemTotalPrice = menuItem.price * item.qty;
// //       const itemProfit = itemTotalPrice - itemTotalCost;

// //       totalAmount += itemTotalPrice;
// //       totalCost += itemTotalCost;
// //       totalProfit += itemProfit;

// //       processedItems.push({
// //   name: menuItem.name,
// //   qty: item.qty,
// //   price: menuItem.price,
// //   cost: itemTotalCost,   // ✅ FIXED
// //   profit: itemProfit,
// //   breakdown,
// // });
// //     }

// //     // 💾 save order
// //     const order = new Order({
// //       restaurantId,
// //       tableId,
// //       items: processedItems,
// //       totalAmount,
// //       totalCost,
// //       totalProfit,
// //     });

// //     const saved = await order.save();

// //     res.json(saved);

// //   } catch (err) {
// //     console.log("ORDER ERROR:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // 📥 GET ORDERS
// // exports.getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({
// //       restaurantId: req.params.restaurantId,
// //     }).sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };





// //working

// // const Order = require("../models/Order");
// // const MenuItem = require("../models/MenuItem");
// // const Inventory = require("../models/Inventory");

// // // helper
// // const normalize = (str) => str?.trim()?.toLowerCase();

// // // ➕ CREATE ORDER
// // exports.createOrder = async (req, res) => {
// //   try {
// //     const { restaurantId, tableId, items } = req.body;

// //     // ✅ Basic validation
// //     if (!restaurantId || !tableId || !items?.length) {
// //       return res.status(400).json({ message: "Invalid order data" });
// //     }

// //     let totalAmount = 0;
// //     let totalCost = 0;
// //     let totalProfit = 0;

// //     const processedItems = [];

// //     for (let item of items) {

// //       const menuItem = await MenuItem.findOne({
// //         restaurantId,
// //         name: normalize(item.name),
// //       });

// //       if (!menuItem) {
// //         return res.status(404).json({
// //           message: `Menu item '${item.name}' not found`,
// //         });
// //       }

// //       let itemCostPerUnit = 0;
// //       const breakdown = [];

// //       for (let ing of menuItem.ingredients) {
// //         const ingredientName = normalize(ing.name);

// //         const inv = await Inventory.findOne({
// //           restaurantId,
// //           name: ingredientName,
// //         });

// //         // ❌ STOP if inventory missing
// //         if (!inv) {
// //           return res.status(400).json({
// //             message: `Ingredient '${ingredientName}' not found in inventory`,
// //           });
// //         }

// //         const requiredQty = ing.quantity * item.qty;

// //         // ❌ STOP if not enough stock
// //         if (inv.quantity < requiredQty) {
// //           return res.status(400).json({
// //             message: `Not enough stock for '${ingredientName}'`,
// //           });
// //         }

// //         // 💰 cost per unit
// //         const costPerUnit = ing.quantity * inv.costPerUnit;
// //         itemCostPerUnit += costPerUnit;

// //         // 📉 deduct stock (keeping your logic)
// //         inv.quantity -= requiredQty;
// //         await inv.save();

// //         // 🚫 disable menu if ingredient insufficient
// //         if (inv.quantity < ing.quantity) {
// //           await MenuItem.updateMany(
// //             {
// //               restaurantId,
// //               "ingredients.name": ingredientName,
// //             },
// //             { available: false }
// //           );
// //         }

// //         breakdown.push({
// //           ingredient: ingredientName,
// //           usedQty: requiredQty,
// //           cost: costPerUnit * item.qty,
// //         });
// //       }

// //       const itemTotalCost = itemCostPerUnit * item.qty;
// //       const itemTotalPrice = menuItem.price * item.qty;
// //       const itemProfit = itemTotalPrice - itemTotalCost;

// //       totalAmount += itemTotalPrice;
// //       totalCost += itemTotalCost;
// //       totalProfit += itemProfit;

// //       processedItems.push({
// //         menuItemId: menuItem._id,
// //         name: menuItem.name,

// //         qty: item.qty,

// //         unitPrice: menuItem.price,
// //         totalCost: itemTotalCost,
// //         totalProfit: itemProfit,

// //         breakdown,
// //       });
// //     }

// //     const order = new Order({
// //       restaurantId,
// //       tableId,
// //       items: processedItems,
// //       totalAmount,
// //       totalCost,
// //       totalProfit,
// //       status: "pending",
// //     });

// //     const saved = await order.save();

// //     res.json(saved);

// //   } catch (err) {
// //     console.log("ORDER ERROR:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // 📥 GET ORDERS
// // exports.getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({
// //       restaurantId: req.params.restaurantId,
// //     }).sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };


// // const Order = require("../models/Order");
// // const MenuItem = require("../models/MenuItem");
// // const Inventory = require("../models/Inventory");
// // const mongoose = require("mongoose");
// // const { body, validationResult } = require("express-validator");

// // // helper
// // const normalize = (str) => str?.trim()?.toLowerCase();

// // /**
// //  * =========================
// //  * ➕ CREATE ORDER (AUTO CONFIRMED)
// //  * =========================
// //  */
// // exports.createOrder = [
// //   body("restaurantId").isMongoId(),
// //   body("tableId").notEmpty(),
// //   body("items").isArray({ min: 1 }),
// //   body("items.*.menuItemId").isMongoId(),
// //   body("items.*.qty").isInt({ min: 1 }),

// //   async (req, res) => {
// //     try {
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         return res.status(400).json({ message: "Validation failed", errors });
// //       }

// //       const { restaurantId, tableId, items } = req.body;

// //       let totalAmount = 0;
// //       let totalCost = 0;
// //       let totalProfit = 0;

// //       const processedItems = [];

// //       for (let item of items) {
// //         const menuItem = await MenuItem.findOne({
// //           _id: item.menuItemId,
// //           restaurantId,
// //         });

// //         if (!menuItem) {
// //           return res.status(404).json({
// //             message: `Menu item not found`,
// //           });
// //         }

// //         let itemCostPerUnit = 0;
// //         const breakdown = [];

// //         // CHECK STOCK ONLY (NO DEDUCTION HERE)
// //         for (let ing of menuItem.ingredients) {
// //           const ingredientName = ing.name.trim().toLowerCase();

// //           const inv = await Inventory.findOne({
// //             restaurantId,
// //             name: ingredientName,
// //           });

// //           if (!inv) {
// //             return res.status(400).json({
// //               message: `Ingredient '${ingredientName}' not found`,
// //             });
// //           }

// //           const requiredQty = ing.quantity * item.qty;

// //           if (inv.quantity < requiredQty) {
// //             return res.status(400).json({
// //               message: `Not enough stock for '${ingredientName}'`,
// //             });
// //           }

// //           const ingredientCost = ing.quantity * inv.costPerUnit;
// //           itemCostPerUnit += ingredientCost;

// //           breakdown.push({
// //             ingredient: ingredientName,
// //             requiredQty,
// //             costPerUnit: inv.costPerUnit,
// //             estimatedCost: ingredientCost * item.qty,
// //           });
// //         }

// //         const itemTotalCost = itemCostPerUnit * item.qty;
// //         const itemTotalPrice = menuItem.price * item.qty;
// //         const itemProfit = itemTotalPrice - itemTotalCost;

// //         totalAmount += itemTotalPrice;
// //         totalCost += itemTotalCost;
// //         totalProfit += itemProfit;

// //         processedItems.push({
// //           menuItemId: menuItem._id,
// //           name: menuItem.name,
// //           qty: item.qty,
// //           unitPrice: menuItem.price,
// //           totalPrice: itemTotalPrice,
// //           unitCost: itemCostPerUnit,
// //           totalCost: itemTotalCost,
// //           profit: itemProfit,
// //           breakdown,
// //           category: menuItem.category || "general",
// //         });
// //       }

// //       const order = new Order({
// //         restaurantId,
// //         tableId,
// //         items: processedItems,
// //         totalAmount,
// //         totalCost,
// //         totalProfit,

// //         // 🔥 AUTO CONFIRMED (NO MANUAL STEP)
// //         status: "confirmed",

// //         createdAt: new Date(),
// //       });

// //       const saved = await order.save();

// //       res.status(201).json({
// //         message: "Order placed successfully",
// //         order: saved,
// //       });

// //     } catch (err) {
// //       console.log("CREATE ORDER ERROR:", err);
// //       res.status(500).json({ message: err.message });
// //     }
// //   },
// // ];

// // /**
// //  * =========================
// //  * 📥 GET ORDERS
// //  * =========================
// //  */
// // exports.getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({
// //       restaurantId: req.params.restaurantId,
// //     }).sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };












// // //step 1

// // const Order = require("../models/Order");
// // const MenuItem = require("../models/MenuItem");
// // const Inventory = require("../models/Inventory");
// // const { body, validationResult } = require("express-validator");

// // exports.createOrder = [
// //   body("restaurantId").isMongoId(),
// //   body("tableId").notEmpty(),
// //   body("items").isArray({ min: 1 }),
// //   body("items.*.menuItemId").isMongoId(),
// //   body("items.*.qty").isInt({ min: 1 }),

// //   async (req, res) => {
// //     try {
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         return res.status(400).json({ message: "Validation failed", errors });
// //       }

// //       const { restaurantId, tableId, items } = req.body;

// //       let totalAmount = 0;
// //       let estimatedCost = 0;
// //       let estimatedProfit = 0;

// //       const processedItems = [];

// //       for (let item of items) {
// //         const menuItem = await MenuItem.findOne({
// //           _id: item.menuItemId,
// //           restaurantId,
// //         });

// //         if (!menuItem) {
// //           return res.status(404).json({
// //             message: "Menu item not found",
// //           });
// //         }

// //         let unitCost = 0;
// //         const breakdown = [];

// //         // ✅ ONLY CHECK STOCK (NO DEDUCTION)
// //         for (let ing of menuItem.ingredients) {
// //           const ingredientName = ing.name.trim().toLowerCase();

// //           const inv = await Inventory.findOne({
// //             restaurantId,
// //             name: ingredientName,
// //           });

// //           if (!inv) {
// //             return res.status(400).json({
// //               message: `Ingredient '${ingredientName}' not found`,
// //             });
// //           }

// //           const requiredQty = ing.quantity * item.qty;

// //           if (inv.quantity < requiredQty) {
// //             return res.status(400).json({
// //               message: `Not enough stock for '${ingredientName}'`,
// //             });
// //           }

// //           const cost = requiredQty * inv.costPerUnit;

// //           // cost per single unit of menu item
// //           unitCost += ing.quantity * inv.costPerUnit;

// //           breakdown.push({
// //             ingredient: ingredientName,
// //             usedQty: requiredQty,
// //             cost,
// //           });
// //         }

// //         const unitPrice = menuItem.price;

// //         const totalPrice = unitPrice * item.qty;
// //         const totalItemCost = unitCost * item.qty;
// //         const profit = totalPrice - totalItemCost;

// //         totalAmount += totalPrice;
// //         estimatedCost += totalItemCost;
// //         estimatedProfit += profit;

// //         processedItems.push({
// //           menuItemId: menuItem._id,
// //           name: menuItem.name,

// //           qty: item.qty,

// //           unitPrice,
// //           totalPrice,

// //           unitCost,
// //           totalCost: totalItemCost,

// //           profit,

// //           breakdown,
// //         });
// //       }

// //       const order = new Order({
// //         restaurantId,
// //         tableId,
// //         items: processedItems,

// //         totalAmount,
// //         estimatedCost,
// //         estimatedProfit,

// //         status: "pending",
// //       });

// //       const saved = await order.save();

// //       res.status(201).json({
// //         message: "Order placed successfully",
// //         order: saved,
// //       });

// //     } catch (err) {
// //       console.log("CREATE ORDER ERROR:", err);
// //       res.status(500).json({ message: err.message });
// //     }
// //   },
// // ];



// // exports.getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({
// //       restaurantId: req.params.restaurantId,
// //     }).sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };



// // //step 2
// // const Order = require("../models/Order");
// // const MenuItem = require("../models/MenuItem");
// // const Inventory = require("../models/Inventory");
// // const { body, validationResult } = require("express-validator");


// // // =========================
// // // STEP 1: CREATE ORDER (UNCHANGED LOGIC)
// // // =========================
// // exports.createOrder = [
// //   body("restaurantId").isMongoId(),
// //   body("tableId").notEmpty(),
// //   body("items").isArray({ min: 1 }),
// //   body("items.*.menuItemId").isMongoId(),
// //   body("items.*.qty").isInt({ min: 1 }),

// //   async (req, res) => {
// //     try {
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         return res.status(400).json({ message: "Validation failed", errors });
// //       }

// //       const { restaurantId, tableId, items } = req.body;

// //       let totalAmount = 0;
// //       let estimatedCost = 0;
// //       let estimatedProfit = 0;

// //       const processedItems = [];

// //       for (let item of items) {
// //         const menuItem = await MenuItem.findOne({
// //           _id: item.menuItemId,
// //           restaurantId,
// //         });

// //         if (!menuItem) {
// //           return res.status(404).json({
// //             message: "Menu item not found",
// //           });
// //         }

// //         let unitCost = 0;
// //         const breakdown = [];

// //         // ONLY STOCK CHECK (NO DEDUCTION)
// //         for (let ing of menuItem.ingredients) {
// //           const ingredientName = ing.name.trim().toLowerCase();

// //           const inv = await Inventory.findOne({
// //             restaurantId,
// //             name: ingredientName,
// //           });

// //           if (!inv) {
// //             return res.status(400).json({
// //               message: `Ingredient '${ingredientName}' not found`,
// //             });
// //           }

// //           const requiredQty = ing.quantity * item.qty;

// //           if (inv.quantity < requiredQty) {
// //             return res.status(400).json({
// //               message: `Not enough stock for '${ingredientName}'`,
// //             });
// //           }

// //           const cost = requiredQty * inv.costPerUnit;

// //           unitCost += ing.quantity * inv.costPerUnit;

// //           breakdown.push({
// //             ingredient: ingredientName,
// //             usedQty: requiredQty,
// //             cost,
// //           });
// //         }

// //         const unitPrice = menuItem.price;

// //         const totalPrice = unitPrice * item.qty;
// //         const totalItemCost = unitCost * item.qty;
// //         const profit = totalPrice - totalItemCost;

// //         totalAmount += totalPrice;
// //         estimatedCost += totalItemCost;
// //         estimatedProfit += profit;

// //         processedItems.push({
// //           menuItemId: menuItem._id,
// //           name: menuItem.name,
// //           qty: item.qty,

// //           unitPrice,
// //           totalPrice,

// //           unitCost,
// //           totalCost: totalItemCost,

// //           profit,

// //           breakdown,
// //         });
// //       }

// //       const order = new Order({
// //         restaurantId,
// //         tableId,
// //         items: processedItems,

// //         totalAmount,
// //         estimatedCost,
// //         estimatedProfit,

// //         status: "pending",
// //       });

// //       const saved = await order.save();

// //       res.status(201).json({
// //         message: "Order placed successfully",
// //         order: saved,
// //       });

// //     } catch (err) {
// //       console.log("CREATE ORDER ERROR:", err);
// //       res.status(500).json({ message: err.message });
// //     }
// //   },
// // ];


// // // =========================
// // // STEP 2: STATUS UPDATE ENGINE (NEW)
// // // =========================

// // const allowedTransitions = {
// //   pending: ["accepted"],
// //   accepted: ["preparing"],
// //   preparing: ["ready"],
// //   ready: ["served"],
// //   served: ["completed"]
// // };

// // const canTransition = (from, to) => {
// //   return allowedTransitions[from]?.includes(to);
// // };

// // exports.updateOrderStatus = async (req, res) => {
// //   try {
// //     const { status } = req.body;

// //     const order = await Order.findById(req.params.id);

// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }

// //     // ❌ invalid state change
// //     if (!canTransition(order.status, status)) {
// //       return res.status(400).json({
// //         message: `Invalid transition: ${order.status} → ${status}`
// //       });
// //     }

// //     // 🧠 ONLY STATUS UPDATE (NO INVENTORY YET)
// //     order.status = status;

// //     await order.save();

// //     res.json({
// //       message: "Order status updated",
// //       order
// //     });

// //   } catch (err) {
// //     console.log("STATUS UPDATE ERROR:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// // // =========================
// // // GET ORDERS (UNCHANGED)
// // // =========================
// // exports.getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({
// //       restaurantId: req.params.restaurantId,
// //     }).sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };



// //step 2 pahe 2

// // const Order = require("../models/Order");
// // const MenuItem = require("../models/MenuItem");
// // const Inventory = require("../models/Inventory");
// // const { body, validationResult } = require("express-validator");


// // // =========================
// // // STEP 1: CREATE ORDER (UNCHANGED LOGIC)
// // // =========================
// // exports.createOrder = [
// //   body("restaurantId").isMongoId(),
// //   body("tableId").notEmpty(),
// //   body("items").isArray({ min: 1 }),
// //   body("items.*.menuItemId").isMongoId(),
// //   body("items.*.qty").isInt({ min: 1 }),

// //   async (req, res) => {
// //     try {
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         return res.status(400).json({ message: "Validation failed", errors });
// //       }

// //       const { restaurantId, tableId, items } = req.body;

// //       let totalAmount = 0;
// //       let estimatedCost = 0;
// //       let estimatedProfit = 0;

// //       const processedItems = [];

// //       for (let item of items) {
// //         const menuItem = await MenuItem.findOne({
// //           _id: item.menuItemId,
// //           restaurantId,
// //         });

// //         if (!menuItem) {
// //           return res.status(404).json({
// //             message: "Menu item not found",
// //           });
// //         }

// //         let unitCost = 0;
// //         const breakdown = [];

// //         // ONLY STOCK CHECK (NO DEDUCTION)
// //         for (let ing of menuItem.ingredients) {
// //           const ingredientName = ing.name.trim().toLowerCase();

// //           const inv = await Inventory.findOne({
// //             restaurantId,
// //             name: ingredientName,
// //           });

// //           if (!inv) {
// //             return res.status(400).json({
// //               message: `Ingredient '${ingredientName}' not found`,
// //             });
// //           }

// //           const requiredQty = ing.quantity * item.qty;

// //           if (inv.quantity < requiredQty) {
// //             return res.status(400).json({
// //               message: `Not enough stock for '${ingredientName}'`,
// //             });
// //           }

// //           const cost = requiredQty * inv.costPerUnit;

// //           unitCost += ing.quantity * inv.costPerUnit;

// //           breakdown.push({
// //             ingredient: ingredientName,
// //             usedQty: requiredQty,
// //             cost,
// //           });
// //         }

// //         const unitPrice = menuItem.price;

// //         const totalPrice = unitPrice * item.qty;
// //         const totalItemCost = unitCost * item.qty;
// //         const profit = totalPrice - totalItemCost;

// //         totalAmount += totalPrice;
// //         estimatedCost += totalItemCost;
// //         estimatedProfit += profit;

// //         processedItems.push({
// //           menuItemId: menuItem._id,
// //           name: menuItem.name,
// //           qty: item.qty,

// //           unitPrice,
// //           totalPrice,

// //           unitCost,
// //           totalCost: totalItemCost,

// //           profit,

// //           breakdown,
// //         });
// //       }

// //       const order = new Order({
// //         restaurantId,
// //         tableId,
// //         items: processedItems,

// //         totalAmount,
// //         estimatedCost,
// //         estimatedProfit,

// //         status: "pending",
// //       });

// //       const saved = await order.save();

// //       res.status(201).json({
// //         message: "Order placed successfully",
// //         order: saved,
// //       });

// //     } catch (err) {
// //       console.log("CREATE ORDER ERROR:", err);
// //       res.status(500).json({ message: err.message });
// //     }
// //   },
// // ];


// // // =========================
// // // STEP 2: STATUS ENGINE (WITH INVENTORY LOGIC)
// // // =========================

// // const allowedTransitions = {
// //   pending: ["accepted"],
// //   accepted: ["preparing", "cancelled"],
// //   preparing: ["ready"],
// //   ready: ["served"],
// //   served: ["completed"]
// // };

// // const canTransition = (from, to) => {
// //   return allowedTransitions[from]?.includes(to);
// // };


// // // =========================
// // // INVENTORY DEDUCTION (ON ACCEPTED)
// // // =========================
// // const deductInventory = async (order) => {
// //   for (let item of order.items) {
// //     for (let ing of item.breakdown) {
// //       await Inventory.updateOne(
// //         {
// //           restaurantId: order.restaurantId,
// //           name: ing.ingredient
// //         },
// //         {
// //           $inc: { quantity: -ing.usedQty }
// //         }
// //       );
// //     }
// //   }
// // };


// // // =========================
// // // INVENTORY ROLLBACK (ON CANCELLED)
// // // =========================
// // const rollbackInventory = async (order) => {
// //   for (let item of order.items) {
// //     for (let ing of item.breakdown) {
// //       await Inventory.updateOne(
// //         {
// //           restaurantId: order.restaurantId,
// //           name: ing.ingredient
// //         },
// //         {
// //           $inc: { quantity: ing.usedQty }
// //         }
// //       );
// //     }
// //   }
// // };


// // // =========================
// // // STATUS UPDATE CONTROLLER
// // // =========================
// // exports.updateOrderStatus = async (req, res) => {
// //   try {
// //     const { status, role } = req.body; 
// //     // role = "kitchen" | "waiter" | "manager"

// //     const order = await Order.findById(req.params.id);

// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }

// //     const current = order.status;

// //     // =========================
// //     // VALID TRANSITION MAP
// //     // =========================
// //     const allowedTransitions = {
// //       pending: ["accepted"],
// //       accepted: ["preparing"],
// //       preparing: ["ready"],
// //       ready: ["served"],
// //       served: ["completed"]
// //     };

// //     const canTransition = allowedTransitions[current]?.includes(status);

// //     if (!canTransition) {
// //       return res.status(400).json({
// //         message: `Invalid transition: ${current} → ${status}`
// //       });
// //     }

// //     // =========================
// //     // ROLE-BASED RULES
// //     // =========================

// //     // 🍳 KITCHEN CONTROL
// //     if (status === "preparing" || status === "ready") {
// //       if (role !== "kitchen" && role !== "manager") {
// //         return res.status(403).json({
// //           message: "Only kitchen can update cooking status"
// //         });
// //       }
// //     }

// //     // 👨‍🍽 WAITER CONTROL
// //     if (status === "served") {
// //       if (role !== "waiter" && role !== "manager") {
// //         return res.status(403).json({
// //           message: "Only waiter can mark order as served"
// //         });
// //       }
// //     }

// //     // =========================
// //     // INVENTORY HOOKS (FROM PHASE 2)
// //     // =========================
// //     if (status === "accepted") {
// //       await deductInventory(order);
// //     }

// //     if (status === "cancelled" && current === "accepted") {
// //       await rollbackInventory(order);
// //     }

// //     // =========================
// //     // UPDATE STATUS
// //     // =========================
// //     order.status = status;
// //     await order.save();

// //     res.json({
// //       message: "Order status updated",
// //       order
// //     });

// //   } catch (err) {
// //     console.log("STATUS UPDATE ERROR:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // =========================
// // // GET ORDERS
// // // =========================
// // exports.getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({
// //       restaurantId: req.params.restaurantId,
// //     }).sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// // exports.getDashboardOrders = async (req, res) => {
// //   try {
// //     const { restaurantId, view } = req.query;

// //     let filter = { restaurantId };

// //     // =========================
// //     // 🍳 KITCHEN VIEW
// //     // =========================
// //     if (view === "kitchen") {
// //       filter.status = { $in: ["pending", "accepted", "preparing"] };
// //     }

// //     // =========================
// //     // 👨‍🍽 WAITER VIEW
// //     // =========================
// //     else if (view === "waiter") {
// //       filter.status = { $in: ["ready", "served"] };
// //     }

// //     // =========================
// //     // 👨‍💼 COMPLETED VIEW
// //     // =========================
// //     else if (view === "completed") {
// //       filter.status = "completed";
// //     }

// //     // =========================
// //     // DEFAULT (MANAGER VIEW)
// //     // =========================
// //     else {
// //       filter.status = {
// //         $in: [
// //           "pending",
// //           "accepted",
// //           "preparing",
// //           "ready",
// //           "served",
// //           "completed",
// //           "cancelled"
// //         ]
// //       };
// //     }

// //     const orders = await Order.find(filter)
// //       .sort({ createdAt: -1 });

// //     res.json({
// //       view,
// //       count: orders.length,
// //       orders
// //     });

// //   } catch (err) {
// //     console.log("DASHBOARD ERROR:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// const Order = require("../models/Order");
// const MenuItem = require("../models/MenuItem");
// const Inventory = require("../models/Inventory");
// const { body, validationResult } = require("express-validator");
// const Table = require("../models/Table"); 


// // =========================
// // STEP 1: CREATE ORDER
// // =========================
// exports.createOrder = [
//   body("restaurantId").isMongoId(),
//   body("tableId").notEmpty(),
//   body("items").isArray({ min: 1 }),
//   body("items.*.menuItemId").isMongoId(),
//   body("items.*.qty").isInt({ min: 1 }),

//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ message: "Validation failed", errors });
//       }

//       const { restaurantId, tableId, items } = req.body;

//       let totalAmount = 0;
//       let estimatedCost = 0;
//       let estimatedProfit = 0;

//       const processedItems = [];

//       for (let item of items) {
//         const menuItem = await MenuItem.findOne({
//           _id: item.menuItemId,
//           restaurantId,
//         });

//         if (!menuItem) {
//           return res.status(404).json({ message: "Menu item not found" });
//         }

//         let unitCost = 0;
//         const breakdown = [];

//         // stock check only
//         for (let ing of menuItem.ingredients) {
//           const ingredientName = ing.name.trim().toLowerCase();

//           const inv = await Inventory.findOne({
//             restaurantId,
//             name: ingredientName,
//           });

//           if (!inv) {
//             return res.status(400).json({
//               message: `Ingredient '${ingredientName}' not found`,
//             });
//           }

//           const requiredQty = ing.quantity * item.qty;

//           if (inv.quantity < requiredQty) {
//             return res.status(400).json({
//               message: `Not enough stock for '${ingredientName}'`,
//             });
//           }

//           // const cost = requiredQty * inv.costPerUnit;
//           const cost = (requiredQty / 1000) * inv.costPerUnit;

//           // unitCost += ing.quantity * inv.costPerUnit;

//           unitCost += (ing.quantity / 1000) * inv.costPerUnit;

//           // breakdown.push({
//           //   ingredient: ingredientName,
//           //   usedQty: requiredQty,
//           //   cost,
//           // });

//           breakdown.push({
//   ingredient: ingredientName,

//   // 👇 per unit info (VERY IMPORTANT)
//   qtyPerItem: ing.quantity,

//   // 👇 total order scaling
//   orderQty: item.qty,

//   // 👇 final used quantity
//   usedQty: requiredQty,

//   costPerUnit: inv.costPerUnit,
//   cost: cost,
// });

          
//         }

//         const unitPrice = menuItem.price;

//         const totalPrice = unitPrice * item.qty;
//         const totalItemCost = unitCost * item.qty;
//         const profit = totalPrice - totalItemCost;

//         totalAmount += totalPrice;
//         estimatedCost += totalItemCost;
//         estimatedProfit += profit;

//         processedItems.push({
//           menuItemId: menuItem._id,
//           name: menuItem.name,
//           qty: item.qty,

//           unitPrice,
//           totalPrice,

//           unitCost,
//           totalCost: totalItemCost,

//           profit,

//           breakdown,
//         });
//       }

//       const order = new Order({
//         restaurantId,
//         tableId,
//         items: processedItems,
//         totalAmount,
//         estimatedCost,
//         estimatedProfit,
//         status: "pending",
//       });

//       const saved = await order.save();

//       res.status(201).json({
//         message: "Order placed successfully",
//         order: saved,
//       });

//     } catch (err) {
//       console.log("CREATE ORDER ERROR:", err);
//       res.status(500).json({ message: err.message });
//     }
//   },
// ];


// // =========================
// // GLOBAL STATE MACHINE
// // =========================
// const allowedTransitions = {
//   pending: ["accepted"],
//   accepted: ["preparing", "cancelled"],
//   preparing: ["ready"],
//   ready: ["served"],
//   served: ["completed"]
// };

// const canTransition = (from, to) => {
//   return allowedTransitions[from]?.includes(to);
// };


// // =========================
// // INVENTORY DEDUCTION
// // =========================
// const deductInventory = async (order) => {
//   for (let item of order.items) {
//     for (let ing of item.breakdown) {
//       await Inventory.updateOne(
//         {
//           restaurantId: order.restaurantId,
//           name: ing.ingredient
//         },
//         {
//           $inc: { quantity: -ing.usedQty }
//         }
//       );
//     }
//   }
// };


// // =========================
// // INVENTORY ROLLBACK
// // =========================
// const rollbackInventory = async (order) => {
//   for (let item of order.items) {
//     for (let ing of item.breakdown) {
//       await Inventory.updateOne(
//         {
//           restaurantId: order.restaurantId,
//           name: ing.ingredient
//         },
//         {
//           $inc: { quantity: ing.usedQty }
//         }
//       );
//     }
//   }
// };


// // =========================
// // STATUS UPDATE ENGINE
// // =========================
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { status, role } = req.body;

//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     const current = order.status;

//     // validate transition
//     if (!canTransition(current, status)) {
//       return res.status(400).json({
//         message: `Invalid transition: ${current} → ${status}`
//       });
//     }

//     // =========================
//     // ROLE RULES
//     // =========================

//     if (["preparing", "ready"].includes(status)) {
//       if (role !== "kitchen" && role !== "manager") {
//         return res.status(403).json({
//           message: "Only kitchen can update cooking status"
//         });
//       }
//     }

//     if (status === "served") {
//       if (role !== "waiter" && role !== "manager") {
//         return res.status(403).json({
//           message: "Only waiter can mark as served"
//         });
//       }
//     }

//     // =========================
//     // SIDE EFFECTS
//     // =========================

//     if (status === "accepted") {
//       await deductInventory(order);
//     }

//     if (status === "cancelled" && current === "accepted") {
//       await rollbackInventory(order);
//     }

//     order.status = status;
//     await order.save();

 
// // convert "T1" → 1
// const tableNumber = parseInt(order.tableId.replace("T", ""));

// const table = await Table.findOne({
//   restaurantId: order.restaurantId,
//   number: tableNumber,
// });

// if (table) {
//   console.log("🪑 Found table:", table.number);

//   if (status === "accepted") {
//     table.status = "occupied";
//     table.guests = table.guests || 2;

//     console.log("➡️ Table set to OCCUPIED");
//   }

//   if (status === "completed") {
//     table.status = "cleaning";
//     table.guests = 0;

//     console.log("➡️ Table set to CLEANING");
//   }

//   await table.save();
// }   

//     res.json({
//       message: "Order status updated",
//       order
//     });

//   } catch (err) {
//     console.log("STATUS UPDATE ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


// // =========================
// // GET ORDERS
// // =========================
// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({
//       restaurantId: req.params.restaurantId,
//     }).sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// // =========================
// // DASHBOARD VIEW API
// // =========================
// // exports.getDashboardOrders = async (req, res) => {
// //   try {
// //     const { restaurantId, view } = req.query;

// //     let filter = { restaurantId };

// //     if (view === "kitchen") {
// //       filter.status = { $in: ["pending", "accepted", "preparing"] };
// //     }

// //     else if (view === "waiter") {
// //       filter.status = { $in: ["ready", "served"] };
// //     }

// //     else if (view === "completed") {
// //       filter.status = "completed";
// //     }

// //     else {
// //       filter.status = {
// //         $in: [
// //           "pending",
// //           "accepted",
// //           "preparing",
// //           "ready",
// //           "served",
// //           "completed",
// //           "cancelled"
// //         ]
// //       };
// //     }

// //     const orders = await Order.find(filter).sort({ createdAt: -1 });

// //     res.json({
// //       view,
// //       count: orders.length,
// //       orders
// //     });

// //   } catch (err) {
// //     console.log("DASHBOARD ERROR:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };



// // exports.getDashboardKPIs = async (req, res) => {
// //   try {
// //     const { restaurantId } = req.params;

// //     const todayStart = new Date();
// //     todayStart.setHours(0, 0, 0, 0);

// //     // =========================
// //     // ORDERS TODAY
// //     // =========================
// //     const ordersToday = await Order.countDocuments({
// //       restaurantId,
// //       createdAt: { $gte: todayStart }
// //     });

// //     // =========================
// //     // REVENUE TODAY (ONLY COMPLETED)
// //     // =========================
// //     const completedOrders = await Order.find({
// //       restaurantId,
// //       status: "completed",
// //       createdAt: { $gte: todayStart }
// //     });

// //     let revenueToday = 0;

// //     completedOrders.forEach(order => {
// //       revenueToday += order.totalAmount;
// //     });

// //     // =========================
// //     // ACTIVE TABLES (tables with any active order)
// //     // =========================
// //     const activeOrders = await Order.find({
// //       restaurantId,
// //       status: { $in: ["pending", "accepted", "preparing", "ready", "served"] }
// //     });

// //     const activeTablesSet = new Set();
// //     activeOrders.forEach(order => activeTablesSet.add(order.tableId));

// //     const activeTables = activeTablesSet.size;

// //     // =========================
// //     // OCCUPANCY (simple logic)
// //     // =========================
// //     const TOTAL_TABLES = 24; // later make dynamic from DB
// //     const occupancy = Math.round((activeTables / TOTAL_TABLES) * 100);

// //     // =========================
// //     // LOW STOCK ALERTS
// //     // =========================
// //     const lowStockItems = await Inventory.find({
// //       restaurantId,
// //       $expr: { $lte: ["$quantity", "$threshold"] } // if you have threshold field
// //     });

// //     const lowStockCount = lowStockItems.length;

// //     const criticalCount = lowStockItems.filter(i => i.quantity < 5).length;

// //     // =========================
// //     // RESPONSE
// //     // =========================
// //     res.json({
// //       ordersToday,
// //       revenueToday,
// //       activeTables: `${activeTables}/${TOTAL_TABLES}`,
// //       occupancy: `${occupancy}%`,
// //       lowStockAlerts: lowStockCount,
// //       criticalItems: criticalCount
// //     });

// //   } catch (err) {
// //     console.log("KPIs ERROR:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// exports.getDashboardKPIs = async (req, res) => {
//   try {
//     const { restaurantId } = req.params;

//     const todayStart = new Date();
//     todayStart.setUTCHours(0, 0, 0, 0);

//     const yesterdayStart = new Date();
//     yesterdayStart.setDate(yesterdayStart.getDate() - 1);
//     yesterdayStart.setUTCHours(0, 0, 0, 0);

//     const yesterdayEnd = new Date();
//     yesterdayEnd.setUTCHours(23, 59, 59, 999);

//     // =========================
//     // ORDERS TODAY + YESTERDAY
//     // =========================
//     const ordersToday = await Order.find({
//       restaurantId,
//       createdAt: { $gte: todayStart }
//     });

//     const ordersYesterday = await Order.find({
//       restaurantId,
//       createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd }
//     });

//     const revenueToday = ordersToday
//       .filter(o => o.status === "completed")
//       .reduce((sum, o) => sum + o.totalAmount, 0);

//     const revenueYesterday = ordersYesterday
//       .filter(o => o.status === "completed")
//       .reduce((sum, o) => sum + o.totalAmount, 0);

//     const revenueGrowth =
//       revenueYesterday === 0
//         ? 100
//         : Math.round(((revenueToday - revenueYesterday) / revenueYesterday) * 100);

//     // =========================
//     // ACTIVE TABLES
//     // =========================
//     const activeOrders = await Order.find({
//       restaurantId,
//       status: { $in: ["pending", "accepted", "preparing", "ready", "served"] }
//     });

//     const activeTables = new Set(activeOrders.map(o => o.tableId)).size;

//     const totalTables = await Table.countDocuments({ restaurantId });

//     const occupancy = totalTables
//       ? Math.round((activeTables / totalTables) * 100)
//       : 0;

//     // =========================
//     // PEAK HOUR DETECTION
//     // =========================
//     let hourlyMap = {};

//     ordersToday.forEach(o => {
//       const hour = new Date(o.createdAt).getHours();
//       hourlyMap[hour] = (hourlyMap[hour] || 0) + 1;
//     });

//     const peakHour =
//       Object.keys(hourlyMap).reduce(
//         (a, b) => (hourlyMap[a] > hourlyMap[b] ? a : b),
//         "0"
//       );

//     // =========================
//     // INVENTORY HEALTH SCORE
//     // =========================
//     const inventory = await Inventory.find({ restaurantId });

//     const lowStock = inventory.filter(i => i.quantity <= i.threshold).length;
//     const critical = inventory.filter(i => i.quantity < 5).length;

//     const healthScore =
//       100 -
//       (lowStock * 5 + critical * 10 + (occupancy > 90 ? 10 : 0));

//     // =========================
//     // MOST / LEAST SOLD
//     // =========================
//     let itemMap = {};

//     ordersToday.forEach(order => {
//       if (order.status !== "completed") return;

//       order.items.forEach(item => {
//         const key = item.name.toLowerCase();

//         if (!itemMap[key]) {
//           itemMap[key] = { name: item.name, qty: 0 };
//         }

//         itemMap[key].qty += item.qty;
//       });
//     });

//     const sorted = Object.values(itemMap).sort((a, b) => b.qty - a.qty);



//     const topOrders = sorted.slice(0, 5).map((item, idx) => ({
//   id: `#ORD${String(idx + 1).padStart(3, '0')}`,
//   item: item.name,
//   qty: item.qty,
//   revenue: `₹${Math.round(item.qty * 80).toLocaleString()}`
// }));

//     // =========================
//     // RESPONSE (PRO LEVEL)
//     // =========================
//     res.json({
//       orders: {
//         today: ordersToday.length,
//         yesterday: ordersYesterday.length
//       },

//       revenue: {
//         today: revenueToday,
//         yesterday: revenueYesterday,
//         growth: `${revenueGrowth}%`
//       },

//       tables: {
//         active: activeTables,
//         total: totalTables,
//         occupancy: `${occupancy}%`
//       },

//       peakHour,

//       inventory: {
//         lowStock,
//         critical
//       },

//       insights: {
//         mostSold: sorted[0] || null,
//         leastSold: sorted[sorted.length - 1] || null
//       },

//       healthScore: Math.max(0, healthScore),
//        topOrders 
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };


// // exports.getAnalytics = async (req, res) => {
// //   try {
// //     const { restaurantId } = req.params;
// //     const { range } = req.query;

// //     let startDate = new Date();

// //     if (range === "today") {
// //       startDate.setHours(0, 0, 0, 0);
// //     } else if (range === "week") {
// //       startDate.setDate(startDate.getDate() - 7);
// //     } else if (range === "month") {
// //       startDate.setMonth(startDate.getMonth() - 1);
// //     } else {
// //       startDate = new Date(0);
// //     }

// //     const orders = await Order.find({
// //       restaurantId,
// //       createdAt: { $gte: startDate }
// //     });

// //     let totalRevenue = 0;
// //     let totalCost = 0;
// //     let totalProfit = 0;
// //     let cancelledCount = 0;

// //     let itemMap = {};

// //     for (let order of orders) {

// //       // =========================
// //       // ONLY COMPLETED = REAL MONEY
// //       // =========================
// //       if (order.status === "completed") {
// //         totalRevenue += order.totalAmount;
// //         totalCost += order.estimatedCost;
// //         totalProfit += order.estimatedProfit;

// //         // ONLY COUNT ITEMS FROM COMPLETED ORDERS
// //         for (let item of order.items) {
// //           if (!itemMap[item.name]) {
// //             itemMap[item.name] = {
// //               name: item.name,
// //               qty: 0,
// //               revenue: 0
// //             };
// //           }

// //           itemMap[item.name].qty += item.qty;
// //           itemMap[item.name].revenue += item.totalPrice;
// //         }
// //       }

// //       if (order.status === "cancelled") {
// //         cancelledCount++;
// //       }
// //     }

// //     const topItems = Object.values(itemMap)
// //       .sort((a, b) => b.qty - a.qty)
// //       .slice(0, 5);

// //     const leastItems = Object.values(itemMap)
// //       .sort((a, b) => a.qty - b.qty)
// //       .slice(0, 5);

// //     res.json({
// //       range,
// //       totalRevenue,
// //       totalCost,
// //       totalProfit,
// //       cancelledOrders: cancelledCount,
// //       topItems,
// //       leastItems
// //     });

// //   } catch (err) {
// //     console.log("ANALYTICS ERROR:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };





// exports.getAnalytics = async (req, res) => {
//   try {
//     const { restaurantId } = req.params;
//     const { range } = req.query;

//     let startDate = new Date();

//     // =========================
//     // TIME RANGE
//     // =========================
//     if (range === "today") {
//       startDate.setHours(0, 0, 0, 0);
//     } else if (range === "week") {
//       startDate.setDate(startDate.getDate() - 7);
//     } else if (range === "month") {
//       startDate.setMonth(startDate.getMonth() - 1);
//     } else {
//       startDate = new Date(0);
//     }

//     const orders = await Order.find({
//       restaurantId,
//       createdAt: { $gte: startDate }
//     });

//     // =========================
//     // METRICS
//     // =========================
//     let totalRevenue = 0;
//     let totalCost = 0;
//     let totalProfit = 0;
//     let cancelledCount = 0;

//     let itemMap = {};
//     let hourlyMap = {};
//     let weeklyMap = {
//       Mon: 0, Tue: 0, Wed: 0,
//       Thu: 0, Fri: 0, Sat: 0, Sun: 0
//     };

//     const dayMap = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

//     // =========================
//     // LOOP ORDERS
//     // =========================
//     for (let order of orders) {

//       const hour = new Date(order.createdAt).getHours();
//       hourlyMap[hour] = (hourlyMap[hour] || 0) + 1;

//       const day = dayMap[new Date(order.createdAt).getDay()];

//       if (order.status === "cancelled") {
//         cancelledCount++;
//         continue;
//       }

//       // =========================
//       // FINANCIAL (ONLY COMPLETED)
//       // =========================
//       if (order.status === "completed") {
//         totalRevenue += order.totalAmount;
//         totalCost += order.estimatedCost;
//         totalProfit += order.estimatedProfit;

//         weeklyMap[day] += order.totalAmount;
//       }

//       // =========================
//       // ITEM ANALYTICS (ONLY COMPLETED = CLEAN DATA)
//       // =========================
//       if (order.status === "completed") {
//         for (let item of order.items) {

//           const key = item.name.trim().toLowerCase();

//           if (!itemMap[key]) {
//             itemMap[key] = {
//               name: item.name.trim(),
//               qty: 0,
//               revenue: 0
//             };
//           }

//           itemMap[key].qty += item.qty;
//           itemMap[key].revenue += item.totalPrice || 0;
//         }
//       }
//     }

//     // =========================
//     // SORTING
//     // =========================
//     const topItems = Object.values(itemMap)
//       .sort((a, b) => b.qty - a.qty)
//       .slice(0, 5);

//     const leastItems = Object.values(itemMap)
//       .sort((a, b) => a.qty - b.qty)
//       .slice(0, 5);

//     // =========================
//     // SORT HOURLY MAP (CLEAN CHART ORDER)
//     // =========================
//     const sortedHourlyMap = {};
//     for (let i = 0; i < 24; i++) {
//       if (hourlyMap[i]) {
//         sortedHourlyMap[i] = hourlyMap[i];
//       }
//     }

//     // =========================
//     // AI SIGNALS (IMPORTANT FOR NEXT STEP)
//     // =========================
//     const peakHour = Object.keys(sortedHourlyMap).reduce((a, b) =>
//       sortedHourlyMap[a] > sortedHourlyMap[b] ? a : b,
//       Object.keys(sortedHourlyMap)[0] || "0"
//     );

//     const aiSignals = {
//       trendingItem: topItems[0] || null,
//       lowPerformingItem: leastItems[0] || null,
//       peakHour
//     };

//     // =========================
//     // RESPONSE
//     // =========================
//     res.json({
//       range,

//       financial: {
//         totalRevenue,
//         totalCost,
//         totalProfit
//       },

//       cancelledOrders: cancelledCount,

//       topItems,
//       leastItems,

//       charts: {
//         hourlyMap: sortedHourlyMap,
//         weeklyMap
//       },

//       aiSignals
//     });

//   } catch (err) {
//     console.log("ANALYTICS ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };



// // exports.getAIMenuSuggestions = async (req, res) => {
// //   try {
// //     const { restaurantId } = req.params;
    
// //     // ✅ FIX 1: Direct call to getAnalytics (proper format)
// //     const analyticsRes = await getAnalytics(req, res, { range: 'month' });
    
// //     // OR ✅ FIX 2: Duplicate logic (SIMPLEST - NO DEPENDENCY)
// //     // const analyticsRes = await calculateAnalytics(restaurantId, 'month');
    
// //     // LIVE Edamam Hyderabad
// //     const hyderabadTrends = await fetch(
// //       `https://api.edamam.com/api/recipes/v2?q=hyderabad+restaurant&type=public&app_id=${process.env.EDAMAM_ID}&app_key=${process.env.EDAMAM_KEY}`
// //     ).then(r => r.json());

// //     const suggestions = [
// //       {
// //         title: "🚀 Hyderabad Viral Hit",
// //         desc: `Add "${hyderabadTrends.hits?.[0]?.recipe?.label?.split(',')[0] || 'Biryani Special'}"`,
// //         impact: "+₹25K/month"
// //       },
// //       {
// //         title: "⭐ Pair Your Top Seller",
// //         desc: `"${analyticsRes?.aiSignals?.trendingItem?.name || 'Chicken Wings'}" + trending recipe`,
// //         impact: "+30% upsell"
// //       },
// //       {
// //         title: `⏰ ${analyticsRes?.aiSignals?.peakHour || 19}:00 Special`,
// //         desc: `"${hyderabadTrends.hits?.[1]?.recipe?.label?.split(',')[0] || 'Paneer Tikka'}"`,
// //         impact: "+25% peak hour"
// //       }
// //     ];

// //     res.json({
// //       yourData: analyticsRes || {},
// //       hyderabadTrends: hyderabadTrends.hits?.slice(0, 6) || [],
// //       aiSuggestions: suggestions
// //     });
// //   } catch (err) {
// //     console.log("AI MENU ERROR:", err);
// //     res.json({
// //       yourData: {},
// //       hyderabadTrends: [],
// //       aiSuggestions: ["Setup complete! Add more orders for better suggestions."]
// //     });
// //   }
// // };




// exports.getLiveOrders = async (req, res) => {
//   try {
//     const { restaurantId } = req.params;

//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);

//     const orders = await Order.find({
//       restaurantId,
//       createdAt: { $gte: todayStart },
//       status: {
//         $in: [
//           "pending",
//           "accepted",
//           "preparing",
//           "ready",
//           "served"
//         ]
//       }
//     }).sort({ createdAt: -1 });

//     res.json(orders);

//   } catch (err) {
//     console.log("LIVE ORDERS ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


// exports.getHistoryOrders = async (req, res) => {
//   try {
//     const { restaurantId } = req.params;

//     const orders = await Order.find({
//       restaurantId
//     }).sort({ createdAt: -1 });

//     res.json(orders);

//   } catch (err) {
//     console.log("HISTORY ORDERS ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };




























const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const Inventory = require("../models/Inventory");
const Table = require("../models/Table");
const { body, validationResult } = require("express-validator");

// =========================
// STEP 1: CREATE ORDER
// =========================
exports.createOrder = [
  body("restaurantId").isMongoId(),
  body("tableId").notEmpty(),
  body("items").isArray({ min: 1 }),
  body("items.*.menuItemId").isMongoId(),
  body("items.*.qty").isInt({ min: 1 }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const { restaurantId, tableId, items } = req.body;

      let totalAmount = 0;
      let estimatedCost = 0;
      let estimatedProfit = 0;

      const processedItems = [];

      for (let item of items) {
        const menuItem = await MenuItem.findOne({
          _id: item.menuItemId,
          restaurantId,
        });

        if (!menuItem) {
          return res.status(404).json({ message: "Menu item not found" });
        }

        let unitCost = 0;
        const breakdown = [];

        for (let ing of menuItem.ingredients) {
          const ingredientName = ing.name.trim().toLowerCase();

          const inv = await Inventory.findOne({
            restaurantId,
            name: ingredientName,
          });

          if (!inv) {
            return res.status(400).json({
              message: `Ingredient '${ingredientName}' not found`,
            });
          }

          const requiredQty = ing.quantity * item.qty;

          // Guard: bad ingredient quantity data on the menu item
          if (!Number.isFinite(requiredQty)) {
            return res.status(400).json({
              message: `Invalid quantity for ingredient '${ingredientName}' on '${menuItem.name}' — check the menu item's recipe.`,
            });
          }

          if (inv.quantity < requiredQty) {
            return res.status(400).json({
              message: `Not enough stock for '${ingredientName}'`,
            });
          }

          const cost = (requiredQty / 1000) * inv.costPerUnit;
          unitCost += (ing.quantity / 1000) * inv.costPerUnit;

          breakdown.push({
            ingredient: ingredientName,
            qtyPerItem: ing.quantity,
            orderQty: item.qty,
            usedQty: requiredQty,
            costPerUnit: inv.costPerUnit,
            cost: cost,
          });
        }

        const unitPrice = menuItem.price;
        const totalPrice = unitPrice * item.qty;
        const totalItemCost = unitCost * item.qty;
        const profit = totalPrice - totalItemCost;

        totalAmount += totalPrice;
        estimatedCost += totalItemCost;
        estimatedProfit += profit;

        processedItems.push({
          menuItemId: menuItem._id,
          name: menuItem.name,
          qty: item.qty,
          unitPrice,
          totalPrice,
          unitCost,
          totalCost: totalItemCost,
          profit,
          breakdown,
        });
      }

      const order = new Order({
        restaurantId,
        tableId,
        items: processedItems,
        totalAmount,
        estimatedCost,
        estimatedProfit,
        status: "pending",
      });

      const saved = await order.save();

      res.status(201).json({
        message: "Order placed successfully",
        order: saved,
      });
    } catch (err) {
      console.log("CREATE ORDER ERROR:", err);
      res.status(500).json({ message: err.message });
    }
  },
];

// =========================
// GLOBAL STATE MACHINE
// =========================
const allowedTransitions = {
  pending: ["accepted"],
  accepted: ["preparing", "cancelled"],
  preparing: ["ready"],
  ready: ["served"],
  served: ["completed"],
};

const canTransition = (from, to) => {
  return allowedTransitions[from]?.includes(to);
};

// =========================
// INVENTORY DEDUCTION
// =========================
const deductInventory = async (order) => {
  for (let item of order.items) {
    for (let ing of item.breakdown) {
      if (!Number.isFinite(ing.usedQty)) {
        throw new Error(`Invalid usedQty for ingredient '${ing.ingredient}'`);
      }
      await Inventory.updateOne(
        { restaurantId: order.restaurantId, name: ing.ingredient },
        { $inc: { quantity: -ing.usedQty } }
      );
    }
  }
};

// =========================
// INVENTORY ROLLBACK
// =========================
const rollbackInventory = async (order) => {
  for (let item of order.items) {
    for (let ing of item.breakdown) {
      if (!Number.isFinite(ing.usedQty)) {
        console.error(`Skipping rollback for '${ing.ingredient}': invalid usedQty`);
        continue;
      }
      await Inventory.updateOne(
        { restaurantId: order.restaurantId, name: ing.ingredient },
        { $inc: { quantity: ing.usedQty } }
      );
    }
  }
};

// =========================
// STATUS UPDATE ENGINE
// =========================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, role } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    if (String(order.restaurantId) !== String(req.user.restaurantId)) {
      return res.status(403).json({ message: "Not authorized for this order" });
    }

    const current = order.status;

    if (!canTransition(current, status)) {
      return res.status(400).json({
        message: `Invalid transition: ${current} → ${status}`,
      });
    }

    // ROLE RULES
    if (["preparing", "ready"].includes(status)) {
      if (role !== "kitchen" && role !== "manager") {
        return res.status(403).json({ message: "Only kitchen can update cooking status" });
      }
    }

    if (status === "served") {
      if (role !== "waiter" && role !== "manager") {
        return res.status(403).json({ message: "Only waiter can mark as served" });
      }
    }

    // SIDE EFFECTS
    if (status === "accepted") {
      try {
        await deductInventory(order);
      } catch (invErr) {
        console.error("Inventory deduction failed:", invErr.message);
        return res.status(400).json({
          message: "Could not accept order — inventory data issue. Check ingredient quantities for items on this order.",
        });
      }
    }

    if (status === "cancelled" && current === "accepted") {
      await rollbackInventory(order);
    }

    order.status = status;
    await order.save();

    // TABLE STATUS SYNC
    const tableNumber = parseInt(order.tableId.replace("T", ""));
    const table = await Table.findOne({
      restaurantId: order.restaurantId,
      number: tableNumber,
    });

    if (table) {
      if (status === "accepted") {
        table.status = "occupied";
        table.guests = table.guests || 2;
      }
      if (status === "completed") {
        table.status = "cleaning";
        table.guests = 0;
      }
      await table.save();
    }

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.log("STATUS UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// =========================
// GET ORDERS
// =========================
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
            restaurantId: req.user.restaurantId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// =========================
// GET SINGLE ORDER BY ID
// =========================
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// =========================
// DASHBOARD KPIs
// =========================
exports.getDashboardKPIs = async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId;

    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);

    const yesterdayStart = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayStart.setUTCHours(0, 0, 0, 0);

    const yesterdayEnd = new Date();
    yesterdayEnd.setUTCHours(23, 59, 59, 999);

    const ordersToday = await Order.find({
      restaurantId,
      createdAt: { $gte: todayStart },
    });

    const ordersYesterday = await Order.find({
      restaurantId,
      createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd },
    });

    const revenueToday = ordersToday
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const revenueYesterday = ordersYesterday
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const revenueGrowth =
      revenueYesterday === 0
        ? 100
        : Math.round(((revenueToday - revenueYesterday) / revenueYesterday) * 100);

    const activeOrders = await Order.find({
      restaurantId,
      status: { $in: ["pending", "accepted", "preparing", "ready", "served"] },
    });

    const activeTables = new Set(activeOrders.map((o) => o.tableId)).size;
    const totalTables = await Table.countDocuments({ restaurantId });
    const occupancy = totalTables ? Math.round((activeTables / totalTables) * 100) : 0;

    let hourlyMap = {};
    ordersToday.forEach((o) => {
      const hour = new Date(o.createdAt).getHours();
      hourlyMap[hour] = (hourlyMap[hour] || 0) + 1;
    });

    const peakHour = Object.keys(hourlyMap).reduce(
      (a, b) => (hourlyMap[a] > hourlyMap[b] ? a : b),
      "0"
    );

    const inventory = await Inventory.find({ restaurantId });
    const lowStock = inventory.filter((i) => i.quantity <= i.threshold).length;
    const critical = inventory.filter((i) => i.quantity < 5).length;

    const healthScore =
      100 - (lowStock * 5 + critical * 10 + (occupancy > 90 ? 10 : 0));

    let itemMap = {};
    ordersToday.forEach((order) => {
      if (order.status !== "completed") return;
      order.items.forEach((item) => {
        const key = item.name.toLowerCase();
        if (!itemMap[key]) {
          itemMap[key] = { name: item.name, qty: 0 };
        }
        itemMap[key].qty += item.qty;
      });
    });

    const sorted = Object.values(itemMap).sort((a, b) => b.qty - a.qty);

    const topOrders = sorted.slice(0, 5).map((item, idx) => ({
      id: `#ORD${String(idx + 1).padStart(3, "0")}`,
      item: item.name,
      qty: item.qty,
      revenue: `₹${Math.round(item.qty * 80).toLocaleString()}`,
    }));

    res.json({
      orders: { today: ordersToday.length, yesterday: ordersYesterday.length },
      revenue: { today: revenueToday, yesterday: revenueYesterday, growth: `${revenueGrowth}%` },
      tables: { active: activeTables, total: totalTables, occupancy: `${occupancy}%` },
      peakHour,
      inventory: { lowStock, critical },
      insights: { mostSold: sorted[0] || null, leastSold: sorted[sorted.length - 1] || null },
      healthScore: Math.max(0, healthScore),
      topOrders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// =========================
// ANALYTICS
// =========================
exports.getAnalytics = async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId;
    const { range } = req.query;

    let startDate = new Date();
    if (range === "today") {
      startDate.setHours(0, 0, 0, 0);
    } else if (range === "week") {
      startDate.setDate(startDate.getDate() - 7);
    } else if (range === "month") {
      startDate.setMonth(startDate.getMonth() - 1);
    } else {
      startDate = new Date(0);
    }

    const orders = await Order.find({
      restaurantId,
      createdAt: { $gte: startDate },
    });

    let totalRevenue = 0;
    let totalCost = 0;
    let totalProfit = 0;
    let cancelledCount = 0;

    let itemMap = {};
    let hourlyMap = {};
    let weeklyMap = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let order of orders) {
      const hour = new Date(order.createdAt).getHours();
      hourlyMap[hour] = (hourlyMap[hour] || 0) + 1;

      const day = dayMap[new Date(order.createdAt).getDay()];

      if (order.status === "cancelled") {
        cancelledCount++;
        continue;
      }

      if (order.status === "completed") {
        totalRevenue += order.totalAmount;
        totalCost += order.estimatedCost;
        totalProfit += order.estimatedProfit;
        weeklyMap[day] += order.totalAmount;

        for (let item of order.items) {
          const key = item.name.trim().toLowerCase();
          if (!itemMap[key]) {
            itemMap[key] = { name: item.name.trim(), qty: 0, revenue: 0 };
          }
          itemMap[key].qty += item.qty;
          itemMap[key].revenue += item.totalPrice || 0;
        }
      }
    }

    const topItems = Object.values(itemMap).sort((a, b) => b.qty - a.qty).slice(0, 5);
    const leastItems = Object.values(itemMap).sort((a, b) => a.qty - b.qty).slice(0, 5);

    const sortedHourlyMap = {};
    for (let i = 0; i < 24; i++) {
      if (hourlyMap[i]) sortedHourlyMap[i] = hourlyMap[i];
    }

    const peakHour = Object.keys(sortedHourlyMap).reduce(
      (a, b) => (sortedHourlyMap[a] > sortedHourlyMap[b] ? a : b),
      Object.keys(sortedHourlyMap)[0] || "0"
    );

    const aiSignals = {
      trendingItem: topItems[0] || null,
      lowPerformingItem: leastItems[0] || null,
      peakHour,
    };

    res.json({
      range,
      financial: { totalRevenue, totalCost, totalProfit },
      cancelledOrders: cancelledCount,
      topItems,
      leastItems,
      charts: { hourlyMap: sortedHourlyMap, weeklyMap },
      aiSignals,
    });
  } catch (err) {
    console.log("ANALYTICS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// =========================
// LIVE ORDERS
// =========================
exports.getLiveOrders = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      restaurantId,
      createdAt: { $gte: todayStart },
      status: { $in: ["pending", "accepted", "preparing", "ready", "served"] },
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.log("LIVE ORDERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// =========================
// HISTORY ORDERS
// =========================
exports.getHistoryOrders = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const orders = await Order.find({ restaurantId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.log("HISTORY ORDERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};