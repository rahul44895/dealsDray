const express = require("express");
const UserSchema = require("../models/UserSchema");
const router = express.Router();
const JWT = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const cookieOptions = {
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 24 hours
  httpOnly: false,
  secure:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging", // Set secure based on the environment
  sameSite:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging"
      ? "none"
      : "lax", // Allow cross-site cookies in production (use 'none')
};

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { f_userName, f_Pwd, f_Confirm_Pwd } = req.body;

    if (!f_userName || !f_Pwd || !f_Confirm_Pwd) {
      return res
        .status(400)
        .json({ success: false, error: "Every field is required." });
    }

    if (f_Pwd !== f_Confirm_Pwd) {
      return res.status(400).json({
        success: false,
        error: "Password and Confirm Password do not match.",
      });
    }

    if (f_Pwd.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters long.",
      });
    }

    const existingUser = await UserSchema.findOne({ f_userName });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, error: "User already exists" });
    }

    const newUser = await UserSchema.create({
      f_userName,
      f_Pwd,
    });

    newUser.f_Pwd = undefined;

    const token = JWT.sign({ user: newUser._id }, JWT_SECRET_KEY);

    res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      message: "User has been created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Some error occurred." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { f_userName, f_Pwd } = req.body;

    const user = await UserSchema.findOne({
      f_userName,
      f_Pwd,
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid login details." });
    }

    user.f_Pwd = undefined;

    const token = await JWT.sign({ user: user._id }, JWT_SECRET_KEY);

    res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Some error occurred." });
  }
});

// Logout Route
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

module.exports = router;
