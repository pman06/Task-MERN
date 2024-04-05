const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({ _id: user.id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login Usersuccessful" });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user Data" });
});

module.exports = { registerUser, loginUser, getCurrentUser };
