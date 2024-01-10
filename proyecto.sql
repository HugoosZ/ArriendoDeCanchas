CREATE DATABASE FINAL;
\c FINAL


CREATE TABLE Propietario (
    id SERIAL PRIMARY KEY,
    rut INT NOT NULL,
    digito_verificador INT NOT NULL,
    telefono INT NOT NULL
);

CREATE TABLE Cancha (
    id SERIAL PRIMARY KEY,
    id_propietario INT REFERENCES Propietario(id) ON DELETE CASCADE ON UPDATE CASCADE,
    nombre VARCHAR(50) NOT NULL,
    deporte VARCHAR(50) NOT NULL,
    ubicacion VARCHAR(50) NOT NULL,
    tarifa INT NOT NULL,
    estado BOOLEAN NOT NULL
);
CREATE TABLE Arrendatario (
    id SERIAL PRIMARY KEY,
    rut INT NOT NULL,
    digito_verificador INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    telefono VARCHAR(15) NOT NULL
);

CREATE TABLE Reserva (
    id SERIAL PRIMARY KEY,
    id_cancha INT NOT NULL REFERENCES Cancha(id) ON DELETE CASCADE ON UPDATE CASCADE,
    id_propietario INT NOT NULL REFERENCES Propietario(id) ON DELETE CASCADE ON UPDATE CASCADE,
    id_arrendatario INT NOT NULL REFERENCES Arrendatario(id) ON DELETE CASCADE ON UPDATE CASCADE,
    fecha_inicio TIMESTAMP NOT NULL,
    duracion INT NOT NULL
);

CREATE TABLE Comentario (
    id SERIAL PRIMARY KEY,
    comentario TEXT NOT NULL,
    calificacion INT NOT NULL,
    id_reserva INT NOT NULL REFERENCES Reserva(id) ON DELETE CASCADE ON UPDATE CASCADE,
    id_arrendatario INT NOT NULL REFERENCES Arrendatario(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Comentario_reserva (
    id_comentario INT NOT NULL REFERENCES Comentario(id) ON DELETE CASCADE ON UPDATE CASCADE,
    id_reserva INT NOT NULL REFERENCES Reserva(id) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (9283746, 12);
INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (9283746, 5, 12);
INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (9485761, 0, 123);
INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (617283, 9, 23);
INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (617283, 9, 23);
INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (1829374, 2, 1234);
INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (2940586, 8, 31);
INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (3061729, 6, 314);
INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (4172830, 3, 52);
INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (583942, 1, 42);
INSERT INTO Propietario (rut, digito_verificador, telefono) VALUES (1695053, 4, 51);

insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'Estadio Santiago Bernabeu', 1,  'taekwondo', '1073 Walton Parkway', 8200, true);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'Estadio Metropolitano', 2, 'bowling', '48831 Golden Leaf Trail', 12400, false);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'Estadio Parc des Princes', 3, 'hockey', '98 Armistice Trail', 19200, true);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'Estadio Mineirao', 4, 'bowling', '9 Sugar Crossing', 11000, true);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ('Estadio Emirates',5, 'waterpolo', '91018 Fieldstone Alley', 10200, false);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'Estadio Azul', 6, 'voleibol', '041 Portage Center', 13300, false);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'Estadio Signal Iduna Park',7,'paddle', '66 Hooker Trail', 8300, false);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'Estadio Santiago Bernabeu',8, 'yoga', '19803 Larry Road', 19300, false);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'Estadio Anfield', 9, 'esgrima', '08 Hermina Road', 8100, true);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'Estadio Stamford Bridge', 10, 'beisbol', '38 Westerfield Crossing', 18500, false);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'Estadio Stamford Bridge', 11, 'beisbol', '38 Westerfield Crossing', 18500, false);
insert into Cancha ( nombre, id_propietario, deporte, ubicacion, tarifa, estado) values ( 'prueba', NULL, 'beisbol', '38 Westerfield Crossing', 18500, false);


INSERT INTO Arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES (12345678, 5, 'Alejandro Gonzalez', 'alejandro.gonzalez@gmail.com', '56912345678'); 
INSERT INTO Arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES (23456789, 0, 'Beatriz Martinez', 'beatriz.martinez@gmail.com', '56923456789');
INSERT INTO Arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES (34567890, 9, 'Carlos Soto', 'carlos.soto@gmail.com', '56934567890');
INSERT INTO Arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES (45678901, 2, 'Daniela Lopez', 'daniela.lopez@gmail.com', '56945678901');
INSERT INTO Arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES (56789012, 8, 'Eduardo Herrera', 'eduardo.herrera@gmail.com', '56956789012');
INSERT INTO Arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES (67890123, 6, 'Fernanda Torres', 'fernanda.torres@gmail.com', '56967890123');
INSERT INTO Arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES (78901234, 3, 'Gabriel Silva', 'gabriel.silva@gmail.com', '56978901234');
INSERT INTO Arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES (89012345, 1, 'Hilda Gonzalez', 'hilda.gonzalez@gmail.com', '56989012345');
INSERT INTO Arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES (90123456, 4, 'Ignacio Perez', 'ignacio.perez@gmail.com', '56990123456');
INSERT INTO Arrendatario (rut, digito_verificador, nombre, correo, telefono) VALUES (10111213, 7, 'Julia Ramirez', 'julia.ramirez@gmail.com', '56901234567'); 


