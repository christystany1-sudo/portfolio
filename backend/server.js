const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ DATABASE CONNECTION (Railway)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// ✅ TEST DB CONNECTION
pool.connect()
  .then(() => console.log("Connected to DB ✅"))
  .catch(err => console.error("DB connection error ❌", err));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ CONTACT FORM ROUTE (SAVE TO DB)
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Incoming data:", name, email, message); // 🔍 DEBUG

  try {
    const result = await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    console.log("Inserted:", result.rows[0]); // 🔍 DEBUG

    res.send("Saved to DB ✅");
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).send("DB error ❌");
  }
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});