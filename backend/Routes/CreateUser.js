const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// Create User Route
router.post(
  "/createuser",
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: hashedPassword,
        address: req.body.address,
        location: req.body.location,
        croptype: req.body.croptype,
        soiltype: req.body.soiltype,
        farmsize: req.body.farmsize
      });

      res.json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);

// Login User Route
router.post(
  "/loginuser",
  [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, error: "Invalid email or password" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, error: "Invalid email or password" });
      }

      res.json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);

// Get User Route
router.get("/getuser/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;