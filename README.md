# 🚗 LuxeLane - Plataforma de Alquiler de Vehículos de Lujo

![LuxeLane Logo](front/fotos/logo.png)

## 📋 Descripción del Proyecto

**LuxeLane** es una aplicación web completa para el alquiler de vehículos de lujo, desarrollada como Trabajo de Fin de Grado (TFG) para el ciclo de Desarrollo de Aplicaciones Web (DAW). La plataforma permite a los usuarios explorar, reservar y gestionar el alquiler de coches y motocicletas de alta gama.

### 🎯 Objetivos del Proyecto

- Crear una plataforma intuitiva y moderna para el alquiler de vehículos de lujo
- Implementar un sistema completo de gestión de reservas
- Desarrollar diferentes roles de usuario (Cliente, Chofer, Administrador)
- Proporcionar una experiencia de usuario fluida y responsive

## 🛠️ Tecnologías Utilizadas

### Backend
- **Spring Boot 3.4.2** - Framework principal
- **Java 17** - Lenguaje de programación
- **Spring Data JPA** - Persistencia de datos
- **MySQL** - Base de datos
- **Maven** - Gestión de dependencias
- **Lombok** - Reducción de código boilerplate
- **ModelMapper** - Mapeo de objetos
- **SpringDoc OpenAPI** - Documentación de API
- **Thymeleaf** - Motor de plantillas

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos
- **JavaScript** - Interactividad
- **Bootstrap** - Framework CSS responsive

### Herramientas de Desarrollo
- **Visual Studio Code** - Editor de código
- **MySQL Workbench** - Gestión de base de datos
- **Git** - Control de versiones
- **GitHub** - Repositorio remoto

## 📁 Estructura del Proyecto

```
TFG_LuxeLane/
├── tfg/                          # Backend Spring Boot
│   ├── src/main/java/           # Código fuente Java
│   ├── src/main/resources/      # Recursos (application.properties, etc.)
│   ├── pom.xml                  # Configuración Maven
│   └── mvnw                     # Maven Wrapper
├── front/                       # Frontend HTML/CSS/JS
│   ├── index.html              # Página principal
│   ├── login.html              # Página de login
│   ├── catalogo_coches.html    # Catálogo de coches
│   ├── catalogo_motos.html     # Catálogo de motos
│   ├── areaPersonal*.html      # Áreas personales por rol
│   ├── form*.html              # Formularios de gestión
│   ├── list*.html              # Listados administrativos
│   ├── assets/                 # Recursos estáticos
│   └── fotos/                  # Imágenes del proyecto
├── tfg_bbdd.sql                # Script de creación de BD
├── inserts*.sql                # Scripts de datos iniciales
└── videos/                     # Videos demostrativos
```

## 🚀 Funcionalidades Principales

### 👤 Gestión de Usuarios
- **Registro y autenticación** de usuarios
- **Tres roles diferenciados:**
  - **Cliente**: Puede explorar catálogos y realizar reservas
  - **Chofer**: Gestiona las reservas asignadas
  - **Administrador**: Control total del sistema

### 🚗 Gestión de Vehículos
- **Catálogo de coches** de lujo con filtros avanzados
- **Catálogo de motocicletas** premium
- **Detalles completos** de cada vehículo
- **Sistema de búsqueda** y filtrado por marca, modelo, precio, etc.

### 📅 Sistema de Reservas
- **Formulario de reservas** intuitivo
- **Gestión de fechas** y disponibilidad
- **Cálculo automático** de precios
- **Historial de reservas** por usuario

### 🔧 Panel Administrativo
- **CRUD completo** para vehículos (coches y motos)
- **Gestión de usuarios** y roles
- **Administración de reservas**
- **Estadísticas y reportes**

### 📱 Características Técnicas
- **Diseño responsive** para todos los dispositivos
- **API RESTful** bien documentada
- **Validación de datos** en frontend y backend
- **Seguridad** implementada en todas las capas

## 💾 Base de Datos

El proyecto utiliza MySQL con las siguientes entidades principales:

- **Usuarios** - Gestión de cuentas y roles
- **Coches** - Información detallada de automóviles
- **Motos** - Información detallada de motocicletas
- **Reservas** - Registro de alquileres

### Scripts SQL Incluidos:
- `tfg_bbdd.sql` - Estructura de la base de datos
- `insertsCoches.sql` - Datos de ejemplo para coches
- `insertsMotos.sql` - Datos de ejemplo para motos
- `insertsUsuarios_reservas.sql` - Usuarios y reservas de prueba

## 🔧 Instalación y Configuración

### Prerrequisitos
- Java 17 o superior
- MySQL 8.0 o superior
- Maven 3.6 o superior
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/LucasLazaroJoswig/TFG_LuxeLane.git
   cd TFG_LuxeLane
   ```

2. **Configurar la base de datos**
   ```sql
   CREATE DATABASE luxelane_db;
   USE luxelane_db;
   SOURCE tfg_bbdd.sql;
   SOURCE insertsCoches.sql;
   SOURCE insertsMotos.sql;
   SOURCE insertsUsuarios_reservas.sql;
   ```

3. **Configurar application.properties**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/luxelane_db
   spring.datasource.username=tu_usuario
   spring.datasource.password=tu_contraseña
   ```

4. **Ejecutar el backend**
   ```bash
   cd tfg
   ./mvnw spring-boot:run
   ```

5. **Abrir el frontend**
   - Navegar a la carpeta `front/`
   - Abrir `index.html` en un navegador web

## 📚 Documentación de la API

Una vez ejecutado el proyecto, la documentación de la API estará disponible en:
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

## 🎥 Demostración

Los videos demostrativos del funcionamiento de la aplicación se encuentran en la carpeta `videos/`.

## 👨‍💻 Autor

**Lucas Lázaro Joswig**
- GitHub: [@LucasLazaroJoswig](https://github.com/LucasLazaroJoswig)
- Email: lucaslazarojos@gmail.com

## 📄 Licencia

Este proyecto ha sido desarrollado como Trabajo de Fin de Grado para el ciclo de Desarrollo de Aplicaciones Web.

## 🤝 Contribuciones

Este es un proyecto académico, pero se aceptan sugerencias y mejoras a través de issues y pull requests.

## 📞 Soporte

Para cualquier consulta sobre el proyecto, puedes:
- Abrir un [issue](https://github.com/LucasLazaroJoswig/TFG_LuxeLane/issues)
- Contactar a través del email proporcionado
- Revisar la documentación incluida en el proyecto

---

**LuxeLane** - Donde el lujo se encuentra con la tecnología 🚗✨
