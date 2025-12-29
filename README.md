# API Libros - Documentación Completa

## 📚 Descripción del Proyecto

API REST desarrollada con **Node.js** y **Express** para gestionar una base de datos de libros y autores. Este proyecto permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre libros y autores.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web
- **MySQL 2/Promise**: Driver para MySQL con promesas
- **CORS**: Middleware para permitir solicitudes desde diferentes orígenes
- **dotenv**: Para gestionar variables de entorno

---

## 📋 Estructura de la Base de Datos

### Tabla `autores`

```sql
CREATE TABLE autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(50)
);
```

**Campos:**

- `id`: Identificador único del autor
- `nombre`: Nombre del autor
- `nacionalidad`: País de origen del autor

### Tabla `libros`

```sql
CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    genero VARCHAR(50),
    subgenero VARCHAR(50),
    anio_publicacion YEAR,
    sinopsis TEXT,
    isbn VARCHAR(20),
    disponible BOOLEAN DEFAULT true,
    autor_id INT,
    FOREIGN KEY (autor_id) REFERENCES autores(id)
);
```

**Campos:**

- `id`: Identificador único del libro
- `titulo`: Nombre del libro
- `genero`: Género principal (ej: Romance, Fantasía)
- `subgenero`: Subgénero específico
- `anio_publicacion`: Año de publicación
- `sinopsis`: Resumen del libro
- `isbn`: Código ISBN
- `disponible`: Estado de disponibilidad (true/false)
- `autor_id`: Referencia al autor del libro

---

## 🚀 Instalación y Configuración

### Paso 1: Clonar el Repositorio

```bash
git clone <url-repositorio>
cd modulo-4-evaluacion-final-bpw-estherquiros
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=Password123!
MYSQL_SCHEMA=api_libros
PORT=3000
```

### Paso 4: Crear la Base de Datos

Ejecutar el script SQL proporcionado en `docs/api_libros.sql`

### Paso 5: Iniciar el Servidor

```bash
npm start
# o
node index.js
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📡 Endpoints de la API

### 1. LIBROS (Books)

#### 1.1 GET - Obtener todos los libros

**Endpoint:** `GET /api/books`

**Descripción:** Obtiene la lista completa de todos los libros con información del autor.

**Ejemplo de solicitud:**

```bash
curl http://localhost:3000/api/books
```

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "books": [
    {
      "id": 1,
      "titulo": "La hipótesis del amor",
      "genero": "Romance",
      "subgenero": "Romance contemporáneo",
      "anio_publicacion": 2021,
      "sinopsis": "Una científica finge una relación amorosa.",
      "isbn": "9780593336823",
      "disponible": true,
      "autor_id": 1,
      "nombre": "Ali Hazelwood",
      "nacionalidad": "Estados Unidos"
    }
  ]
}
```

---

#### 1.2 DELETE - Eliminar un libro

**Endpoint:** `DELETE /api/books/:id`

**Descripción:** Elimina un libro específico de la base de datos por su ID.

**Parámetros:**

- `id` (requerido): ID del libro a eliminar

**Ejemplo de solicitud:**

```bash
curl -X DELETE http://localhost:3000/api/books/1
```

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "message": "Libro eliminado correctamente"
}
```

**Respuesta si no existe (404):**

```json
{
  "success": false,
  "error": "Libro no encontrado"
}
```

**Respuesta si ID inválido (400):**

```json
{
  "success": false,
  "error": "No es un ID válido"
}
```

---

### 2. AUTORES (Authors)

#### 2.1 GET - Obtener todos los autores

**Endpoint:** `GET /api/authors`

**Descripción:** Obtiene la lista completa de todos los autores.

**Ejemplo de solicitud:**

```bash
curl http://localhost:3000/api/authors
```

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "authors": [
    {
      "id": 1,
      "nombre": "Ali Hazelwood",
      "nacionalidad": "Estados Unidos"
    },
    {
      "id": 2,
      "nombre": "Jennifer L. Armentrout",
      "nacionalidad": "Estados Unidos"
    }
  ]
}
```

---

#### 2.2 POST - Crear un nuevo autor

**Endpoint:** `POST /api/authors`

**Descripción:** Crea un nuevo autor en la base de datos.

**Body requerido (JSON):**

```json
{
  "nombre": "Stephen King",
  "nacionalidad": "Estados Unidos"
}
```

**Ejemplo de solicitud:**

```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Stephen King",
    "nacionalidad": "Estados Unidos"
  }'
```

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "autorId": 8,
  "message": "Autor insertado correctamente"
}
```

**Respuesta si falta el nombre (400):**

```json
{
  "success": false,
  "error": "Falta el nombre"
}
```

**Respuesta si falta la nacionalidad (400):**

```json
{
  "success": false,
  "error": "Falta la nacionalidad"
}
```

---

#### 2.3 PUT - Actualizar un autor

**Endpoint:** `PUT /api/authors/:id`

**Descripción:** Actualiza los datos de un autor existente. Permite actualizar solo uno o ambos campos.

**Parámetros:**

- `id` (requerido): ID del autor a actualizar

**Body (JSON) - Al menos uno de estos campos es requerido:**

```json
{
  "nombre": "Nuevo nombre",
  "nacionalidad": "Nueva nacionalidad"
}
```

**Ejemplos de solicitud:**

_Actualizar solo el nombre:_

```bash
curl -X PUT http://localhost:3000/api/authors/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Stephen King actualizado"
  }'
