INSERT INTO usuarios (nombre, apellidos, correo, contrasena, telefono, direccion, rol, foto_perfil, documentos, enabled, tipo_carnet) 
VALUES 
('Juan', 'perez', 'juan.perez@gmail.com', 'juan123', '111222333', 'Calle Falsa 123, Ciudad', 'REGISTRADO', NULL, NULL, 'S', NULL);

INSERT INTO Usuarios (nombre, apellidos, correo, contrasena, telefono, direccion, rol, foto_perfil, documentos, enabled, tipo_carnet) 
VALUES 
('María', 'lopez', 'maria.lopez@gmail.com', 'maria123', '333444555', 'Avenida Central 456, Ciudad', 'ADMIN', NULL, NULL, 'S', NULL);

INSERT INTO Usuarios (nombre, apellidos, correo, contrasena, telefono, direccion, rol, foto_perfil, documentos, enabled, tipo_carnet) 
VALUES 
('Carlos', 'garcia ', 'carlos.garcia@gmail.com', 'carlos123', '666777888', 'Boulevard del Sol 789, Ciudad', 'CHOFER', NULL, 'licencia_chofer.pdf', 'S', 'B');
INSERT INTO Reservas (usuario_id, coche_id, moto_id, chofer_id, fecha_inicio, fecha_fin, estado, precio_total) 
VALUES 
(1, 2, NULL, 5, '2025-03-01', '2025-03-07', 'Confirmada', 350.00),
(2, 3, NULL, NULL, '2025-03-05', '2025-03-10', 'Pendiente', 120.50),
(3, 4, NULL, 6, '2025-04-01', '2025-04-05', 'Confirmada', 400.00),
(4, 5, NULL, NULL, '2025-04-10', '2025-04-12', 'Cancelada', 80.00),
(5, 6, NULL, NULL, '2025-05-15', '2025-05-20', 'Confirmada', 500.00);
