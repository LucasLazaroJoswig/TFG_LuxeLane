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

/* Header */
.header {
    background-color: #000;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    grid-area: he;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.navbar {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

/* Logo */
.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.logo img {
    width: 100px;
    height: 70px;
    transition: transform 0.3s ease;
}

.logo p {
    font-size: 30px;
    font-weight: bold;
    font-family: 'Montserrat', serif;
    margin: 0;
}

.logo p span:first-child {
    color: #ff4500;
}

.logo p span:last-child {
    color: white;
}

.logo:hover {
    transform: scale(1.05);
}

.logo:hover img {
    transform: rotate(-5deg);
}

/* Menú */
.menu {
    display: flex;
    gap: 20px;
    align-items: center;
}

.menu a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 25px;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.menu a:hover {
    color: #ff4500;
    background-color: rgba(255, 69, 0, 0.1);
    transform: translateY(-3px);
}

/* Botón de Perfil */
.button-container-nav .button {
    padding: 12px 25px;
    background: #ff4500;
    border: none;
    border-radius: 50px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 10px rgba(255, 69, 0, 0.3);
}

.button-container-nav .button:hover {
    background-color: #e63e00;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 15px rgba(255, 69, 0, 0.5);
    color: white;
}

/* Menú Toggle (Mobile) */
.menu-toggle {
    display: none;
    font-size: 28px;
    cursor: pointer;
    color: white;
    transition: color 0.3s ease;
}

.menu-toggle:hover {
    color: #ff4500;
}

/* Menú Mobile */
.mobile-menu {
    display: none;
    flex-direction: column;
    background-color: #000;
    position: absolute;
    top: 70px;
    right: 20px;
    padding: 20px;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.mobile-menu a {
    margin-bottom: 10px;
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 25px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.mobile-menu a:hover {
    color: #ff4500;
    background-color: rgba(255, 69, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
    .menu {
        display: none;
    }

    .menu-toggle {
        display: block;
    }

    .mobile-menu {
        display: flex;
    }

    .navbar {
        padding: 10px;
    }

    .logo img {
        width: 80px;
        height: 60px;
    }

    .logo p {
        font-size: 24px;
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
  <div class="navbar">
      <div class="logo">
          <img src="../front/fotos/logo.png" alt="Logo">
          <p><span style="color: rgb(255, 54, 0);">Luxe</span><span style="color: white;">Lane</span></p>
      </div>
      <div class="menu desktop-menu">
          <a href="index.html">Inicio</a>
          <a href="catalogo_coches.html">Coches</a>
          <a href="catalogo_motos.html">Motos</a>
          <a href="#">Chófers</a>
          <a href="contactanos.html">Contáctanos</a>
          <div class="button-container-nav">
              <a href="../front/login.html" class="button button-reservar">Perfil</a>
          </div>
      </div>
      <div class="menu-toggle">☰</div>
      <div class="menu mobile-menu">
          <a href="index.html">Inicio</a>
          <a href="catalogo_coches.html">Coches</a>
          <a href="catalogo_motos.html">Motos</a>
          <a href="#">Chófers</a>
          <a href="contactanos.html">Contáctanos</a>
          <a href="../front/login.html" class="button button-reservar">Perfil</a>
      </div>
  </div>`);

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
