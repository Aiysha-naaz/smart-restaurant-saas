const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate Restaurant ID
const generateRestaurantId = () => {
  return "RESTO" + Math.floor(1000 + Math.random() * 9000);
};

// REGISTER (Restaurant + Manager)
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, restaurantName } = req.body;

//     // check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create restaurant
//     const restaurantId = generateRestaurantId();

//     const restaurant = await Restaurant.create({
//       name: restaurantName,
//       restaurantId
//     });

//     // create user (manager)
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       restaurantId
//     });

//     // link owner
//     restaurant.owner = user._id;
//     await restaurant.save();

//     // token
//     const token = jwt.sign(
//       { id: user._id, restaurantId },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );
    
//     const userWithoutPassword = user.toObject();
//     delete userWithoutPassword.password;
//     res.json({
//       message: "Registered successfully",
//       token,
//       user,
//       restaurant
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




exports.register = async (req, res) => {
  try {
    const { name, email, password, restaurantName } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create restaurant (with public ID)
    const restaurant = await Restaurant.create({
      name: restaurantName,
      restaurantId: generateRestaurantId(), // public ID
    });

    // ✅ FIX: store ObjectId, not string
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      restaurantId: restaurant._id
    });

    // link owner
    restaurant.owner = user._id;
    await restaurant.save();

    // token
    const token = jwt.sign(
      {
        id: user._id,
        restaurantId: restaurant._id // ✅ FIXED
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // remove password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({
      message: "Registered successfully",
      token,
      user: userWithoutPassword,
      restaurant
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // get full user (including password)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // remove password before sending response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // token
    const token = jwt.sign(
      { id: user._id, restaurantId: user.restaurantId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};