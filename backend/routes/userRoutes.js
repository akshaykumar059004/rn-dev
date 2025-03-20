const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Route to add a new user
router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: "User added successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

module.exports = router;
