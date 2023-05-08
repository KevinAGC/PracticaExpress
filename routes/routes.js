// Cargue la conexion del grupo MySQL
const config = require("../data/config");
const sql = require("mssql");

//Ruta de la app
const router = (app) => {
  //GET API
  app.get("/users", function (req, res) {
    var pool = new sql.ConnectionPool(config);
    pool
      .connect()
      .then(function () {
        var request = new sql.Request(pool);
        request
          .query("select * from usuarios")
          .then(function (resp) {
            res.send(resp.recordset);
            pool.close();
          })
          .catch(function (err) {
            console.log(err);
            pool.close();
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

module.exports = router;
