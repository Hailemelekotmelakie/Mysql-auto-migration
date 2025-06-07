// app.js

const express = require("express");
const db = require("./db");
const authRoutes = require("./auth");
const passport = require("passport");
const session = require("express-session");
require("./passport-config");

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_fallback_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Use the auth routes
app.use("/auth", authRoutes);

// GET /users
app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user");
    res.json(rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// GET /raw-users (optional second route)
app.get("/m", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user");
    res.send(rows); // raw format
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});

// For further inquiry
//  Hailemelekotmelakie1991@gmail.com
//  +251947053537
