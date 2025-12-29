// Importar la biblioteca de Express
const express = require("express");

// Importar la biblioteca de CORS
const cors = require("cors");
const path = require("node:path");

// Importamos dotenv
require("dotenv").config();

// Importamos mysql2
const mysql2 = require("mysql2/promise");

//const path = require("node:path"); //Esto va arriba del todo, con los otros require

// create and config server
const app = express();

// Configuramos server para que funcione bien como API
app.use(cors());

app.use(express.json({ limit: "25Mb" }));

const getConnection = async () => {
  const datosConexion = {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "Password123!",
    database: process.env.MYSQL_SCHEMA || "api_libros",
  };
  const conn = await mysql2.createConnection(datosConexion); // Crear la conexión ala BBDD
  await conn.connect(); // Conectar con la BBDD
  return conn; // Devolvemos el objeto de conexión
};

// init express aplication
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor está arrancado: http://localhost:${port}`);
});

// ENDPOINTS DEL API
app.get("/api/books", async (req, res) => {
  console.log("GET /api/books");
  // 1. Conectamos con la bbdd
  const conn = await getConnection();

  // 2. Preparamos una query = SELECT
  const querySelectBooks = `SELECT
  libros.id,
  titulo,
  genero,
  subgenero,
  anio_publicacion,
  sinopsis,
  isbn,
  disponible,
  autor_id,
  autores.nombre,
  autores.nacionalidad
FROM libros
LEFT JOIN autores ON autores.id = libros.autor_id
`;

  // 3. Lanzamos la query
  const [resultados] = await conn.query(querySelectBooks);
  console.log(resultados);

  // 4. Cerramos la conexión

  await conn.end();

  // 5. Responder con los datos

  res.json({
    success: true,
    books: resultados,
  });
});

app.post("/api/authors", async (req, res) => {
  console.log("POST /api/authors");

  if (!req.body.nombre) {
    return res.status(400).json({
      success: false,
      error: "Falta el nombre",
    });
  }

  if (!req.body.nacionalidad) {
    return res.status(400).json({
      success: false,
      error: "Falta la nacionalidad",
    });
  }

  const conn = await getConnection();

  try {
    const insertAutor = `
      INSERT INTO autores (nombre, nacionalidad)
      VALUES (?, ?);
    `;

    const [resultInsertAutor] = await conn.execute(insertAutor, [
      req.body.nombre,
      req.body.nacionalidad,
    ]);

    await conn.end();

    res.json({
      success: true,
      autorId: resultInsertAutor.insertId,
      message: "Autor insertado correctamente",
    });
  } catch (error) {
    console.error(error);

    await conn.end();

    res.status(500).json({
      success: false,
      error: "Error en la base de datos",
    });
  }
});

app.put("/api/authors/:id", async (req, res) => {
  console.log("PUT /api/authors/:id");

  // si no pasamos el parametroid, lanzamos error
  if (isNaN(parseInt(req.params.id))) {
    return res.status(400).json({
      success: false,
      error: "No es un ID válido",
    });
  }

  // si no informamos en el body alguno de las propiedades necesarias, lanzamos error
  if (!req.body.nombre && !req.body.nacionalidad) {
    return res.status(400).json({
      success: false,
      error: "Debes proporcionar al menos nombre o nacionalidad",
    });
  }

  const conn = await getConnection();

  try {
    // vamos modificando el sql update a medida que llegan los parametros
    let updateAutor = "UPDATE autores SET ";
    // vamos añadiendo en este array los parámetros
    const params = [];

    // si en el body viene informado el nombre, hacemos update del mismo
    if (req.body.nombre) {
      updateAutor += "nombre = ?";
      params.push(req.body.nombre);
    }

    // si en el body viene informado la nacionalidad, hacemos update de la misma
    if (req.body.nacionalidad) {
      if (params.length > 0) {
        updateAutor += ", ";
      }
      updateAutor += "nacionalidad = ?";
      params.push(req.body.nacionalidad);
    }

    updateAutor += " WHERE id = ?";
    params.push(req.params.id);

    const [resultUpdateAutor] = await conn.execute(updateAutor, params);

    // si el autor no existe devolvemos error
    if (resultUpdateAutor.affectedRows === 0) {
      await conn.end();
      return res.status(404).json({
        success: false,
        error: "Autor no encontrado",
      });
    }

    await conn.end();

    res.json({
      success: true,
      message: "Autor actualizado correctamente",
    });
  } catch (error) {
    console.error(error);

    await conn.end();

    res.status(500).json({
      success: false,
      error: "Error en la base de datos",
    });
  }
});
