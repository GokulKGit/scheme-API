const express = require("express");
const cors = require("cors");
const fs = require("fs");
const user = require("./utils/user");
const feedback = require("./utils/feedback");

const app = express();
const PORT = 5000;

// ✅ Add this middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

// Load schemes JSON data
const schemes = JSON.parse(fs.readFileSync("schemes.json", "utf8"));

// Route to get all schemes
app.get("/api/schemes", (req, res) => {
  res.json(schemes);
});

app.use("/", user);
app.use("/", feedback);

// Route to get schemes based on category
app.get("/api/schemes/:category", (req, res) => {
  const category = req.params.category;
  if (schemes[category]) {
    res.json(schemes[category]);
  } else {
    res.status(404).json({ error: "Category not found" });
  }
});

app.get("/", (req, res) => {
  res.json("This is my first API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
