const { connection } = require("../connection");

const tableList = ["person", "user"]; //list all tables based on relation hierarchy

tableList.map((val, i) => {
  connection.query(`DROP TABLE ${val}`, function (err, result) {
    if (err) {
      console.log(`---- Failed to drop table ${val} ----`);
      if (tableList.length - 1 == i) process.exit();
    } else {
      console.log(`---- Dropped sucessfully table ${val} ----`);
      if (tableList.length - 1 == i) process.exit();
    }
  });
});

connection.end;
