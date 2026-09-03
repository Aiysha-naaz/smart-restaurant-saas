const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // req.user = user;
      req.user = {
  id: user._id,
  restaurantId: user.restaurantId
};

      next();
    } else {
      return res.status(401).json({ message: "No token" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Token failed" });
  }
};

module.exports = { protect };