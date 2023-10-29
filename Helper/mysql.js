const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "all",
  password: "12345678",
  database: "events",
  port: 3306,
});

module.exports = db;
