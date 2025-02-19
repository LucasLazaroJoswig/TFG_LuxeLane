$(document).ready(function() {

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
      <div class="menu mobile-menu" style="display: none;">
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
          <a href="#">Sobre Nosotros</a>
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