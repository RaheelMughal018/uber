const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const blackListModel = require("../models/blacklist.model");

module.exports.authUser = async (req, res, next) => {
  // Extract token from cookies or Authorization header
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  const isBlacklisted = await blackListModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach user to request object
    req.user = user;
    return next();
  } catch (error) {
    console.error("🚀 ~ Error in authUser middleware:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid or expired token" });
  }
};
module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  const isBlacklisted = await blackListModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach user to request object
    req.captain = captain;
    return next();
  } catch (error) {
    console.error("🚀 ~ Error in authUser middleware:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid or expired token" });
  }
};
