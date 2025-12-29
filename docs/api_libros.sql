CREATE DATABASE api_libros;

USE api_libros;

CREATE TABLE autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(50),
);

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
INSERT INTO autores (nombre, nacionalidad) VALUES
('Ali Hazelwood', 'Estados Unidos'),
('Jennifer L. Armentrout', 'Estados Unidos'),
('Rebecca Yarros', 'Estados Unidos'),
('Sarah J. Maas', 'Estados Unidos'),
('Lauren Roberts', 'Estados Unidos'),
('Holly Black', 'Estados Unidos'),
('Keri Lake', 'Estados Unidos');

INSERT INTO libros 
(titulo, genero, subgenero, anio_publicacion, sinopsis, isbn, disponible, autor_id)
VALUES
('La hipótesis del amor', 'Romance', 'Romance contemporáneo', 2021,
 'Una científica finge una relación amorosa.', '9780593336823', true, 1),

('Novia', 'Romance', 'Romance contemporáneo', 2024,
 'Un matrimonio por conveniencia que se transforma en amor.', '9780593640340', true, 1),

('De sangre y cenizas', 'Fantasía', 'Fantasía romántica', 2020,
 'Una doncella elegida comienza a cuestionar su destino.', '9781952457009', false, 2),

('Alas de sangre', 'Fantasía', 'Fantasía romántica', 2023,
 'Una academia donde los dragones deciden quién vive.', '9781649374042', true, 3),

('Trono de cristal', 'Fantasía', 'Fantasía épica', 2012,
 'Una asesina compite por su libertad.', '9781619630345', true, 4),

('Powerless', 'Fantasía', 'Fantasía romántica', 2023,
 'Una joven sin poderes lucha por sobrevivir.', '9781665934377', true, 5),

('El príncipe cruel', 'Fantasía', 'Fantasía oscura', 2018,
 'Una mortal busca poder en el mundo feérico.', '9780316310314', true, 6),

('Anatema', 'Romance', 'Romance oscuro', 2023,
 'Una historia intensa llena de secretos.', '9781736209464', true, 7);
