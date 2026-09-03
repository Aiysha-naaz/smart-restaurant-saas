// const MenuItem = require("../models/MenuItem");
// const Inventory = require("../models/Inventory");

// const updateMenuAvailability = async (restaurantId, ingredientName, unit) => {
//   try {
//     const name = ingredientName.trim().toLowerCase();
//     const unitNormalized = unit.trim().toLowerCase();

//     console.log("🔍 Rechecking items for:", name, unitNormalized);

//     // 1. Find affected menu items
//     // const menuItems = await MenuItem.find({
//     //   restaurantId,
//     //   ingredients: {
//     //     $elemMatch: {
//     //       name,
//     //       unit: unitNormalized,
//     //     },
//     //   },
//     // });
//    const menuItems = await MenuItem.find({
//   restaurantId,
//   ingredients: {
//     $elemMatch: {
//       name: itemName.toLowerCase(),
//       unit: unit.toLowerCase()
//     }
//   }
// });
// console.log("🧠 Inventory Restaurant:", restaurantId);
// console.log("🧠 Checking for:", name, unit);
// console.log("🍕 Found items:", matchedItems.map(i => i.name));

//     for (let item of menuItems) {
//       let shouldEnable = true;

//       // 2. Check ALL ingredients of this item
//       for (let ing of item.ingredients) {
//         const inv = await Inventory.findOne({
//           restaurantId,
//           name: ing.name,
//           unit: ing.unit,
//         });

//         // ❌ If any ingredient missing or zero → disable
//         if (!inv || inv.quantity <= 0) {
//           shouldEnable = false;
//           break;
//         }
//       }

//       // 3. Update menu item
//       await MenuItem.updateOne(
//         { _id: item._id },
//         { available: shouldEnable }
//       );

//       console.log(
//         `${shouldEnable ? "✅ Enabled" : "🚫 Disabled"}: ${item.name}`
//       );
//     }

//   } catch (err) {
//     console.log("❌ MENU AVAILABILITY ERROR:", err);
//   }
// };

// module.exports = updateMenuAvailability;


// const MenuItem = require("../models/MenuItem");
// const Inventory = require("../models/Inventory");

// const updateMenuAvailability = async (restaurantId, ingredientName, unit) => {
//   try {
//     const name = ingredientName.trim().toLowerCase();
//     const unitNormalized = unit.trim().toLowerCase();

//     console.log("🔍 Rechecking items for:", name, unitNormalized);
//     console.log("🧠 Inventory Restaurant:", restaurantId);

//     // ✅ Find only items using this ingredient
//     const menuItems = await MenuItem.find({
//       restaurantId,
//       ingredients: {
//         $elemMatch: {
//           name: name,
//           unit: unitNormalized,
//         },
//       },
//     });

//     console.log("🍕 Found items:", menuItems.map(i => i.name));

//     for (let item of menuItems) {
//       let shouldEnable = true;

//       // 🔁 Check all ingredients
//       for (let ing of item.ingredients) {
//         const inv = await Inventory.findOne({
//           restaurantId,
//           name: ing.name.trim().toLowerCase(),
//           unit: ing.unit.trim().toLowerCase(),
//         });

//         if (!inv || inv.quantity <= 0) {
//           shouldEnable = false;
//           break;
//         }
//       }

//       // ✅ Update only if changed
//       if (item.available !== shouldEnable) {
//         await MenuItem.updateOne(
//           { _id: item._id },
//           { available: shouldEnable }
//         );

//         console.log(
//           `${shouldEnable ? "✅ Enabled" : "🚫 Disabled"}: ${item.name}`
//         );
//       }
//     }

//   } catch (err) {
//     console.log("❌ MENU AVAILABILITY ERROR:", err);
//   }
// };

// module.exports = updateMenuAvailability;




// const MenuItem = require("../models/MenuItem");
// const Inventory = require("../models/Inventory");

// const updateMenuAvailability = async (restaurantId, ingredientName, unit) => {
//   try {
//     const name = ingredientName.trim().toLowerCase();
//     const unitNormalized = unit.trim().toLowerCase();

//     console.log("🔍 Rechecking items for:", name, unitNormalized);

//     // ✅ Get affected menu items
//     const menuItems = await MenuItem.find({
//       restaurantId,
//       ingredients: {
//         $elemMatch: {
//           name,
//           unit: unitNormalized,
//         },
//       },
//     });

//     // ✅ 🔥 Fetch ALL inventory once
//     const inventoryList = await Inventory.find({ restaurantId });

//     // ✅ Convert to map for fast lookup
//     const inventoryMap = {};
//     for (let inv of inventoryList) {
//       const key = `${inv.name.toLowerCase()}_${inv.unit.toLowerCase()}`;
//       inventoryMap[key] = inv.quantity;
//     }

//     for (let item of menuItems) {
//       let shouldEnable = true;

//       for (let ing of item.ingredients) {
//         const key = `${ing.name.toLowerCase()}_${ing.unit.toLowerCase()}`;
//         const quantity = inventoryMap[key];

//         if (!quantity || quantity <= 0) {
//           shouldEnable = false;
//           break;
//         }
//       }

//       if (item.available !== shouldEnable) {
//         await MenuItem.updateOne(
//           { _id: item._id },
//           { available: shouldEnable }
//         );

//         console.log(
//           `${shouldEnable ? "✅ Enabled" : "🚫 Disabled"}: ${item.name}`
//         );
//       }
//     }

//   } catch (err) {
//     console.log("❌ ERROR:", err);
//   }
// };

// module.exports = updateMenuAvailability;




const MenuItem = require("../models/MenuItem");
const Inventory = require("../models/Inventory");

const updateMenuAvailability = async (restaurantId) => {
  try {
    console.log("🔄 Rechecking FULL menu availability for:", restaurantId);

    // ✅ get all inventory
    const inventoryList = await Inventory.find({ restaurantId });

    const inventoryMap = {};
    for (let inv of inventoryList) {
      const key = `${inv.name.trim().toLowerCase()}_${inv.unit.trim().toLowerCase()}`;
      inventoryMap[key] = inv.quantity;
    }

    // ✅ get ALL menu items (IMPORTANT FIX)
    const menuItems = await MenuItem.find({ restaurantId });

    for (let item of menuItems) {
      let shouldEnable = true;

      for (let ing of item.ingredients) {
        const key = `${ing.name.trim().toLowerCase()}_${ing.unit.trim().toLowerCase()}`;

        const availableQty = inventoryMap[key];

        if (!availableQty || availableQty < ing.quantity) {
          shouldEnable = false;
          break;
        }
      }

      if (item.available !== shouldEnable) {
        await MenuItem.updateOne(
          { _id: item._id },
          { available: shouldEnable }
        );

        console.log(
          `${shouldEnable ? "✅ Enabled" : "🚫 Disabled"}: ${item.name}`
        );
      }
    }
  } catch (err) {
    console.log("❌ ERROR:", err);
  }
};

module.exports = updateMenuAvailability;