require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

//Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

// Sample Route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
