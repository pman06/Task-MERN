const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Create user registration
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //throw error if missing name email and password
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  //   check database if user email already exists or throw error if so
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Exists");
  }

  //   create password hashing with salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //   create user account with email and hashed password
  const user = await User.create({ name, email, password: hashedPassword });

  //   IF created successfully, return the created user or throw error if not
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWTtoken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// create log in function for users
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWTtoken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Password or email is invalid!");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({ id: _id, name, email });
});

const generateJWTtoken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: `5d` });

module.exports = { registerUser, loginUser, getCurrentUser };
