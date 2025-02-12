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
    enabled ENUM('S','N') DEFAULT 'S',

    -- Campos específicos para choferes
    licencia VARCHAR(50),
    fecha_vencimiento_licencia DATE,
    categoria_licencia VARCHAR(50)
);

-- Tabla Coches
CREATE TABLE Coches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    año INT NOT NULL,
    precio_por_dia DECIMAL(10,2) NOT NULL,
    precio_por_hora DECIMAL(10,2) NOT NULL,
    disponibilidad ENUM('disponible', 'no disponible') NOT NULL,

    -- Especificaciones técnicas
    tipo_motor VARCHAR(50),
    cilindrada INT,
    potencia_hp INT,
    transmision ENUM('manual', 'automática', 'CVT'),
    capacidad_combustible DECIMAL(5,2),

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
    placa VARCHAR(20) UNIQUE NOT NULL,
    tipo_vehiculo ENUM('SUV', 'sedan', 'deportivo', 'convertible', 'hatchback', 'coupe') NOT NULL
);

-- Tabla Motos
CREATE TABLE Motos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    año INT NOT NULL,
    precio_por_dia DECIMAL(10,2) NOT NULL,
    precio_por_hora DECIMAL(10,2) NOT NULL,
    disponibilidad ENUM('disponible', 'no disponible') NOT NULL,

    -- Especificaciones técnicas
    tipo_motor VARCHAR(50),
    cilindrada INT,
    potencia_hp INT,
    transmision ENUM('manual', 'automática'),
    capacidad_combustible DECIMAL(5,2),

    -- Características del vehículo
    tipo_freno_delantero ENUM('disco', 'tambor'),
    tipo_freno_trasero ENUM('disco', 'tambor'),
    tipo_suspension ENUM('telescópica', 'monoamortiguador', 'doble amortiguador'),
    capacidad_carga_kg DECIMAL(5,2),

    -- Seguridad
    abs BOOLEAN DEFAULT FALSE,
    control_traccion BOOLEAN DEFAULT FALSE,
    encendido_electronico BOOLEAN DEFAULT TRUE,

    -- Información adicional
    color VARCHAR(50),
    kilometraje INT DEFAULT 0,
    placa VARCHAR(20) UNIQUE NOT NULL,
    tipo_vehiculo ENUM('deportiva', 'cruiser', 'naked', 'touring', 'trail', 'street', 'custom') NOT NULL
);

-- Tabla de Reservas
CREATE TABLE Reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    coche_id INT NULL,
    moto_id INT NULL,
    chofer_id INT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada', 'completada') NOT NULL,
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
    estado ENUM('pendiente', 'aceptada', 'rechazada') NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);
