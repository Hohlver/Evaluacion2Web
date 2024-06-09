CREATE DATABASE minimarket;
USE minimarket;


CREATE TABLE vendedor (
    id INT NOT NULL AUTO_INCREMENT ,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contraseña VARCHAR(100),
    telefono VARCHAR (13)NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE proveedor (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(13) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE producto (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio INT NOT NULL,
    stock INT NOT NULL,
    id_proveedor INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_proveedor) REFERENCES proveedor(id)
);

CREATE TABLE venta (
    id INT NOT NULL AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_vendedor INT NOT NULL,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_producto) REFERENCES producto(id),
    FOREIGN KEY (id_vendedor) REFERENCES vendedor(id)
);