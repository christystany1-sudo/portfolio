const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect to Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ SAVE DATA TO DATABASE
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    res.send("Saved to DB ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error ❌");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});