INSERT INTO Motos (marca, modelo, año, precio_por_dia, precio_por_hora, disponibilidad, tipo_motor, cilindrada, potencia_hp, transmision, capacidad_combustible, tipo_freno_delantero, tipo_freno_trasero, tipo_suspension, capacidad_carga_kg, abs, control_traccion, encendido_electronico, color, kilometraje, placa, tipo_vehiculo) VALUES
('Yamaha', 'YZF-R3', 2022, 50.00, 7.00, 'disponible', 'bicilíndrico', 321, 42, 'manual', 14.0, 'disco', 'disco', 'telescópica', 180.0, TRUE, FALSE, TRUE, 'azul', 5000, 'ABC123', 'deportiva'),
('Honda', 'CBR500R', 2021, 55.00, 8.00, 'disponible', 'bicilíndrico', 471, 47, 'manual', 17.1, 'disco', 'disco', 'telescópica', 190.0, TRUE, FALSE, TRUE, 'rojo', 8000, 'DEF456', 'deportiva'),
('Suzuki', 'GSX-S750', 2020, 60.00, 9.00, 'disponible', 'cuatro cilindros', 749, 114, 'manual', 16.0, 'disco', 'disco', 'telescópica', 210.0, TRUE, TRUE, TRUE, 'negro', 12000, 'GHI789', 'naked'),
('Kawasaki', 'Z650', 2023, 58.00, 8.50, 'disponible', 'bicilíndrico', 649, 67, 'manual', 15.0, 'disco', 'disco', 'telescópica', 200.0, TRUE, FALSE, TRUE, 'verde', 3000, 'JKL012', 'naked'),
('Ducati', 'Monster 821', 2022, 75.00, 11.00, 'disponible', 'bicilíndrico', 821, 109, 'manual', 16.5, 'disco', 'disco', 'telescópica', 220.0, TRUE, TRUE, TRUE, 'rojo', 7000, 'MNO345', 'naked'),
('BMW', 'R 1250 GS', 2021, 90.00, 13.00, 'disponible', 'bicilíndrico', 1254, 136, 'manual', 20.0, 'disco', 'disco', 'telescópica', 240.0, TRUE, TRUE, TRUE, 'gris', 15000, 'PQR678', 'touring'),
('Harley-Davidson', 'Iron 883', 2019, 85.00, 12.00, 'disponible', 'bicilíndrico', 883, 51, 'manual', 12.5, 'disco', 'disco', 'doble amortiguador', 250.0, FALSE, FALSE, TRUE, 'negro', 18000, 'STU901', 'custom'),
('Triumph', 'Tiger 900', 2023, 95.00, 14.00, 'disponible', 'tres cilindros', 888, 94, 'manual', 20.0, 'disco', 'disco', 'telescópica', 230.0, TRUE, TRUE, TRUE, 'naranja', 4000, 'VWX234', 'trail'),
('KTM', '1290 Super Duke R', 2022, 100.00, 15.00, 'disponible', 'bicilíndrico', 1301, 177, 'manual', 18.0, 'disco', 'disco', 'telescópica', 220.0, TRUE, TRUE, TRUE, 'naranja', 5000, 'YZA567', 'naked'),
('Aprilia', 'RS 660', 2021, 80.00, 10.00, 'disponible', 'bicilíndrico', 659, 100, 'manual', 15.0, 'disco', 'disco', 'telescópica', 200.0, TRUE, TRUE, TRUE, 'azul', 6000, 'BCD890', 'deportiva'),
('Royal Enfield', 'Interceptor 650', 2022, 70.00, 9.50, 'disponible', 'bicilíndrico', 648, 47, 'manual', 13.7, 'disco', 'disco', 'doble amortiguador', 210.0, FALSE, FALSE, TRUE, 'gris', 9000, 'EFG123', 'naked'),
('CFMoto', '450 MT', 2024, 65.00, 8.50, 'disponible', 'bicilíndrico', 450, 47, 'manual', 12.7, 'disco', 'disco', 'telescópica', 200.0, TRUE, FALSE, TRUE, 'negro', 8500, 'HIJ456', 'trail'),
('Moto Guzzi', 'V7 Stone', 2023, 85.00, 12.50, 'disponible', 'bicilíndrico', 744, 52, 'manual', 21.0, 'disco', 'disco', 'doble amortiguador', 230.0, TRUE, TRUE, TRUE, 'negro', 5000, 'KLM789', 'custom'),
('Honda', 'Africa Twin', 2022, 100.00, 15.50, 'disponible', 'bicilíndrico', 1084, 101, 'manual', 18.8, 'disco', 'disco', 'telescópica', 250.0, TRUE, TRUE, TRUE, 'rojo', 7000, 'NOP012', 'trail'),
('Ducati', 'Diavel 1260', 2021, 120.00, 18.00, 'disponible', 'bicilíndrico', 1262, 159, 'manual', 17.0, 'disco', 'disco', 'monoamortiguador', 240.0, TRUE, TRUE, TRUE, 'negro', 6000, 'QRS345', 'cruiser'),
('Yamaha', 'MT-07', 2023, 60.00, 9.00, 'disponible', 'bicilíndrico', 689, 74, 'manual', 14.0, 'disco', 'disco', 'telescópica', 190.0, TRUE, TRUE, TRUE, 'gris', 3000, 'ABC999', 'naked'),
('Honda', 'CB650R', 2022, 65.00, 9.50, 'disponible', 'cuatro cilindros', 649, 94, 'manual', 15.4, 'disco', 'disco', 'telescópica', 195.0, TRUE, TRUE, TRUE, 'negro', 7000, 'DEF888', 'naked'),
('Suzuki', 'V-Strom 650', 2023, 70.00, 10.00, 'disponible', 'bicilíndrico', 645, 70, 'manual', 20.0, 'disco', 'disco', 'telescópica', 220.0, TRUE, TRUE, TRUE, 'amarillo', 5000, 'GHI777', 'trail'),
('Kawasaki', 'Ninja 400', 2022, 55.00, 8.00, 'disponible', 'bicilíndrico', 399, 49, 'manual', 14.0, 'disco', 'disco', 'telescópica', 180.0, TRUE, FALSE, TRUE, 'verde', 4000, 'JKL666', 'deportiva'),
('Ducati', 'Panigale V2', 2021, 110.00, 16.00, 'disponible', 'bicilíndrico', 955, 155, 'manual', 17.0, 'disco', 'disco', 'telescópica', 200.0, TRUE, TRUE, TRUE, 'rojo', 8000, 'MNO555', 'deportiva'),
('BMW', 'F 900 R', 2022, 75.00, 11.00, 'disponible', 'bicilíndrico', 895, 105, 'manual', 13.0, 'disco', 'disco', 'telescópica', 210.0, TRUE, TRUE, TRUE, 'azul', 6000, 'PQR444', 'naked'),
('Harley-Davidson', 'Street Bob 114', 2023, 110.00, 16.50, 'disponible', 'bicilíndrico', 1868, 94, 'manual', 13.2, 'disco', 'disco', 'doble amortiguador', 260.0, TRUE, FALSE, TRUE, 'negro', 4500, 'STU333', 'custom'),
('Triumph', 'Street Triple 765', 2022, 85.00, 12.50, 'disponible', 'tres cilindros', 765, 118, 'manual', 17.4, 'disco', 'disco', 'telescópica', 200.0, TRUE, TRUE, TRUE, 'gris', 7000, 'VWX222', 'naked'),
('KTM', '890 Adventure', 2023, 95.00, 14.00, 'disponible', 'bicilíndrico', 889, 105, 'manual', 20.0, 'disco', 'disco', 'telescópica', 230.0, TRUE, TRUE, TRUE, 'naranja', 5000, 'YZA111', 'trail'),
('Aprilia', 'Tuono V4', 2021, 120.00, 18.00, 'disponible', 'cuatro cilindros', 1077, 175, 'manual', 18.5, 'disco', 'disco', 'telescópica', 210.0, TRUE, TRUE, TRUE, 'rojo', 6500, 'BCD000', 'naked'),
('Royal Enfield', 'Himalayan', 2022, 60.00, 8.50, 'disponible', 'monocilíndrico', 411, 24, 'manual', 15.0, 'disco', 'disco', 'telescópica', 200.0, TRUE, FALSE, TRUE, 'blanco', 9000, 'EFG999', 'trail'),
('Yamaha', 'XSR700', 2023, 68.00, 10.00, 'disponible', 'bicilíndrico', 689, 74, 'manual', 14.0, 'disco', 'disco', 'telescópica', 190.0, TRUE, TRUE, TRUE, 'gris', 4500, 'XYZ123', 'street'),
('Suzuki', 'SV650', 2022, 62.00, 9.00, 'disponible', 'bicilíndrico', 645, 75, 'manual', 14.5, 'disco', 'disco', 'telescópica', 195.0, TRUE, FALSE, TRUE, 'azul', 5000, 'LMN456', 'naked'),
('Honda', 'Rebel 500', 2023, 70.00, 9.50, 'disponible', 'bicilíndrico', 471, 46, 'manual', 11.2, 'disco', 'disco', 'doble amortiguador', 190.0, TRUE, FALSE, TRUE, 'negro', 5000, 'NOP666', 'custom');