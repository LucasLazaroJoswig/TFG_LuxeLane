$(document).ready(function() {

    $('.header').html(`<div class="logo">
    <img src="../front/fotos/logo.png" alt=""> <!-- Aquí puedes poner tu logo, si tienes -->
    <p>
      <span style="color:  rgb(255, 54, 0);">Luxe</span><span style="color: white;">Lane</span>
    </p>
  </div>

  <nav>
    <a href="index.html">Inicio</a>
    <a href="catalogo_coches.html">Coches</a>
    <a href="catalogo_motos.html">Motos</a>
    <a href="#">Chófers</a>
    <a href="sobre_nosotros.html">Sobre Nosotros</a>
    <a href="contactanos.html">Contáctanos</a>
    <div class="button-container-nav">
      <a href="../front/login.html" class="button button-reservar">Area Personal</a>
    </div>
  </nav>`);


    $('.footer').html( `<div class="footer-content">
    <div class="logo-footer">
        <span style="color:  rgb(255, 54, 0);">Luxe</span><span style="color: white;">Lane</span>
      </p>
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
 <p class="copy">&copy;2024 LuxeLane. Derechos Resevados</p>`);
});
