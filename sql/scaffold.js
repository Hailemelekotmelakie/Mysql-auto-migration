require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const CREATE_DIR = path.join(__dirname, "create");
const SEED_DIR = path.join(__dirname, "seed");

const { HOST, USER, PASS, DB } = process.env;

const config = {
  host: HOST,
  user: USER,
  password: PASS,
  multipleStatements: true,
};

async function runSQLFiles(db, folderPath) {
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(folderPath, file), "utf8");
    console.log(`⚙️ Running: ${path.basename(folderPath)}/${file}`);
    await db.query(sql);
  }
}

async function flushDatabase(db) {
  console.log("🚨 Disabling foreign key checks...");
  await db.query("SET FOREIGN_KEY_CHECKS = 0");

  const [tables] = await db.query("SHOW TABLES");
  console.log(tables);
  const tableNames = tables.map((row) => Object.values(row)[0]);

  for (let name of tableNames) {
    await db.query(`DROP TABLE IF EXISTS \`${name}\``);
    console.log(`❌ Dropped table: ${name}`);
  }

  await db.query("SET FOREIGN_KEY_CHECKS = 1");
  console.log("✅ All tables flushed.");
}

async function scaffold() {
  const args = process.argv.slice(2);
  const flushOnly = args.includes("--flush-only");
  const seedOnly = args.includes("--seed-only");
  const createOnly = args.includes("--create-only");

  const connection = await mysql.createConnection(config);

  if (!flushOnly && !seedOnly) {
    console.log(`🔁 Recreating database: ${DB}`);
    await connection.query(`DROP DATABASE IF EXISTS \`${DB}\`;`);
    await connection.query(`CREATE DATABASE \`${DB}\`;`);
  }

  await connection.end();
  const db = await mysql.createConnection({ ...config, database: DB });

  if (flushOnly) {
    await flushDatabase(db);
    await db.end();
    return;
  }

  if (args.includes("--flush")) {
    await flushDatabase(db);
  }

  if (!seedOnly) {
    console.log("🏗️  Running schema creation scripts...");
    await runSQLFiles(db, CREATE_DIR);
  }

  if (!createOnly) {
    console.log("🌱 Running seed scripts...");
    await runSQLFiles(db, SEED_DIR);
  }

  await db.end();
  console.log("✅ Scaffold complete.");
}

scaffold().catch(console.error);
