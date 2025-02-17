$(document).ready(function() {
    // Obtener el ID del coche de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var cocheId = urlParams.get('id');

    // Función para obtener los detalles del coche
    function obtenerDetallesCoche(id) {
        $.ajax({
            url: `http://localhost:8087/coches/verDetalle/${id}`, // Ruta al endpoint del backend
            type: "GET",
            success: function(coche) {
                // Mostrar los detalles del coche en la página
                $('body').html(`
                <!-- Barra de navegación -->
                <!-- Header Principal -->
                <header class="header">
                    <div class="logo">
                      <img src="./fotos/logo.png" alt="Logo"> <!-- Aquí puedes poner tu logo, si tienes -->
                      <p>
                        <span style="color:  rgb(255, 54, 0);">Luxe</span><span style="color: white;">Lane</span>
                      </p>
                    </div>
                
                    <nav>
                      <a href="./index.html">Inicio</a>
                      <a href="#">Coches</a>
                      <a href="#">Motos</a>
                      <a href="#">Chófers</a>
                      <a href="#">Sobre Nosotros</a>
                      <a href="#">Contáctanos</a>
                      <div class="button-container-nav">
                        <a href="/front/login.html" class="button button-reservar">Area Personal</a>
                      </div>
                    </nav>
                  </header>
            
                <!-- Banner con fondo de coches -->
                <section class="banner">
                    <div class="banner-text">
                        <h1 font-['Epilogue']>${coche.marca} ${coche.modelo}</h1>
                    </div>
                </section>
            
            
                <!-- Contenido Principal -->
            
                    <!-- Tarjeta de Vehículo -->
                    <section class="filtro">
                        <div class="ml-[100px] mt-[100px] bg-[#202020] rounded-xl shadow-xl p-8 w-[375px] max-w-md z-10 sticky z-99 top-[20px]">
                          <div class="text-left mb-6">
                            <h1 class="text-[50px] font-bold" style="font-family: DM sans;">€${coche.precioPorDia} <span class="text-[16px] font-normal">/dia</span></h1>
                            <hr class="bg-[#2c2c2c] my-2 h-[2px]">
                          </div>
                          <div>
                                    <ul class="space-y-[24.7px]">
                                        <li class="flex justify-between gap-2">
                                            <div class="flex gap-3">
                                                <img src="./assets/iconos/puerta.svg">
                                                Puertas
                                            </div>
                                            ${coche.numeroPuertas}
                                        </li>
                                        <li class="flex justify-between gap-2">
                                            <div class="flex gap-3">
                                                <img src="./assets/iconos/pasajeros.svg">
                                                Pasajeros
                                            </div>
                                            ${coche.numeroAsientos}
                                        </li>
                                        <li class="flex justify-between gap-2">
                                            <div class="flex gap-3">
                                                <img src="./assets/iconos/transmision.svg">
                                                Transmisión
                                            </div>
                                            ${coche.transmision}
                                        </li>
                                        <li class="flex justify-between gap-2">
                                            <div class="flex gap-3">
                                                <img src="./assets/iconos/gasolina.svg">
                                                ${coche.tipoMotor}
                                            </div>
                                            <img src="./assets/iconos/done.svg">
                                        </li>
                                        <li class="flex justify-between gap-2">
                                            <div class="flex gap-3">
                                                <img src="./assets/iconos/aire.svg">
                                                Aire Acondicionado
                                            </div>
                                            <img src="./assets/iconos/done.svg">
                                        </li>
                                        <hr class="bg-[#2c2c2c] my-2 h-[2px]">
                                    </ul>
                                    <div class="flex items-center justify-start mt-[20px] hover:scale-[1.01] transition transition-all ease-in-out" id="reservarBtn" data-id="${coche.id}">
                                        <button class="bg-[#FF3600] rounded-full text-white p-3 text-[16px] font-bold " style="font-family: DM sans;">Reservar</button>
                                        <img class=" flecha-btn" src="./fotos/flecha.svg" data-id="${coche.id}">
                                    </div>
                                    </div>
                          </div>
                        </div>
                      </section>
                      <section class="catalogo pl-7 rounded flex justify-start flex-col">
                        <img class="h-[480px] w-[800px] rounded-xl" src="fotos/fotos_coche_verDetalle/${coche.imagen}" alt="">
                        <div class="w-[800px] border rounded-xl border-1 border-[#ffffff15] my-5 flex flex-wrap justify-between">
                            <div class="flex flex-wrap justify-start space-x-3 w-[50%] p-4">
                                <img src="assets/iconos/kilometros.svg" alt="">
                                <div>
                                    <h3 class="text-[20px] font-semibold text-left" style="font-family: Epilogue;">Kilometraje Ilimitado</h3>
                                    <p class="text-[16px] font-normal text-left" style="font-family: DM Sans;">Disfruta de tu coche al máximo</p>
                                </div>
                            </div>
                            <div class="flex flex-wrap justify-start space-x-3 w-[50%] p-4">
                                <img src="assets/iconos/candado.svg" alt="">
                                <div>
                                    <h3 class="text-[20px] font-semibold text-left" style="font-family: Epilogue;">Seguridad Máxima</h3>
                                    <p class="text-[16px] font-normal text-left" style="font-family: DM Sans;">Coches súper seguros</p>
                                </div>
                            </div>
                        </div>
            
                        <div class="my-3 h-[384.33px] relative border-b border-white/10">
                            <div class="w-full text-left flex flex-wrap space-x-1 align-center">
                                <img src="./assets/iconos/asterisco.svg" alt="Icono Información" width="19" height="19" />
                                <div class="text-[#ff3600] text-base font-semibold font-['Epilogue'] leading-tight">Información General</div>
                            </div>
                            <div class="text-left w-full my-2">
                              <div class="text-white text-[44px] font-bold font-['Epilogue']">Conoce a cerca de nuestros servicios</div>
                            </div>
                            <div class=" text-[#cecece] text-base font-normal font-['DM Sans'] text-left">Conduce el ${coche.marca} ${coche.modelo} y experimenta un viaje de lujo, confort y seguridad. Nuestro servicio está diseñado para que disfrutes al máximo, con beneficios exclusivos <br> que garantizan tu tranquilidad.</div>
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
                              <div class="text-white text-[44px] font-bold font-['Epilogue']">Servicios y características premium</div>
                            </div>
                            <div class=" text-[#cecece] text-base font-normal font-['DM Sans'] text-left my-3">Este ${coche.marca} ${coche.modelo} está equipado con las últimas innovaciones y comodidades, pensado para cubrir todas tus necesidades durante el viaje:</div>
                            <div class="w-[836.66px] h-[126.39px] relative my-3">
                                <div class="w-[200px] left-0 top-[-0.10px] absolute justify-start items-center gap-2.5 inline-flex ">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7 text-left">Sistema de Música</div>
                                </div>
                                <div class="w-[200px] left-[223.67px] top-[-0.27px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7 text-left">Herramientas</div>
                                </div>
                                <div class="w-[200px] left-[428.31px] top-[-0.10px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7 text-left">Sistema ABS</div>
                                </div>
                                <div class="w-[200px] left-[622.67px] top-[-0.27px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7 text-left">Bluetooth</div>
                                </div>
                                <div class="w-[200px] left-[223.67px] top-[48.52px] absolute justify-start items-center gap-2.5 inline-flex">
                                  <img src="./assets/iconos/tick naranja.svg" alt="Icono" />
                                  <div class="text-white text-lg font-medium font-['Epilogue'] leading-7  text-left">Cargador USB</div>
                                </div>
                                <div class="w-[200px] left-[428.31px] top-[48.69px] absolute justify-start items-center gap-2.5 inline-flex">
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
                                <div class="w-[200px] pr-[0.49px] left-[622.67px] top-[48.73px] absolute justify-center items-center gap-[9.35px] inline-flex">
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

                          <div id="reservarModal" class="fixed inset-0 bg-[#111] bg-opacity-50 flex items-center justify-center hidden">
                          <div class="bg-[#202020] rounded-xl shadow-xl p-8 w-full max-w-md z-10">
                              <h2 class="text-3xl text-white font-bold mb-6">Reservar Coche</h2>
                              <form id="reservarForm" class="space-y-6">
                                  <div>
                                      <label for="usuario_id" class="block text-gray-300 mb-1">Usuario ID</label>
                                      <input type="number" id="usuario_id" name="usuario_id" class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3600]" />
                                  </div>
                                  <div>
                                      <label for="coche_id" class="block text-gray-300 mb-1">Coche ID</label>
                                      <input type="number" id="coche_id" name="coche_id" class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3600]" />
                                  </div>
                                  <div>
                                      <label for="chofer_id" class="block text-gray-300 mb-1">Chofer ID</label>
                                      <input type="number" id="chofer_id" name="chofer_id" class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3600]" />
                                  </div>
                                  <div>
                                      <label for="fecha_inicio" class="block text-gray-300 mb-1">Fecha Inicio</label>
                                      <input type="datetime-local" id="fecha_inicio" name="fecha_inicio" class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3600]" />
                                  </div>
                                  <div>
                                      <label for="fecha_fin" class="block text-gray-300 mb-1">Fecha Fin</label>
                                      <input type="datetime-local" id="fecha_fin" name="fecha_fin" class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3600]" />
                                  </div>
                                  <div>
                                      <label for="estado" class="block text-gray-300 mb-1">Estado</label>
                                      <input type="text" id="estado" name="estado" class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3600]" />
                                  </div>
                                  <div>
                                      <label for="precio_total" class="block text-gray-300 mb-1">Precio Total</label>
                                      <input type="number" step="0.01" id="precio_total" name="precio_total" class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3600]" />
                                  </div>
                                  <div class="flex justify-end">
                                      <button type="button" id="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Cancelar</button>
                                      <button type="submit" class="bg-[#ff3600] text-white px-4 py-2 rounded-lg hover:bg-[#e10000]">Reservar</button>
                                  </div>
                              </form>
                          </div>
                      </div>
                      
            
                      </section>
                      
                      
                <!-- Footer -->
                <footer>
                    <div class="footer-content">
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
                   <p class="copy">&copy;2024 LuxeLane. Derechos Resevados</p>
                    
                </footer>
                
                
                
                `);
            },
            error: function(xhr, status, error) {
                toastr.error("Error al obtener los detalles del coche: " + error);
            }
        });
    }

    // Llamar a la función para obtener los detalles del coche
    obtenerDetallesCoche(cocheId);

    
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

