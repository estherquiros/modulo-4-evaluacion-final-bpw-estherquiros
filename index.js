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
