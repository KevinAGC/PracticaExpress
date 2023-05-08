//const conexionsql = require("mssql");

//Set database connection credentials
const config= {
    user:  "usuario",
    password: "1234",
    server: "DESKTOP-G2MF1F8",
    database: "api",
    options:{
        trustServerCertificate: true,
    }
};

//Export the pool
module.exports = config;
