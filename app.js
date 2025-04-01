const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());

// Load schemes JSON data
const schemes = JSON.parse(fs.readFileSync("schemes.json", "utf8"));

// Route to get all schemes
app.get("/api/schemes", (req, res) => {
  res.json(schemes);
});

// Route to get schemes based on category
app.get("/api/schemes/:category", (req, res) => {
  const category = req.params.category;
  if (schemes[category]) {
    res.json(schemes[category]);
  } else {
    res.status(404).json({ error: "Category not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
