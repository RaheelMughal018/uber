const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const blackListTokenModel = require("../models/blacklist.model");

//! Register a new user
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    console.log("🚀 ~ file: user.controller.js:8 ~ error:", error);
  }
};

//! Login a user
module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.generateAuthToken();
    res.status(200).cookie("token", token).json({ user, token });
  } catch (error) {
    console.log("🚀 ~ file: user.controller.js:39 ~ error:", error);
  }
};

//! Get user profile
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

//! logout user
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out" });
};
