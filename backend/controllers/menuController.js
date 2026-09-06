import MenuItem from "../models/MenuItem.js";

// export const createMenuItem = async (req, res) => {
//   try {
//     const item = await MenuItem.create(req.body);
//     res.status(201).json(item);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





// // ➕ CREATE MENU ITEM (FIXED)
// export const createMenuItem = async (req, res) => {
//   try {
//     const data = req.body;

//     // 🔥 NORMALIZE INGREDIENTS
//     // if (data.ingredients) {
//     //   data.ingredients = data.ingredients.map(i => ({
//     //     name: i.name.trim().toLowerCase(),
//     //     quantity: i.quantity,
//     //   }));
//     // }

//     if (data.ingredients) {
//   data.ingredients = data.ingredients.map(i => ({
//     name: i.name.trim().toLowerCase(),
//     quantity: i.quantity,
//     unit: i.unit?.trim().toLowerCase()
//   }));
// }

//     const item = await MenuItem.create(data);
//     res.status(201).json(item);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


export const createMenuItem = async (req, res) => {
  try {
    const data = req.body;

    if (!data.name || !data.price || !data.category) {
      return res.status(400).json({
        message: "Name, price, and category are required",
      });
    }

    if (data.price < 0) {
      return res.status(400).json({
        message: "Price must be positive",
      });
    }

    // ✅ normalize name
    data.name = data.name.trim().toLowerCase();
     data.restaurantId = req.user.restaurantId;

    // ✅ normalize ingredients
    if (data.ingredients) {
      data.ingredients = data.ingredients.map((i) => {
        if (!i.name || i.quantity < 0) {
          throw new Error("Invalid ingredient data");
        }

        return {
          name: i.name.trim().toLowerCase(),
          quantity: i.quantity,
          unit: i.unit?.trim().toLowerCase(),
        };
      });
    }

    const item = await MenuItem.create(data);

    res.status(201).json(item);

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Menu item already exists",
      });
    }

    res.status(500).json({ error: err.message });
  }
};




// export const getMenuByRestaurant = async (req, res) => {
//   try {
//     const items = await MenuItem.find({
//       restaurantId: req.params.restaurantId,
//     });

//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



export const getMenuByRestaurant = async (req, res) => {
  try {
    const items = await MenuItem.find({
      restaurantId: req.params.restaurantId,
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// export const updateMenuItem = async (req, res) => {
//   try {
//     const updated = await MenuItem.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const updateMenuItem = async (req, res) => {
//   try {
//     const data = req.body;

//     // ✅ normalize ingredients again
//     if (data.ingredients) {
//       data.ingredients = data.ingredients.map(i => ({
//         name: i.name.trim().toLowerCase(),
//         quantity: i.quantity,
//         unit: i.unit?.trim().toLowerCase(),
//       }));
//     }

//     const updated = await MenuItem.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const updateMenuItem = async (req, res) => {
  try {
    const existing = await MenuItem.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    if (String(existing.restaurantId) !== String(req.user.restaurantId)) {
      return res.status(403).json({ message: "Not authorized for this menu item" });
    }

    const data = req.body;

    if (data.name) {
      data.name = data.name.trim().toLowerCase();
    }

    if (data.ingredients) {
      data.ingredients = data.ingredients.map((i) => ({
        name: i.name.trim().toLowerCase(),
        quantity: i.quantity,
        unit: i.unit?.trim().toLowerCase(),
      }));
    }

    const updated = await MenuItem.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// export const deleteMenuItem = async (req, res) => {
//   try {
//     await MenuItem.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


export const deleteMenuItem = async (req, res) => {
  try {
    const existing = await MenuItem.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    if (String(existing.restaurantId) !== String(req.user.restaurantId)) {
      return res.status(403).json({ message: "Not authorized for this menu item" });
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};