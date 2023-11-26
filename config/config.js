const {join} = require("path")
require("dotenv").config({path:join(__dirname,"../.env")})

module.exports = 
{
  "development": {
    "username": "root",
    "password": "12345678",
    "database": process.env.DB,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
