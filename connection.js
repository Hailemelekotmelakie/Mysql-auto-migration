const mysql = require("mysql");
require("dotenv").config();

const parameters = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  multipleStatements: true,
  connectionLimit: 10,
};

const connection = mysql.createPool(parameters);
function DBConnection() {
  connection.getConnection((err, res) => {
    if (err) {
      console.log("Failed to connect to database!", err.sqlMessage);
    } else {
      console.log("Connected to MySQL Server!", res.state);
    }
  });
}

module.exports = { DBConnection, parameters, connection };