INSERT INTO Reserva (id_cancha, id_propietario, id_arrendatario, fecha_inicio, duracion) VALUES (1, 1, 1, '2023-01-15 10:00:00', 2); 
INSERT INTO Reserva (id_cancha, id_propietario, id_arrendatario, fecha_inicio, duracion) VALUES (2, 2, 2, '2023-02-20 14:30:00', 1);
INSERT INTO Reserva (id_cancha, id_propietario, id_arrendatario, fecha_inicio, duracion) VALUES (3, 3, 3, '2023-03-10 08:45:00', 3);
INSERT INTO Reserva (id_cancha, id_propietario, id_arrendatario, fecha_inicio, duracion) VALUES (4, 4, 4, '2023-04-05 18:15:00', 2);
INSERT INTO Reserva (id_cancha, id_propietario, id_arrendatario, fecha_inicio, duracion) VALUES (5, 5, 5, '2023-05-12 11:30:00', 1);
INSERT INTO Reserva (id_cancha, id_propietario, id_arrendatario, fecha_inicio, duracion) VALUES (6, 6, 6, '2023-06-08 16:00:00', 2);
INSERT INTO Reserva (id_cancha, id_propietario, id_arrendatario, fecha_inicio, duracion) VALUES (7, 7, 7, '2023-07-23 09:15:00', 3);
INSERT INTO Reserva (id_cancha, id_propietario, id_arrendatario, fecha_inicio, duracion) VALUES (8, 8, 8, '2023-08-17 13:45:00', 1);
INSERT INTO Reserva (id_cancha, id_propietario, id_arrendatario, fecha_inicio, duracion) VALUES (9, 9, 9, '2023-09-02 17:30:00', 2);
INSERT INTO Reserva (id_cancha, id_propietario, id_arrendatario, fecha_inicio, duracion) VALUES (10, 10, 10, '2023-10-21 12:00:00', 1); 


INSERT INTO Comentario (comentario, calificacion, id_reserva, id_arrendatario) VALUES ('Excelente cancha, muy bien cuidada y con buenos servicios.', 5, 1, 1);
INSERT INTO Comentario (comentario, calificacion, id_reserva, id_arrendatario) VALUES ('Buena experiencia, pero el mantenimiento podria mejorar.', 4, 2, 2);
INSERT INTO Comentario (comentario, calificacion, id_reserva, id_arrendatario) VALUES ('El personal fue amable, pero la cancha estaba un poco sucia.', 3, 3, 3);
INSERT INTO Comentario (comentario, calificacion, id_reserva, id_arrendatario) VALUES ('Increible cancha, definitivamente volvere.', 5, 4, 4);
INSERT INTO Comentario (comentario, calificacion, id_reserva, id_arrendatario) VALUES ('Buen lugar para jugar, pero la iluminacion es insuficiente en la noche.', 4, 5, 5);
INSERT INTO Comentario (comentario, calificacion, id_reserva, id_arrendatario) VALUES ('Muy satisfecho con la reserva, todo salio como esperaba.', 5, 6, 6);
INSERT INTO Comentario (comentario, calificacion, id_reserva, id_arrendatario) VALUES ('Buena cancha, pero el sistema de reserva puede ser mas eficiente.', 3, 7, 7);
INSERT INTO Comentario (comentario, calificacion, id_reserva, id_arrendatario) VALUES ('El estado de la cancha dejaba mucho que desear.', 2, 8, 8);
INSERT INTO Comentario (comentario, calificacion, id_reserva, id_arrendatario) VALUES ('Experiencia agradable, pero la tarifa es un poco alta.', 4, 9, 9);
INSERT INTO Comentario (comentario, calificacion, id_reserva, id_arrendatario) VALUES ('Cancha bien mantenida, pero el personal deberia ser mas atento.', 3, 10, 10);

INSERT INTO Comentario_Reserva (id_comentario, id_reserva) VALUES (1, 1);
INSERT INTO Comentario_Reserva (id_comentario, id_reserva) VALUES (2, 2);
INSERT INTO Comentario_Reserva (id_comentario, id_reserva) VALUES (3, 3);
INSERT INTO Comentario_Reserva (id_comentario, id_reserva) VALUES (4, 4);
INSERT INTO Comentario_Reserva (id_comentario, id_reserva) VALUES (5, 5);
INSERT INTO Comentario_Reserva (id_comentario, id_reserva) VALUES (6, 6);
INSERT INTO Comentario_Reserva (id_comentario, id_reserva) VALUES (7, 7);
INSERT INTO Comentario_Reserva (id_comentario, id_reserva) VALUES (8, 8);
INSERT INTO Comentario_Reserva (id_comentario, id_reserva) VALUES (9, 9);
INSERT INTO Comentario_Reserva (id_comentario, id_reserva) VALUES (10, 10);