const mysql = require("mysql");

//Set database connection credentials
const config = {
  host: "localhost",
  user: "administrador",
  password: "1234",
  database: "api",
};

//Create a MySQL pool
const pool = mysql.createPool(config);

//Export the pool
module.exports = pool;
