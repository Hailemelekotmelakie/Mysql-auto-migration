const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { connection } = require("../connection");

// const connection = mysql.createConnection(parameters);//Using Client
const dirpath = path.join(__dirname, "./create");

fs.readdir(dirpath, function (err, files) {
  const SQLFiles = files.filter((el) => path.extname(el) === ".sql");
  SQLFiles.map((val, i) => {
    var data = fs.readFileSync(`./migrations/create/${val}`, "utf8");
    connection.query(`${data.toString()}`, function (err, result) {
      if (err) {
        console.log(
          `------- Faild  to migrate  ${val} -------`,
          err.sqlMessage
        );
        if (SQLFiles.length - 1 == i) process.exit();
      } else {
        console.log(`------- Successfully migrated ${val} -------`);
        if (SQLFiles.length - 1 == i) process.exit();
      }
    });
  });
});
connection.end;
