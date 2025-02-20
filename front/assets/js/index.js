const cochesPorPagina = 10; // Cantidad de coches por página
const cochesPorSlide = 4; // Cantidad de coches visibles por cada slide del carrusel

// Función para obtener y mostrar coches en el carrusel
function mostrarCoches() {
    $.ajax({
        url: 'http://localhost:8087/coches/todos', // Endpoint para obtener coches
        type: "GET",
        success: function(response) {
            console.log('Respuesta completa del servidor:', response);

            if (Array.isArray(response)) {
                const coches = response;
                let carouselInnerHTML = '';
                let gruposDeCoches = [];

                // Dividir los coches en grupos de 4
                for (let i = 0; i < coches.length; i += cochesPorSlide) {
                    gruposDeCoches.push(coches.slice(i, i + cochesPorSlide));
                }

                // Generar los elementos del carrusel
                gruposDeCoches.forEach((grupo, index) => {
                    let isActive = index === 0 ? 'active' : ''; // Solo el primer grupo debe estar activo
                    let cochesHTML = grupo.map(coche => `
                        <div class="col-lg-3 col-md-4 col-6"> <!-- 4 en pantallas grandes, 3 en medianas, 2 en móviles -->
                            <div class="card text-white p-4 shadow-lg" style="height: 500px; width: 90%; margin: 0 auto; background-color: #191919; border-radius: 25px;"> <!-- Ancho ajustado al 80% y centrado -->
                                <div class="w-100" style="height: 160px; position: relative;">
                                    <!-- Imagen ajustada a un tamaño fijo -->
                                    <img src="./fotos/fotos_coches/${coche.imagen}" alt="${coche.marca} ${coche.modelo}" class="d-block w-100" style="height: 100%; object-fit: cover; border-radius: 25px;">
                                </div>
                                <div class="card-body" style="height: 230px;  position: relative;"> <!-- Aumento de altura del contenido -->
                                    <span class="badge bg-secondary">${coche.tipoVehiculo}</span>
                                    <h2 class="card-title fs-4">${coche.marca} ${coche.modelo}</h2>
                                    <ul class="list-unstyled text-md">
                                        <li class="d-flex justify-content-between">
                                            <div class="d-flex align-items-center gap-2">
                                                <img src="./assets/iconos/puerta.svg" class="w-5 h-5">
                                                Puertas
                                            </div>
                                            ${coche.numeroPuertas}
                                        </li>
                                        <li class="d-flex justify-content-between">
                                            <div class="d-flex align-items-center gap-2">
                                                <img src="./assets/iconos/pasajeros.svg" class="w-5 h-5">
                                                ${coche.numeroAsientos} Pasajeros
                                            </div>
                                        </li>   
                                    </ul>
                                    <div class="d-flex justify-content-between align-items-center mt-4" style="position: absolute; bottom: 10px; width: 100%;">
                                        <div>
                                            <span class="fs-4 fw-bold">&euro;${coche.precioPorDia}</span>
                                            <span class="text small">/Por Día</span>
                                        </div>
                                        <img class="flecha-btn w-5 h-5" src="./fotos/flecha.svg" data-id="${coche.id}" style="position: absolute; bottom: 10px; right: 10px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join(''); 

                    // Agregar el grupo de coches al carrusel
                    carouselInnerHTML += `
                        <div class="carousel-item ${isActive}">
                            <div class="row justify-content-center">${cochesHTML}</div>
                        </div>
                    `;
                });

                // Insertar el carrusel en el DOM con los ajustes de tamaño y centrado
                $('#vehiculos-container').html(`
                <div id="carCarousel" class="carousel slide mx-auto" data-bs-ride="false" style="max-width: 87%;"> <!-- Se elimina el auto-ride -->
                    <div class="carousel-inner">${carouselInnerHTML}</div>
                    <div class="carousel-controls">
                        <!-- Botón de control personalizado anterior -->
                        <button class="carousel-control-prev" type="button" data-bs-target="#carCarousel" data-bs-slide="prev">
                            <img src="assets/iconos/Button - Previous slide.svg" alt="Anterior" width="50" height="50">
                        </button>
                        <!-- Botón de control personalizado siguiente -->
                        <button class="carousel-control-next" type="button" data-bs-target="#carCarousel" data-bs-slide="next">
                            <img src="assets/iconos/Button - Next slide.svg" alt="Siguiente" width="50" height="50">
                        </button>
                    </div>
                </div>
            `);

                // Evento para los botones de detalles
                $('.flecha-btn').on('click', function() {
                    var cocheId = $(this).data('id');
                    window.location.href = `cocheDetalles.html?id=${cocheId}`;
                });

            } else {
                console.error("Error: La respuesta no es un array. Respuesta:", response);
            }
        },
        error: function(xhr, status, error) {
            toastr.error("Error al obtener los coches: " + error);
        }
    });
}

// Llamar a la función para cargar los coches
mostrarCoches();
