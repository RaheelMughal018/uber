const captainModel = require("../models/captain.model");
const captainService = require("../services/catian.service");
const { validationResult } = require("express-validator");

module.exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const hashPassword = await captainModel.hashPassword(password);
    const userExists = await captainModel.findOne({ email });
    if (userExists) res.status(400).json({ message: "User already exists" });
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicle_type: vehicle.vehicle_type,
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });
  } catch (error) {
    console.log("🚀 ~ file: captain.controller.js:11 ~ error:", error);
    res.status(500).json({ message: error });
  }
};

//! login captain

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) return res.status(404).json({ message: "User not found" });
    const isMatch = await captain.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = captain.generateAuthToken();
    res.status(200).cookie("token", token).json({ captain, token });
  } catch (error) {
    console.log("🚀 ~ file: captain.controller.js:52 ~ error:", error);
    res.status(500).json({ message: error });
  }
};

//! Get captain profile

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

//! logout captain

module.exports.logoutCaptain = async (req, res, next) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
