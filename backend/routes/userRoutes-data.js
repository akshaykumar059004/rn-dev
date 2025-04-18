const express = require("express");
const router = express.Router();
const db = require("../index"); // Import database connection

// Get all users
router.get("/data", (req, res) => {
  db.query("SELECT * FROM data", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Add a new user
router.post("/data", (req, res) => {
  const { name, age, income, address } = req.body;
  db.query("INSERT INTO data (name, age, income, address) VALUES (?, ?, ?, ?)", [name, age, income, address], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: result.insertId, name, age, income, address });
  });
});

// Update user (TBU)
router.put("/users/:id", (req, res) => {
  const { name, age, income, address} = req.body;
  db.query("UPDATE data SET name = ?, age = ?, income = ?, address = ? WHERE id = ?", [name, age, income, address, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User updated successfully" });
  });
});

// Delete user (TBU)
router.delete("/data/:id", (req, res) => {
  db.query("DELETE FROM data WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;
