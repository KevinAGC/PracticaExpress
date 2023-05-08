// Cargue la conexion del grupo MySQL
const pool = require("../data/config");

//Ruta de la app
const router = (app) => {
  //Mostrar mensaje de bienvenida de root
  app.get("/", (request, response) => {
    response.send({
      message: "Bienvendio a Node.js Express REST API!",
    });
  });

  //Mostrar todos los usuarios
  app.get("/users", (request, response) => {
    pool.query("SELECT * FROM usuarios", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  app.get("/users/:id", (request, response) => {
    const id = request.params.id;
    pool.query("SELECT * FROM usuarios WHERE id = ?", id, (error, result) => {
      if (error) throw error;
      response.send(result);
    });
  });

  app.post("/users", (request, response) => {
    pool.query("INSERT INTO usuarios SET ?", request.body, (error, result) => {
      if (error) throw error;
      response.status(201).send(`User added with ID: ${result.insertId}`);
    });
  });

  app.put("/users/:id", (request, response) => {
    const id = request.params.id;
    pool.query(
      "UPDATE usuarios SET ? WHERE id = ?",
      [request.body, id],
      (error, result) => {
        if (error) throw error;
        response.status(201).send(`User updated succesfully`);
      }
    );
  });

  app.delete("/users/:id", (request, response) => {
    const id = request.params.id;
    pool.query("DELETE FROM usuarios WHERE id = ?", id, (error, result) => {
      if (error) throw error;
      response.status(201).send(`User deleted succesfully`);
    });
  });

  //PRODUCTOS

  //Mostrar todos los productos
  app.get("/products", (request, response) => {
    pool.query("SELECT * FROM productos", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  app.get("/products/:id", (request, response) => {
    const id = request.params.id;
    pool.query("SELECT * FROM productos WHERE id = ?", id, (error, result) => {
      if (error) throw error;
      response.send(result);
    });
  });

  app.post("/products", (request, response) => {
    pool.query("INSERT INTO productos SET ?", request.body, (error, result) => {
      if (error) throw error;
      response.status(201).send(`User added with ID: ${result.insertId}`);
    });
  });

  app.put("/products/:id", (request, response) => {
    const id = request.params.id;
    pool.query(
      "UPDATE productos SET ? WHERE id = ?",
      [request.body, id],
      (error, result) => {
        if (error) throw error;
        response.status(201).send(`User updated succesfully`);
      }
    );
  });

  app.delete("/products/:id", (request, response) => {
    const id = request.params.id;
    pool.query("DELETE FROM productos WHERE id = ?", id, (error, result) => {
      if (error) throw error;
      response.status(201).send(`User deleted succesfully`);
    });
  });
};

module.exports = router;
