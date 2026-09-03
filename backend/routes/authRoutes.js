const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// register manager + restaurant
router.post("/register", register);

// login
router.post("/login", login);

module.exports = router;