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
                        <h1>${coche.marca} ${coche.modelo}</h1>
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
                                    <div class="flex items-center justify-start mt-[20px] hover:scale-[1.01] transition transition-all ease-in-out">
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
                            <div class=" text-[#cecece] text-base font-normal font-['DM Sans'] text-left">Lorem pretium fermentum quam, sit amet cursus ante sollicitudin velen morbi consesua the miss sustion<br/>consation porttitor orci sit amet iaculis nisan. Lorem pretium fermentum quam sit amet cursus ante sollicitudin<br/>velen fermen morbinetion consesua the risus consequation the porttiton.</div>
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
                            <div class=" text-[#cecece] text-base font-normal font-['DM Sans'] text-left my-3">Lorem pretium fermentum quam, sit amet cursus ante sollicitudin velen morbi consesua the miss sustion<br/>consation porttitor orci sit amet iaculis nisan. Lorem pretium fermentum quam sit amet cursus ante sollicitudin<br/>velen fermen morbinetion consesua the risus consequation the porttiton.</div>
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
            
                        <div class="my-7 h-[384.33px] relative border-b border-white/10">
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
                                  Es un hecho bien establecido que un lector se distraerá con el contenido legible...
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
                                  Aquí el contenido de la Póliza de Seguro y Cobertura...
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
                                  Aquí el contenido de Métodos de Pago Disponibles...
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
                                  Aquí el contenido de la Política de Cancelación y Modificación...
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
                                  Aquí el contenido de Políticas de Mascotas y de Fumar...
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
                                  Aquí el contenido de Requisitos de Edad Mínima...
                                </div>
                              </details>
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