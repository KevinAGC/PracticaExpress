const sql = require("mssql");

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
const pool = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a la base de datos');
        return pool;
    }).catch(err => {
        console.log('Error en la conexion a base de datos ' + err);
    });



//Export the pool
module.exports = pool;
