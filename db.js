require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Database connected");
    conn.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    // process.exit(1); // optional: stop the server if DB is down
  }
}

testConnection(); // run immediately when app starts

module.exports = pool;