```

_Actualizar solo la nacionalidad:_

```bash
curl -X PUT http://localhost:3000/api/authors/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nacionalidad": "Canadá"
  }'
```

_Actualizar ambos campos:_

```bash
curl -X PUT http://localhost:3000/api/authors/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Nuevo nombre",
    "nacionalidad": "Nueva nacionalidad"
  }'
```

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "message": "Autor actualizado correctamente"
}
```

**Respuesta si autor no existe (404):**

```json
{
  "success": false,
  "error": "Autor no encontrado"
}
```

**Respuesta si ID inválido (400):**

```json
{
  "success": false,
  "error": "No es un ID válido"
}
```

**Respuesta si no se proporciona campo (400):**

```json
{
  "success": false,
  "error": "Debes proporcionar al menos nombre o nacionalidad"
}
```

---

## 🔄 Flujo General de Uso

### Ejemplo Completo: Crear un autor y un libro

**Paso 1:** Obtener todos los autores

```bash
curl http://localhost:3000/api/authors
```

**Paso 2:** Crear un nuevo autor

```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "J.K. Rowling",
    "nacionalidad": "Reino Unido"
  }'
```

_Respuesta: `autorId: 9`_

**Paso 3:** Obtener todos los libros

```bash
curl http://localhost:3000/api/books
```

**Paso 4:** Actualizar un autor existente

```bash
curl -X PUT http://localhost:3000/api/authors/9 \
  -H "Content-Type: application/json" \
  -d '{
    "nacionalidad": "Inglaterra"
  }'
```

**Paso 5:** Eliminar un libro

```bash
curl -X DELETE http://localhost:3000/api/books/1
```

---

## ✅ Validaciones Implementadas

### Validaciones de Entrada

- **ID válido**: Se valida que el ID sea un número entero
- **Campos requeridos**: Se valida que los campos obligatorios estén presentes en POST
- **Campos en PUT**: Al menos uno de los campos debe estar presente

### Validaciones de Base de Datos

- **Existencia**: Se verifica si el registro existe antes de actualizar o eliminar
- **Integridad referencial**: La tabla `libros` tiene una clave foránea a `autores`

---

## 🔐 Seguridad

### Medidas Implementadas

- **Prepared Statements**: Se utilizan parámetros preparados (`?`) para evitar inyecciones SQL
- **CORS**: Configurado para permitir solicitudes desde diferentes orígenes
- **Variables de Entorno**: Credenciales de base de datos almacenadas en `.env`
- **Manejo de Errores**: Errores capturados y reportados sin exponer detalles sensibles

---

## 📝 Estructura del Proyecto

```
modulo-4-evaluacion-final-bpw-estherquiros/
├── index.js                    # Archivo principal con todos los endpoints
├── package.json                # Dependencias del proyecto
├── .env                        # Variables de entorno (no incluido en git)
├── .gitignore                  # Archivos ignorados por git
├── README.md                   # Este archivo
└── docs/
    ├── api_libros.sql         # Script SQL para crear la BD
    └── api_libros_diagrama.mwb # Diagrama de la base de datos
```

---

## 🧪 Testing Manual

### Con cURL

**1. Obtener todos los autores:**

```bash
curl http://localhost:3000/api/authors
```

**2. Crear un autor:**

```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Miriam Mosquera","nacionalidad":"España"}'
```

**3. Actualizar un autor:**

```bash
curl -X PUT http://localhost:3000/api/authors/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Autora actualizado"}'
```

**4. Obtener todos los libros:**

```bash
curl http://localhost:3000/api/books
```

**5. Eliminar un libro:**

```bash
curl -X DELETE http://localhost:3000/api/books/1
```

### Con Postman

1. Importar colección o crear manualmente cada endpoint
2. Configurar método HTTP (GET, POST, PUT, DELETE)
3. Establecer la URL correcta
4. Para POST y PUT, añadir Headers: `Content-Type: application/json`
5. Para POST y PUT, añadir body JSON

---

## 🐛 Manejo de Errores

| Código HTTP | Significado                       | Ejemplo                     |
| ----------- | --------------------------------- | --------------------------- |
| 200         | OK - Solicitud exitosa            | GET exitoso, POST exitoso   |
| 400         | Bad Request - Solicitud inválida  | ID inválido, campo faltante |
| 404         | Not Found - Recurso no encontrado | Autor/Libro que no existe   |
| 500         | Server Error - Error del servidor | Error de base de datos      |

---

## 📚 Variables de Entorno

```
MYSQL_HOST          # Host de la base de datos (default: localhost)
MYSQL_PORT          # Puerto de MySQL (default: 3306)
MYSQL_USER          # Usuario de MySQL (default: root)
MYSQL_PASSWORD      # Contraseña de MySQL (default: Password123!)
MYSQL_SCHEMA        # Nombre de la base de datos (default: api_libros)
PORT                # Puerto del servidor (default: 3000)
```

---

## 🚀 Próximas Mejoras

- [ ] Implementar autenticación JWT

---

## 👨‍💻 Autor

Esther Quiros
