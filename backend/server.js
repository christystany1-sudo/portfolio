const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // IMPORTANT for GitHub Pages
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Contact route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log(name, email, message);

  res.send("Message received ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});