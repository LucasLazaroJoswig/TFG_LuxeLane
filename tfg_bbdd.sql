-- Crear base de datos
CREATE DATABASE sistema_reservas;
USE sistema_reservas;

-- Tabla Usuarios (Clientes, Choferes y Administradores)
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos varchar(255) not null,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL, -- Contraseña encriptada
    telefono VARCHAR(20), 
    direccion TEXT,
    rol varchar(255) NOT NULL,
    foto_perfil TEXT,
    documentos TEXT,
    enabled VARCHAR(255),

    -- Campos específicos para choferes
    tipo_carnet VARCHAR(50)
);

-- Tabla Coches
CREATE TABLE Coches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    año INT NOT NULL,
    precio_por_dia DECIMAL(10,2) NOT NULL,
    precio_por_hora DECIMAL(10,2) NOT NULL,
    disponibilidad VARCHAR(255) not null,

    -- Especificaciones técnicas
    tipo_motor VARCHAR(50),
    cilindrada INT,
    potencia_hp INT,
    transmision VARCHAR(255),
    capacidad_combustible DECIMAL(5,2),
    etiqueta_medioambiental VARCHAR(255),

    -- Características del vehículo
    numero_puertas INT CHECK (numero_puertas BETWEEN 2 AND 5),
    numero_asientos INT CHECK (numero_asientos BETWEEN 2 AND 9),
    aire_acondicionado BOOLEAN DEFAULT TRUE,
    gps BOOLEAN DEFAULT FALSE,
    bluetooth BOOLEAN DEFAULT FALSE,
    camara_reversa BOOLEAN DEFAULT FALSE,
    sensores_estacionamiento BOOLEAN DEFAULT FALSE,

    -- Seguridad
    abs BOOLEAN DEFAULT TRUE,
    airbags INT CHECK (airbags BETWEEN 0 AND 10),
    control_traccion BOOLEAN DEFAULT FALSE,
    asistente_frenado BOOLEAN DEFAULT FALSE,

    -- Información adicional
    color VARCHAR(50),
    kilometraje INT DEFAULT 0,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    tipo_vehiculo VARCHAR(255),
    imagen varchar(255)
);

-- Tabla Motos
CREATE TABLE Motos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    año INT NOT NULL,
    precio_por_dia DECIMAL(10,2) NOT NULL,
    precio_por_hora DECIMAL(10,2) NOT NULL,
    disponibilidad VARCHAR(255),

    -- Especificaciones técnicas
    tipo_motor VARCHAR(50),
    cilindrada INT,
    potencia_hp INT,
    transmision VARCHAR(255),
    capacidad_combustible DECIMAL(5,2),
    etiqueta_medioambiental VARCHAR(255),

    -- Características del vehículo
    tipo_freno_delantero VARCHAR(255),
    tipo_freno_trasero VARCHAR(255),
    tipo_suspension VARCHAR(255),
    capacidad_carga_kg DECIMAL(5,2),

    -- Seguridad
    abs BOOLEAN DEFAULT FALSE,
    control_traccion BOOLEAN DEFAULT FALSE,
    encendido_electronico BOOLEAN DEFAULT TRUE,

    -- Información adicional
    color VARCHAR(50),
    kilometraje INT DEFAULT 0,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    tipo_vehiculo VARCHAR(255), 
    imagen VARCHAR(255)
);

-- Tabla de Reservas
CREATE TABLE Reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    coche_id INT NULL,
    moto_id INT NULL,
    chofer_id INT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(255),
    precio_total DECIMAL(10,2) NOT NULL, -- Precio total de la reserva
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (coche_id) REFERENCES Coches(id) ON DELETE CASCADE,
    FOREIGN KEY (moto_id) REFERENCES Motos(id) ON DELETE CASCADE,
    FOREIGN KEY (chofer_id) REFERENCES Usuarios(id) ON DELETE SET NULL,
    CHECK ((coche_id IS NOT NULL AND moto_id IS NULL) OR (coche_id IS NULL AND moto_id IS NOT NULL))
);

-- Tabla de Reseñas
CREATE TABLE Resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    coche_id INT NULL,
    moto_id INT NULL,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5) NOT NULL,
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (coche_id) REFERENCES Coches(id) ON DELETE CASCADE,
    FOREIGN KEY (moto_id) REFERENCES Motos(id) ON DELETE CASCADE,
    CHECK ((coche_id IS NOT NULL AND moto_id IS NULL) OR (coche_id IS NULL AND moto_id IS NOT NULL))
);


-- Tabla de Solicitudes de Empleo para Choferes
CREATE TABLE SolicitudesEmpleo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    estado VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);
