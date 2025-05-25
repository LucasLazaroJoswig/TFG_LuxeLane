$(document).ready(function () {

  $(".header").html(`
 <header class="bg-black shadow-md p-4 w-full header">
                <div class="flex items-center justify-between w-[90%]">
                    <!-- Logo y nombre -->
                    <a href='index.html' class="flex items-center space-x-2">
                        <img src="./fotos/logo.png" alt="Logo" class="h-[50px]">
                        <h1 class="text-4xl font-bold font-[Montserrat] text-[#FF3600]">Luxe<span class="text-white">Lane</span></h1>
                    </a>
        
                    <!-- Menú -->
                    <nav class="hidden md:flex space-x-1 font-[Epilogue]">
                        <a href="index.html" class="text-white hover:text-[#FF3600]">Inicio</a>
                        <a href="catalogo_coches.html" class="text-white hover:text-[#FF3600]">Coches</a>
                        <a href="catalogo_motos.html" class="text-white hover:text-[#FF3600]">Motos</a>
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

            $(".footer").html(`
            <div class="footer-content">
                <div class="logo-footer">
                    <span style="color: rgb(255, 54, 0);">Luxe</span><span style="color: white;">Lane</span>
                </div>
                <div class="footer-links">
                    <a href="#" id="links_hover">Política Legal</a>
                    <a href="assets/terminos_condiciones.txt" target="_blank">Términos & Condiciones</a>
                    <a href="mailto:luxelane@ejemplo.com">Contacto</a>
                    <a href="#">Noticia Legal</a>
                    <a href="#">Accesibilidad</a>
                </div>
                <div class="footer-links">
                    <a href="#" id="links_hover">Links</a>
                    <a href="index.html">Inicio</a>
                    <a href="catalogo_coches.html">Coches</a>
                    <a href="catalogo_motos.html">Motos</a>
                    <a href="contactanos.html">Contáctanos</a>
                </div>
                <div class="newsletter">
                    <label for="email" id="links_hover">Suscríbete al boletín:</label>
                    <input type="email" id="email" placeholder="Correo electrónico">
                    <button class="btn-suscribir">Suscribirse</button>
                </div>
            </div>
            <hr>
            <p class="copy">&copy;2025 LuxeLane. Derechos Reservados</p>`);

  $("body").append(`                    <script>
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
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.style.display =
      mobileMenu.style.display === "flex" ? "none" : "flex";
  });

  // Cierra el menú si se hace clic fuera de él
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
      mobileMenu.style.display = "none";
    }
  });

  // Cierra el menú al redimensionar la ventana
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      mobileMenu.style.display = "none";
    }
  });

  // Mejora de la experiencia al pasar el ratón
  menuToggle.addEventListener("mouseenter", () => {
    mobileMenu.style.display = "flex";
  });

  mobileMenu.addEventListener("mouseleave", () => {
    mobileMenu.style.display = "none";
  });
});
