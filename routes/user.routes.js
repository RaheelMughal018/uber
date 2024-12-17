const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name is must be 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);
router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
