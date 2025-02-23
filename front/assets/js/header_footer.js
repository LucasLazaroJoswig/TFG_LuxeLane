$(document).ready(function() {

  $('head').append(`
      <style>
        /* Estilos básicos */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
        }

        .navbar {
            width:80%;
            background-color: #000;
            color: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px 20px;
            position: relative;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #ff4500;
        }

        .menu {
            display: flex;
            gap: 20px;
        }

        .menu a {
            color: white;
            text-decoration: none;
            font-weight: 600;
        }

        .menu a:hover {
            color: #ff4500;
        }

        .menu-toggle {
                display: none;
                font-size: 28px;
                cursor: pointer;
                color: white;
                
            }

        
        .menu-toggle:hover {
                color: #ff4500;
            }

        /* Menú desplegable */
        .mobile-menu {
                display: none;
                flex-direction: column;
                background-color: #000;
                position: absolute;
                top: 60px;
                right: 20px;
                padding: 20px;
                border-radius: 8px;
                z-index: 1000;
            }

        .menu.mobile a {
            margin-bottom: 10px;
        }

        

        /* Responsive */
        @media (max-width: 768px) {
            .menu {
                display: none;
            }

            .menu-toggle {
                display: block;
            }
        }
            /* Footer General */
footer {
    grid-area: fo;
    background-color: #111;
    padding: 40px 20px;
    text-align: center;
    color: white;
    position: relative;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
}

footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 69, 0, 0.1) 0%, rgba(17, 17, 17, 1) 70%);
    z-index: 0;
    opacity: 0.5;
    animation: pulse 6s infinite ease-in-out;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

footer .footer-content {
    display: flex;
    justify-content: space-around; /* Distribuye el espacio entre bloques */
    gap: 40px;
    flex-wrap: wrap;
    align-items: flex-start;
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Logo */
.logo-footer {
    font-size: 50px;
    font-weight: bold;
    display: flex;
    align-items: center;
    font-family: 'Montserrat', serif;
    transition: transform 0.3s ease, opacity 0.3s ease;
    cursor: pointer;
    opacity: 0.9;
}

.logo-footer:hover {
    transform: scale(1.1) rotate(-2deg);
    opacity: 1;
}

/* Links */
.footer-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}

.footer-links a {
    color: white;
    text-decoration: none;
    font-family: 'Epilogue', sans-serif;
    font-size: 16px;
    position: relative;
    transition: color 0.3s ease, transform 0.3s ease;
}

.footer-links a::after {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    background-color: #ff4500;
    bottom: -3px;
    left: 0;
    transition: width 0.3s ease;
}

.footer-links a:hover {
    color: #ff4500;
    transform: translateX(5px);
}

.footer-links a:hover::after {
    width: 100%;
}

/* Newsletter */
.newsletter {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
}

.newsletter label {
    font-weight: bold;
    font-size: 18px;
    color: #ff4500;
}

.newsletter input {
    padding: 12px;
    border-radius: 25px;
    border: 1px solid #444;
    background: #222;
    color: white;
    width: 100%;
    max-width: 300px;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.newsletter input:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(255, 69, 0, 0.7);
    transform: scale(1.05);
}

/* Botón de Suscripción */
.btn-suscribir {
    background-color: #ff4500;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 10px rgba(255, 69, 0, 0.3);
}

.btn-suscribir:hover {
    background-color: #e63e00;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 15px rgba(255, 69, 0, 0.5);
}

/* Divider */
hr {
    border: none;
    height: 2px;
    background-color: #1c1c1c;
    margin: 30px auto;
    width: 80%;
    max-width: 800px;
    position: relative;
    z-index: 1;
}

/* Copyright */
.copy {
    color: grey;
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;
}

.copy:hover {
    color: #ff4500;
}

/* Responsive */
@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }

    .footer-links {
        align-items: center;
        text-align: center;
    }

    .newsletter {
        align-items: center;
    }

    .newsletter input {
        width: 100%;
    }

    .logo-footer {
        font-size: 40px;
    }
}
    </style>

  `);

  $('.header').html(`
 <header class="bg-black shadow-md p-4 w-full header">
                <div class="flex items-center justify-between w-[90%]">
                    <!-- Logo y nombre -->
                    <div class="flex items-center space-x-2">
                        <img src="./fotos/logo.png" alt="Logo" class="h-[50px]">
                        <h1 class="text-4xl font-bold font-[Montserrat] text-[#FF3600]">Luxe<span class="text-white">Lane</span></h1>
                    </div>
        
                    <!-- Menú -->
                    <nav class="hidden md:flex space-x-1 font-[Epilogue]">
                        <a href="index.html" class="text-white hover:text-[#FF3600]">Inicio</a>
                        <a href="catalogo_coches.html" class="text-white hover:text-[#FF3600]">Coches</a>
                        <a href="catalogo_motos.html" class="text-white hover:text-[#FF3600]">Motos</a>
                        <a href="#" class="text-white hover:text-[#FF3600]">Chófers</a>
                        <a href="contactanos.html" class="text-white hover:text-[#FF3600]">Contáctanos</a>
                        <a href="areaPersonal.html" class="bg-[#FF3600] text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors">Área personal</a>
                    </nav>
        
                    <!-- Menú móvil (hamburguesa) -->
                    <div class="md:hidden">
                        <button id="menuButton" class="text-[#FF3600] focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    
                </div>

                <div id="overlay" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 hidden"></div>

            <div id="mobileMenu" class="fixed top-0 left-0 w-[100%] h-[100vh] bg-black transform -translate-x-full flex flex-col items-center justify-between space-y-8  z-10 text-white text-2xl font-[Epilogue] transition-transform duration-300 ease-in-out">
              <button id="cerrarMenuBtn" class="absolute top-5 right-5 text-white text-[50px]">
                  &times;
              </button> 
              <img src="./fotos/logo.png" alt="Logo" class="w-[15%]">
              <h1 class="text-4xl font-bold font-[Montserrat] text-[#FF3600]">Luxe<span class="text-white">Lane</span></h1>
              <a href="index.html" class="hover:text-[#FF3600]">Inicio</a>
              <a href="catalogo_coches.html" class="hover:text-[#FF3600]">Coches</a>
              <a href="catalogo_motos.html" class="hover:text-[#FF3600]">Motos</a>
              <a href="#" class="hover:text-[#FF3600]">Chófers</a>
              <a href="cotactanos.html" class="hover:text-[#FF3600]">Contáctanos</a>
              <a href="areaPersonal.html" class="bg-[#FF3600] text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors">Área personal</a>
            </div>
            </header>`);

  $('.footer').html(`
  <div class="footer-content">
      <div class="logo-footer">
          <span style="color: rgb(255, 54, 0);">Luxe</span><span style="color: white;">Lane</span>
      </div>
      <div class="footer-links">
          <a href="#" id="links_hover">Política Legal</a>
          <a href="#">Términos & Condiciones</a>
          <a href="#">Contacto</a>
          <a href="#">Noticia Legal</a>
          <a href="#">Accesibilidad</a>
      </div>
      <div class="footer-links">
          <a href="#" id="links_hover">Links</a>
          <a href="#">Inicio</a>
          <a href="#">Coches</a>
          <a href="#">Motos</a>
          <a href="#">Contáctanos</a>
      </div>
      <div class="newsletter">
          <label for="email" id="links_hover">Suscríbete al boletín:</label>
          <input type="email" id="email" placeholder="Correo electrónico">
          <button class="btn-suscribir">Suscribirse</button>
      </div>
  </div>
  <hr>
  <p class="copy">&copy;2024 LuxeLane. Derechos Reservados</p>`);

  $('body').append(`                    <script>
                // Obtener los elementos del botón, menú y capa de fondo
                const menuButton = document.getElementById("menuButton");
                const mobileMenu = document.getElementById("mobileMenu");
                const overlay = document.getElementById("overlay");
                const cerrarMenuBtn = document.getElementById("cerrarMenuBtn");
                const contenidoSinHeader = document.querySelectorAll('body > *:not(header)');

            
                // Función para abrir y cerrar el menú
                menuButton.addEventListener("click", () => {
                    // Toggle de la clase que mueve el menú
                    mobileMenu.classList.toggle("-translate-x-full");
                    // Toggle de la clase que muestra u oculta la capa de fondo
                    overlay.classList.toggle("hidden");
                    contenidoSinHeader.classList.toggle("hidden");
                });
            
                // Cerrar el menú si se hace clic en la capa de fondo
                overlay.addEventListener("click", () => {
                    mobileMenu.classList.add("-translate-x-full");
                    overlay.classList.add("hidden");
                    contenidoSinHeader.classList.toggle("hidden");
                });
                cerrarMenuBtn.addEventListener("click", () => {
                  mobileMenu.classList.add("-translate-x-full");
                  overlay.classList.add("hidden");
                  contenidoSinHeader.classList.toggle("hidden");
              });
            </script>`);

  // Script para el menú desplegable
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  // Cierra el menú si se hace clic fuera de él
  document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
          mobileMenu.style.display = 'none';
      }
  });

  // Cierra el menú al redimensionar la ventana
  window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
          mobileMenu.style.display = 'none';
      }
  });

  // Mejora de la experiencia al pasar el ratón
  menuToggle.addEventListener('mouseenter', () => {
      mobileMenu.style.display = 'flex';
  });

  mobileMenu.addEventListener('mouseleave', () => {
      mobileMenu.style.display = 'none';
  });

});
