const express = require("express");
const router = express.Router();
const db = require("../index"); // Import database connection

// Get all users
router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Add a new user
router.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: result.insertId, name, email });
  });
});

// Update user
router.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User updated successfully" });
  });
});

// Delete user
router.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;
