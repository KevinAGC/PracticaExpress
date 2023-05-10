// Cargue la conexion del grupo MySQL
const pool = require("../data/config");
const sql = require("mssql");

//Ruta de la app
const router = (app) => {
  //Users routes

  app.get("/users", async (request, response) => {
    try {
      const db = await pool;
      const results = await db.request().query("SELECT * FROM usuarios");
      response.send(results.recordsets.flat());
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/users/:id", async (request, response) => {
    try {
      const db = await pool;
      const id = request.params.id;
      const results = await db
        .request()
        .input("id", sql.VarChar, id)
        .query("SELECT * FROM usuarios WHERE id = @id");
      response.send(results.recordsets.flat());
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/users", async (request, response) => {
    try {
      const db = await pool;
      const results = await db
        .request()
        .input("nombre", sql.VarChar, request.body.nombre)
        .query("INSERT INTO usuarios OUTPUT INSERTED.id VALUES(@nombre) ");
        //.query("INSERT INTO usuarios OUTPUT INSERTED.id VALUES(@nombre) ");
      response
        .status(201)
        .send(`User added with id ${results.recordset.flat()[0].id}`);
    } catch (error) {
      console.log(error);
    }
  });

  app.put("/users/:id", async (request, response) => {
    try {
      const db = await pool;
      const id = request.params.id;
      const results = await db
        .request()
        .input("nombre", sql.VarChar, request.body.nombre)
        .input("id", sql.VarChar, id)
        .query("UPDATE usuarios SET nombre = @nombre WHERE id = @id");
      response.send("User updated successfully");
    } catch (error) {
      console.log(error);
    }
  });

  app.delete("/users/:id", async (request, response) => {
    try {
      const db = await pool;
      const id = request.params.id;
      const results = await db
        .request()
        .input("id", sql.VarChar, id)
        .query("DELETE FROM usuarios WHERE id = @id");
      response.send("User deleted");
    } catch (error) {
      console.log(error);
    }
  });

  //Product routes

  app.get("/products", async (request, response) => {
    try {
      const db = await pool;
      const results = await db.request().query("SELECT * FROM productos ");
      response.send(results.recordsets.flat());
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/products/:id", async (request, response) => {
    try {
      const db = await pool;
      const id = request.params.id;
      const results = await db
        .request()
        .input("id", sql.VarChar, id)
        .query("SELECT * FROM productos WHERE id = @id");
      response.send(results.recordsets.flat());
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/products", async (request, response) => {
    try {
      const db = await pool;
      const results = await db
        .request()
        .input("nombre", sql.VarChar, request.body.nombre)
        .input("stock", sql.VarChar, request.body.stock)
        .query("INSERT INTO productos OUTPUT INSERTED.id VALUES(@nombre,@stock) ");
      response
        .status(201)
        .send(`User added with id ${results.recordset.flat()[0].id}`);
    } catch (error) {
      console.log(error);
    }
  });

  app.put("/products/:id", async (request, response) => {
    try {
      const db = await pool;
      const id = request.params.id;
      const results = await db
        .request()
        .input("id", sql.VarChar, id)
        .input("nombre", sql.VarChar, request.body.nombre)
        .input("stock", sql.VarChar, request.body.stock)
        .query("UPDATE productos SET nombre = @nombre, stock = @stock WHERE id = @id");
      response.send("User updated successfully");
    } catch (error) {
      console.log(error);
    }
  });

  app.delete("/products/:id", async (request, response) => {
    try {
      const db = await pool;
      const id = request.params.id;
      const results = await db
        .request()
        .input("id", sql.VarChar, id)
        .query("DELETE FROM productos WHERE id = @id");
      response.send("User deleted");
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = router;
