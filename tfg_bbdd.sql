-- Crear base de datos
CREATE DATABASE sistema_reservas;
USE sistema_reservas;

-- Tabla de Usuarios (Clientes, Choferes y Administradores)
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    rol ENUM('cliente', 'chofer', 'administrador') NOT NULL,
    licencia VARCHAR(50),
    fecha_vencimiento_licencia DATE,
    categoria_licencia VARCHAR(50),
    foto_perfil TEXT,
    documentos TEXT,
    estado_verificacion ENUM('pendiente', 'verificado', 'rechazado'),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    enabled ENUM('S','N')
);

-- Tabla de Coches
CREATE TABLE Coches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    año INT NOT NULL,
    precio_por_dia DECIMAL(10,2) NOT NULL,
    precio_por_hora DECIMAL(10,2) NOT NULL,  -- Precio por hora
    disponibilidad ENUM('disponible', 'no disponible') NOT NULL,
    
    -- Especificaciones técnicas
    tipo_motor VARCHAR(50), -- Ejemplo: gasolina, diésel, eléctrico
    cilindrada INT, -- En cc (centímetros cúbicos)
    potencia_hp INT, -- Potencia en caballos de fuerza (HP)
    transmision ENUM('manual', 'automática', 'CVT'), -- Tipo de transmisión
    capacidad_combustible DECIMAL(5,2), -- Capacidad en litros
    
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
    airbags INT CHECK (airbags BETWEEN 0 AND 10), -- Cantidad de airbags
    control_traccion BOOLEAN DEFAULT FALSE,
    asistente_frenado BOOLEAN DEFAULT FALSE,
    
    -- Información adicional
    color VARCHAR(50),
    kilometraje INT DEFAULT 0, -- Kilometraje recorrido
    placa VARCHAR(20) UNIQUE NOT NULL, -- Matrícula única del coche
    tipo_vehiculo ENUM('SUV', 'sedan', 'deportivo', 'convertible', 'hatchback', 'coupe') NOT NULL, -- Tipo de coche
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Motos
CREATE TABLE Motos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    año INT NOT NULL,
    precio_por_dia DECIMAL(10,2) NOT NULL,
    precio_por_hora DECIMAL(10,2) NOT NULL,  -- Precio por hora
    disponibilidad ENUM('disponible', 'no disponible') NOT NULL,

    -- Especificaciones técnicas
    tipo_motor VARCHAR(50), -- Ejemplo: 4 tiempos, 2 tiempos, eléctrico
    cilindrada INT, -- En cc
    potencia_hp INT, -- Potencia en caballos de fuerza (HP)
    transmision ENUM('manual', 'automática'),
    capacidad_combustible DECIMAL(5,2), -- Capacidad en litros
    
    -- Características del vehículo
    tipo_freno_delantero ENUM('disco', 'tambor'),
    tipo_freno_trasero ENUM('disco', 'tambor'),
    tipo_suspension ENUM('telescópica', 'monoamortiguador', 'doble amortiguador'),
    capacidad_carga_kg DECIMAL(5,2), -- Capacidad de carga en kg
    
    -- Seguridad
    abs BOOLEAN DEFAULT FALSE,
    control_traccion BOOLEAN DEFAULT FALSE,
    encendido_electronico BOOLEAN DEFAULT TRUE, -- Botón de encendido eléctrico

    -- Información adicional
    color VARCHAR(50),
    kilometraje INT DEFAULT 0,
    placa VARCHAR(20) UNIQUE NOT NULL,
    tipo_vehiculo ENUM('deportiva', 'cruiser', 'naked', 'touring', 'trail', 'street','custom') NOT NULL, -- Tipo de moto
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabla de Reservas
-- Tabla de Reservas (Corrección sin CHECK con subconsulta)
CREATE TABLE Reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    coche_id INT NULL, 
    moto_id INT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada', 'completada') NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (coche_id) REFERENCES Coches(id) ON DELETE SET NULL,
    FOREIGN KEY (moto_id) REFERENCES Motos(id) ON DELETE SET NULL
);


