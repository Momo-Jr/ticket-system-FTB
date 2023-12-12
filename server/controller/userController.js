const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc regestring new User
// @route /api/users
// access public
const userRegister = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Include all input fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Could not add user");
  }
});

// @desc Loging User
// @route /api/users/login
// access public
const userLogin = expressAsyncHandler(async (req, res) => {
  // extracting user credentials
  const { email, password } = req.body;

  // Check if user exists in the database to login

  const user = await User.findOne({ email });

  // check if password matches the database
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Wrong user name or password");
  }
});
// @desc accessing user with authorization
// @route /api/users/me
// access private
const getMe = expressAsyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(201).json({ user });
});

// Generate web token using JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "60d" });
};

module.exports = {
  userLogin,
  userRegister,
  getMe,
};
