const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "Register User successful" });
});
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login Usersuccessful" });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user Data" });
});

module.exports = { registerUser, loginUser, getCurrentUser };
