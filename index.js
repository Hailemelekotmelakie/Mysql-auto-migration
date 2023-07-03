const express = require("express");
const map = require("./map");
const { DBConnection, connection } = require("./connection");

const app = express();

DBConnection();

app.get("/", (req, res, next) => {
  connection.query("SELECT * from user", (err, result) => {
    console.log(result);
    res.send(map(result));
  });
});
app.get("/m", (req, res, next) => {
  connection.query("SELECT * from user", (err, result) => {
    res.send(result);
  });
});

app.listen(3000, () => console.log("Running on port http://localhost:3000"));

// For further inquiry
//  Hailemelekotmelakie1991@gmail.com
//  +251947053537