-- Tabla de Reseñas
CREATE TABLE Resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    coche_id INT NULL,
    moto_id INT NULL,
    calificacion INT CHECK(calificacion BETWEEN 1 AND 5) NOT NULL,
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (coche_id) REFERENCES Coches(id) ON DELETE SET NULL,
    FOREIGN KEY (moto_id) REFERENCES Motos(id) ON DELETE SET NULL
);


-- Tabla de Solicitudes de Empleo para Choferes
CREATE TABLE SolicitudesEmpleo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    estado ENUM('pendiente', 'aceptada', 'rechazada') NOT NULL,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

-- Tabla de Auditoría (para seguimiento de cambios en el sistema)
/*CREATE TABLE Auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    accion TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);*/


-- INSERTS

INSERT INTO Usuarios (nombre_completo, correo, contraseña, telefono, direccion, rol, licencia, fecha_vencimiento_licencia, categoria_licencia, foto_perfil, documentos, estado_verificacion)
VALUES
('Luis Fernández', 'luisfernandez@gmail.com', 'claveSegura123', '555123456', 'Calle Paseo 45, Madrid', 'cliente', 'B12345678', '2026-10-20', 'B', 'foto_luis.jpg', 'doc_luis.pdf', 'verificado'),
('Sofía Gómez', 'sofia.gomez@hotmail.com', 'miContraseña456', '555987654', 'Avenida Libertad 23, Barcelona', 'chofer', 'A98765432', '2025-08-15', 'A+', 'foto_sofia.jpg', 'doc_sofia.pdf', 'pendiente'),
('David Martínez', 'davidmartinez@gmail.com', 'davidPassword789', '555345678', 'Calle Mayor 1, Valencia', 'administrador', NULL, NULL, NULL, 'foto_david.jpg', 'doc_david.pdf', 'verificado'),
('Elena Rodríguez', 'elenarodriguez@yahoo.com', 'contraseña987', '555223344', 'Calle Sol 88, Sevilla', 'cliente', 'B23456789', '2024-11-30', 'B', 'foto_elena.jpg', 'doc_elena.pdf', 'rechazado'),
('Antonio Pérez', 'antonio.perez@gmail.com', 'securePass2021', '555112233', 'Calle del Río 22, Madrid', 'chofer', 'A87654321', '2026-06-12', 'A', 'foto_antonio.jpg', 'doc_antonio.pdf', 'verificado');
INSERT INTO Coches (marca, modelo, año, precio_por_dia, precio_por_hora, disponibilidad, tipo_motor, cilindrada, potencia_hp, transmision, capacidad_combustible, numero_puertas, numero_asientos, aire_acondicionado, gps, bluetooth, camara_reversa, sensores_estacionamiento, abs, airbags, control_traccion, asistente_frenado, color, kilometraje, placa, tipo_vehiculo)
VALUES
('Ford', 'Mustang', 1967, 250.00, 40.00, 'disponible', 'gasolina', 4500, 271, 'manual', 60.00, 2, 4, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 4, TRUE, FALSE, 'rojo', 120000, 'FDM1967', 'deportivo'),
('Porsche', '911 Carrera', 2023, 500.00, 80.00, 'disponible', 'gasolina', 3000, 443, 'automática', 67.00, 2, 4, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 8, TRUE, TRUE, 'negro', 5000, 'PCA2023', 'deportivo'),
('BMW', 'Serie 5', 2019, 200.00, 30.00, 'disponible', 'gasolina', 3000, 335, 'automática', 70.00, 4, 5, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 6, FALSE, TRUE, 'blanco', 60000, 'BMW5678', 'sedan'),
('Tesla', 'Model S', 2022, 300.00, 50.00, 'disponible', 'eléctrico', NULL, 670, 'automática', 100.00, 4, 5, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 10, TRUE, TRUE, 'gris', 12000, 'TSM2022', 'sedan'),
('Chevrolet', 'Chevelle SS', 1970, 350.00, 55.00, 'disponible', 'gasolina', 7000, 450, 'manual', 80.00, 2, 4, TRUE, FALSE, TRUE, FALSE, FALSE, TRUE, 6, FALSE, FALSE, 'azul', 95000, 'CHV1970', 'coupe');
INSERT INTO Motos (marca, modelo, año, precio_por_dia, precio_por_hora, disponibilidad, tipo_motor, cilindrada, potencia_hp, transmision, capacidad_combustible, tipo_freno_delantero, tipo_freno_trasero, tipo_suspension, capacidad_carga_kg, abs, control_traccion, encendido_electronico, color, kilometraje, placa, tipo_vehiculo)
VALUES
('Harley-Davidson', 'Fat Boy', 2018, 120.00, 25.00, 'disponible', 'gasolina', 1745, 90, 'manual', 22.00, 'disco', 'disco', 'doble amortiguador', 25.00, FALSE, FALSE, TRUE, 'negro', 8000, 'HD2018', 'cruiser'),
('Yamaha', 'YZF-R1', 2020, 150.00, 30.00, 'disponible', 'gasolina', 998, 200, 'manual', 17.00, 'disco', 'disco', 'telescópica', 5.00, TRUE, TRUE, TRUE, 'azul', 12000, 'YAM2020', 'deportiva'),
('Ducati', 'Panigale V2', 2021, 180.00, 40.00, 'disponible', 'gasolina', 955, 155, 'manual', 16.00, 'disco', 'disco', 'monoamortiguador', 6.00, TRUE, TRUE, TRUE, 'rojo', 5000, 'DUC2021', 'deportiva'),
('BMW', 'R 1250 GS', 2022, 170.00, 35.00, 'disponible', 'gasolina', 1254, 136, 'manual', 20.00, 'disco', 'disco', 'doble amortiguador', 25.00, TRUE, TRUE, TRUE, 'gris', 3000, 'BMW2022', 'touring'),
('Kawasaki', 'Ninja 400', 2023, 90.00, 15.00, 'disponible', 'gasolina', 399, 49, 'manual', 14.00, 'disco', 'disco', 'telescópica', 8.00, FALSE, FALSE, TRUE, 'verde', 2000, 'KAW2023', 'naked');
INSERT INTO Reservas (usuario_id, tipo_vehiculo, vehiculo_id, fecha_inicio, fecha_fin, estado)
VALUES
(1, 'coche', 1, '2025-02-10', '2025-02-12', 'confirmada'),
(2, 'moto', 3, '2025-02-12', '2025-02-14', 'pendiente'),
(4, 'coche', 5, '2025-02-05', '2025-02-06', 'cancelada'),
(5, 'moto', 2, '2025-02-08', '2025-02-10', 'completada'),
(3, 'coche', 4, '2025-02-20', '2025-02-22', 'pendiente');
INSERT INTO Resenas (usuario_id, tipo_vehiculo, vehiculo_id, calificacion, comentario)
VALUES
(1, 'coche', 1, 5, '¡Excelente coche, muy cómodo y rápido! El Mustang tiene mucha potencia, ¡me encantó!'),
(2, 'moto', 3, 4, 'La moto es increíblemente potente y rápida, aunque el asiento es un poco duro para viajes largos.'),
(4, 'coche', 5, 3, 'El Chevelle SS es un clásico impresionante, pero el interior necesita algo de renovación.'),
(5, 'moto', 2, 5, 'La Yamaha R1 es increíblemente ágil y potente. Perfecta para quienes aman la velocidad.'),
(3, 'coche', 4, 5, 'Tesla Model S es un coche revolucionario, con tecnología de punta y un manejo increíblemente suave.');
INSERT INTO SolicitudesEmpleo (usuario_id, estado)
VALUES
(2, 'pendiente'),
(5, 'aceptada'),
(1, 'rechazada'),
(3, 'pendiente'),
(4, 'aceptada');
/*
INSERT INTO Auditoria (usuario_id, accion)
VALUES
(1, 'Usuario realizó una reserva del coche Mustang (ID 1)'),
(2, 'Chofer actualizó estado de la reserva de la moto YZF-R1 a confirmada'),
(3, 'Administrador aprobó la solicitud de empleo del chofer Antonio Pérez'),
(5, 'Usuario dejó una reseña positiva para la moto Yamaha R1'),
(4, 'Administrador eliminó la reserva cancelada para el coche Chevelle SS');

*/
