$(document).ready(function() {
    // Obtener el ID del moto de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var motoId = urlParams.get('id');

    // Función para obtener los detalles del moto
    function obtenerDetallesmoto(id) {
        $.ajax({
            url: `http://localhost:8087/motos/verDetalle/${id}`, // Ruta al endpoint del backend
            type: "GET",
            success: function(moto) {
                // Mostrar los detalles del moto en la página
                $('body').html(`
                <!-- Barra de navegación -->
                <!-- Header Principal -->
                <header class="bg-black shadow-md p-4 w-full header">
                <div class="flex items-center justify-between w-[80%]">
                    <!-- Logo y nombre -->
                    <a class="flex items-center space-x-2" href="index.html">
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
            </header>
            
                <!-- Banner con fondo de motos -->
                <section class="banner">
                    <div class="banner-text">
                        <h1 font-['Epilogue']>${moto.marca} ${moto.modelo}</h1>
                    </div>
                </section>
            
            
                <!-- Contenido Principal -->
            
                    <!-- Tarjeta de Vehículo -->
                    <section class="filtro">
                        <div class="ml-[80px] mt-[100px] bg-[#202020] rounded-xl shadow-xl p-8 w-[325px] max-w-md z-10 sticky z-99 top-[20px]">
                          <div class="text-left mb-6">
                            <h1 class="text-[50px] font-bold" style="font-family: DM sans;">€${moto.precioPorDia} <span class="text-[16px] font-normal">/dia</span></h1>
                            <hr class="bg-[#2c2c2c] my-2 h-[2px]">
                          </div>
                          <div>
                          
                                    <ul class="space-y-[24.7px]">
                                        <li class="flex justify-between gap-2">
                                            <div class="flex gap-3">

                                                Puertas
                                            </div>
                                            ${moto.potenciaHp}
                                        </li>
                                        <li class="flex justify-between gap-2">
                                            <div class="flex gap-3">

                                                Pasajeros
                                            </div>
                                            ${moto.cilindrada}
                                        </li>
                                        <li class="flex justify-between gap-2">
                                            <div class="flex gap-3">

                                                Transmisión
                                            </div>
                                            ${moto.transmision}
                                        </li>
                                        <li class="flex justify-between gap-2">
                                            <div class="flex gap-3">

                                                ${moto.tipoMotor}
                                            </div>
                                            <img src="./assets/iconos/done.svg">
                                        </li>

                                        <hr class="bg-[#2c2c2c] my-2 h-[2px]">
                                    </ul>
                                    <div class="flex items-center justify-start mt-[20px] hover:scale-[1.01] transition transition-all ease-in-out" id="reservarBtn" data-id="${moto.id}">
                                        <button class="bg-[#FF3600] rounded-full text-white p-3 text-[16px] font-bold " style="font-family: DM sans;">Reservar</button>
                                        <img class=" flecha-btn" src="./fotos/flecha.svg" data-id="${moto.id}">
                                    </div>
                                    </div>
                          </div>
                        </div>
                      </section>
                      <section class="catalogo pl-7 rounded flex justify-start flex-col">
                        <img class="h-[480px] w-[800px] rounded-xl" src="fotos/img_motos/${moto.imagen}" alt="">
                        <div class="w-[800px] border rounded-xl border-1 border-[#ffffff15] my-5 flex flex-wrap justify-between">
                            <div class="flex flex-wrap justify-start space-x-3 w-[50%] p-4">
                                <img src="assets/iconos/kilometros.svg" alt="">
                                <div>
                                    <h3 class="text-[20px] font-semibold text-left" style="font-family: Epilogue;">Kilometraje Ilimitado</h3>
                                    <p class="text-[16px] font-normal text-left" style="font-family: DM Sans;">Disfruta de tu moto al máximo</p>
                                </div>
                            </div>
                            <div class="flex flex-wrap justify-start space-x-3 w-[50%] p-4">
                                <img src="assets/iconos/candado.svg" alt="">
                                <div>
                                    <h3 class="text-[20px] font-semibold text-left" style="font-family: Epilogue;">Seguridad Máxima</h3>
                                    <p class="text-[16px] font-normal text-left" style="font-family: DM Sans;">motos súper seguros</p>
                                </div>
                            </div>
                        </div>
            
                        <div class="m-3 h-[384.33px] relative border-b border-white/10">
                            <div class="w-full text-left flex flex-wrap space-x-1 align-center">
                                <img src="./assets/iconos/asterisco.svg" alt="Icono Información" width="19" height="19" />
                                <div class="text-[#ff3600] text-base font-semibold font-['Epilogue'] leading-tight">Información General</div>
                            </div>
                            <div class="text-left w-full my-2">
                              <div class="text-white text-[40px] font-bold font-['Epilogue']">Conoce a cerca de nuestros servicios</div>
                            </div>
                            <div class=" text-[#cecece] text-base font-normal font-['DM Sans'] text-left">Conduce el ${moto.marca} ${moto.modelo} y experimenta un viaje de lujo, confort y seguridad. Nuestro servicio está diseñado para que disfrutes al máximo, con beneficios exclusivos <br> que garantizan tu tranquilidad.</div>
                            <div class="h-[105.77px] left-0 top-[190.55px] absolute flex-col justify-start items-start gap-[19px] inline-flex">
                              <div class="self-stretch pb-[0.59px] justify-start items-end gap-2.5 inline-flex">
                                <img src="./assets/iconos/tick naranja.svg" alt="Check Icono" width="24" height="24" />
                                <div class="text-white text-lg font-medium font-['Epilogue'] leading-snug">Asistencia en carretera 24h</div>
                              </div>
                              <div class="self-stretch pb-[0.59px] justify-start items-end gap-2.5 inline-flex">
                                <img src="./assets/iconos/tick naranja.svg" alt="Check Icono" width="24" height="24" />
                                <div class="text-white text-lg font-medium font-['Epilogue'] leading-snug">Cancelaciones y devoluciones gratis</div>
                              </div>
                              <div class="self-stretch pb-[0.59px] justify-start items-end gap-2.5 inline-flex">
                                <img src="./assets/iconos/tick naranja.svg" alt="Check Icono" width="24" height="24" />
                                <div class="text-white text-lg font-medium font-['DM Sans'] leading-snug">Alquila ahora paga cuando te lo lleves</div>
                              </div>
                            </div>
                        </div>
                          
                        <div class="my-3 h-[384.33px] relative border-b border-white/10">
                            <div class="w-full text-left flex flex-wrap space-x-1 align-center">
                                <img src="./assets/iconos/asterisco.svg" alt="Icono Información" width="19" height="19" />
                                <div class="text-[#ff3600] text-base font-semibold font-['Epilogue'] leading-tight">Características</div>
                            </div>
                            <div class="text-left w-full my-2">
                              <div class="text-white text-[40px] font-bold font-['Epilogue']">Servicios y características premium</div>
                            </div>
                            <div class=" text-[#cecece] text-base font-normal font-['DM Sans'] text-left my-3">Este ${moto.marca} ${moto.modelo} está equipado con las últimas innovaciones y comodidades, pensado para cubrir todas tus necesidades durante el viaje:</div>
                            <div class="w-[836.66px] h-[126.39px] relative my-3">
                                <div class="w-[170px] left-0 top-[-0.10px] absolute justify-start items-center gap-2.5 inline-flex ">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7 text-left">Sistema de Música</div>
                                </div>
                                <div class="w-[170px] left-[223.67px] top-[-0.27px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7 text-left">Herramientas</div>
                                </div>
                                <div class="w-[170px] left-[428.31px] top-[-0.10px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7 text-left">Sistema ABS</div>
                                </div>
                                <div class="w-[170px] left-[622.67px] top-[-0.27px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7 text-left">Bluetooth</div>
                                </div>
                                <div class="w-[170px] left-[223.67px] top-[48.52px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7  text-left">Cargador USB</div>
                                </div>
                                <div class="w-[170px] left-[428.31px] top-[48.69px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7  text-left">Entrada Auxiliar</div>
                                </div>
                                <div class="w-[250px] left-[120.67px] top-[97.73px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="w-[246px] text-white text-lg font-medium font-['Epilogue'] leading-7  text-left">Neumático de repuesto</div>
                                </div>
                                <div class="left-[0.67px] top-[48.73px] absolute justify-end items-center gap-[9.68px] inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" class="w-[20.32px] h-5" />
                                  <div class="w-[188px] h-[29px] text-white text-lg font-medium font-['Epilogue'] leading-7  text-left">Ventanas eléctricas</div>
                                </div>
                                <div class="w-[350px] left-[428.67px] top-[97.73px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7  text-left">Espacio de maletero completo</div>
                                </div>
                                <div class="w-[170px] pr-[0.49px] left-[622.67px] top-[48.73px] absolute justify-center items-center gap-[9.35px] inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" class="w-[20.32px] h-5" />
                                  <div class="w-[164px] h-[29px] text-white text-lg font-medium font-['Epilogue'] leading-7 text-left">Dirección asistida</div>
                                </div>
                              </div>
                        </div>
            
                        <div class="my-7 relative border-b border-white/10">
                            <div class="w-full text-left flex flex-wrap space-x-1 items-center mb-2">
                              <img src="./assets/iconos/asterisco.svg" alt="Icono Información" width="19" height="19" />
                              <div class="text-[#ff3600] text-base font-semibold font-['Epilogue'] leading-tight">
                                Condiciones de Alquiler
                              </div>
                            </div>
                        
                            <div class="text-left w-full mb-4">
                              <div class="text-white text-[44px] font-bold font-['Epilogue']">
                                Políticas y Acuerdo
                              </div>
                            </div>
                            <div class="space-y-2 max-w-3xl">
                              <!-- Ítem 1 (abierto por defecto) -->
                              <details open data-accordion class="group border border-white/10 rounded-xl overflow-hidden">
                                <summary
                                  class="py-3 px-4 cursor-pointer text-lg font-semibold flex justify-between items-center
                                         bg-[#252525] group-open:bg-[#ff3600] text-left font-['Epilogue']"
                                >
                                  Requisitos de Licencia de Conducir
                                  <span class="text-2xl leading-none group-open:hidden">+</span>
                                  <span class="text-2xl leading-none hidden group-open:inline">–</span>
                                </summary>
                                <div class="p-4 text-sm bg-[#ff3600] transition-all duration-300 ease-in-out text-left font-['DM Sans']">
                                Para poder alquilar uno de nuestros vehículos, es imprescindible presentar una licencia de conducir válida y vigente, emitida por una autoridad competente. Esta licencia debe ser acorde al tipo de vehículo alquilado y cumplir con las regulaciones legales nacionales e internacionales. Además, será necesario presentar un documento de identidad oficial. Nos reservamos el derecho de rechazar reservas si la documentación no es correcta o está caducada.
                                </div>
                              </details>
                              
                        
                              <!-- Ítem 2 -->
                              <details data-accordion class="group border border-white/10 rounded-xl overflow-hidden">
                                <summary
                                  class="py-3 px-4 cursor-pointer text-lg font-semibold flex justify-between items-center
                                         bg-[#252525] group-open:bg-[#ff3600] text-left font-['Epilogue']"
                                >
                                  Póliza de Seguro y Cobertura
                                  <span class="text-2xl leading-none group-open:hidden">+</span>
                                  <span class="text-2xl leading-none hidden group-open:inline">–</span>
                                </summary>
                                <div class="p-4 text-sm bg-[#ff3600] text-left font-['DM Sans']">
                                Todos nuestros alquileres incluyen una cobertura básica que protege ante daños a terceros y responsabilidad civil. Para mayor tranquilidad, ofrecemos opciones de seguros adicionales que cubren daños al vehículo, robo y accidentes. Recomendamos contratar la protección completa para evitar cargos imprevistos en caso de incidentes. Las condiciones específicas de cada seguro se detallan en el contrato.
                                </div>
                              </details>
                        
                              <!-- Ítem 3 -->
                              <details data-accordion class="group border border-white/10 rounded-xl overflow-hidden">
                                <summary
                                  class="py-3 px-4 cursor-pointer text-lg font-semibold flex justify-between items-center
                                         bg-[#252525] group-open:bg-[#ff3600] text-left font-['Epilogue']"
                                >
                                  Métodos de Pago Disponibles
                                  <span class="text-2xl leading-none group-open:hidden">+</span>
                                  <span class="text-2xl leading-none hidden group-open:inline">–</span>
                                </summary>
                                <div class="p-4 text-sm bg-[#ff3600] text-left font-['DM Sans']">
                                Aceptamos diversas formas de pago para tu comodidad: tarjetas de crédito, débito y transferencias bancarias. Además, es posible abonar el importe al momento de recoger el vehículo. El titular de la tarjeta debe coincidir con el titular del contrato de alquiler. Para garantizar tu reserva, podemos solicitar una preautorización o depósito según el tipo de vehículo y la duración del alquiler.
                                </div>
                              </details>
                        
                              <!-- Ítem 4 -->
                              <details data-accordion class="group border border-white/10 rounded-xl overflow-hidden">
                                <summary
                                  class="py-3 px-4 cursor-pointer text-lg font-semibold flex justify-between items-center
                                         bg-[#252525] group-open:bg-[#ff3600] text-left font-['Epilogue']"
                                >
                                  Política de Cancelación y Modificación
                                  <span class="text-2xl leading-none group-open:hidden">+</span>
                                  <span class="text-2xl leading-none hidden group-open:inline">–</span>
                                </summary>
                                <div class="p-4 text-sm bg-[#ff3600] text-left font-['DM Sans']">
                                Cancelaciones: Puedes cancelar tu reserva sin coste hasta 24 horas antes de la hora de inicio del alquiler. Las cancelaciones posteriores pueden estar sujetas a cargos.
                                Modificaciones: Los cambios de fecha son posibles sin penalización, siempre sujetos a la disponibilidad de vehículos. Te recomendamos gestionar cualquier cambio lo antes posible para garantizar tu reserva.
                                </div>
                              </details>
                        
                              <!-- Ítem 5 -->
                              <details data-accordion class="group border border-white/10 rounded-xl overflow-hidden">
                                <summary
                                  class="py-3 px-4 cursor-pointer text-lg font-semibold flex justify-between items-center
                                         bg-[#252525] group-open:bg-[#ff3600] text-left font-['Epilogue']"
                                >
                                  Políticas de Mascotas y de Fumar
                                  <span class="text-2xl leading-none group-open:hidden">+</span>
                                  <span class="text-2xl leading-none hidden group-open:inline">–</span>
                                </summary>
                                <div class="p-4 text-sm bg-[#ff3600] text-left font-['DM Sans']">
                                <ul>
                                  <li><span class="font-bold">Mascotas:</span> Son bienvenidas, siempre que viajen en un transportín adecuado para proteger el interior del vehículo. El cliente será responsable de cualquier daño o limpieza especial derivada del transporte de mascotas. <br></li>
                                  <li><span class="font-bold">Fumar:</span> Está estrictamente prohibido fumar dentro de los vehículos. Esta política busca mantener un ambiente limpio y saludable para futuros clientes. En caso de incumplimiento, se aplicará un cargo adicional por limpieza profunda.</li>
                                </ul>
                                </div>
                              </details>
                        
                              <!-- Ítem 6 -->
                              <details data-accordion class="group border border-white/10 rounded-xl overflow-hidden">
                                <summary
                                  class="py-3 px-4 cursor-pointer text-lg font-semibold flex justify-between items-center
                                         bg-[#252525] group-open:bg-[#ff3600] text-left font-['Epilogue']"
                                >
                                  Requisitos de Edad Mínima
                                  <span class="text-2xl leading-none group-open:hidden">+</span>
                                  <span class="text-2xl leading-none hidden group-open:inline">–</span>
                                </summary>
                                <div class="p-4 text-sm bg-[#ff3600] text-left font-['DM Sans']">
                                <ul>
                                  <li><span class="font-bold">Edad Mínima:</span> Para alquilar un vehículo, debes tener al menos 25 años.</li>
                                  <li><span class="font-bold">Conductores jóvenes (21-24 años):</span> Pueden alquilar con un cargo adicional por conductor joven. Este recargo compensa el mayor riesgo asociado a la menor experiencia al volante. Es posible que se apliquen restricciones en ciertos modelos de vehículos.</li>
                                </ul>
                                </div>
                              </details>
                            </div>
                          </div>
                      </section>
                      
                      
                <!-- Footer -->
                <footer>
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
                  <p class="copy">&copy;2025 LuxeLane. Derechos Reservados</p>
                    
                </footer>
                
                
                
                `);
                const reservarBtn = document.getElementById('reservarBtn');
        if (reservarBtn) {
            reservarBtn.addEventListener('click', function() {
                const motoId = this.getAttribute('data-id');
                console.log(motoId);
                const tipoVehiculo = 'moto';
                window.location.href = `formReservas.html?id=${motoId}&tipoVehiculo=${tipoVehiculo}`;
            });
        } else {
            console.error('No se encontró el botón de reservar');
        }
            },
            error: function(xhr, status, error) {
                toastr.error("Error al obtener los detalles del moto: " + error);
            }
        });
    }

    // Llamar a la función para obtener los detalles del moto
    obtenerDetallesmoto(motoId);


    
})
//haz que se cierren los elementos abiertos del acordeon cada vez que se abra uno nuvo
document.addEventListener('click', function (event) {
    if (!event.target.closest('[data-accordion]')) return;
    const accordion = event.target.closest('[data-accordion]');
    const open = accordion.open;
    document.querySelectorAll('[data-accordion]').forEach((el) => {
      if (el !== accordion && el.open) el.open = false;
    });
  });


