$(document).ready(function() {
    let pageCoches = 1; // Página de coches
    const cochesPorPagina = 10; // Número de coches a cargar por página

    // Función para obtener coches
    function obtenerCoches() {
        $.ajax({
            url: `http://localhost:8087/coches/?page=${pageCoches}&limit=${cochesPorPagina}`, // Endpoint para obtener coches con paginación
            type: "GET",
            success: function(response) {
                console.log('Respuesta del servidor:', response); // Verificar la respuesta

                // Asegurarse de que el contenido es un array de coches
                const coches = response.content; // Obtener la lista de coches de la propiedad 'content'

                // Recorrer los coches y mostrarlos
                coches.forEach(function(coche) {
                    var cocheHTML = `
                    <div class="max-w-sm bg-[#191919] text-white rounded-2xl p-5 shadow-lg space-y-4">
                        <img src="./fotos/fotos_coches/${coche.imagen}" alt="${coche.marca} ${coche.modelo}" class="w-full rounded-xl" />
                        <div class="text-xs bg-gray-800 px-2 py-1 rounded-full w-max">${coche.tipoVehiculo}</div>
                        <h2 class="text-2xl font-bold text-left">${coche.marca} ${coche.modelo}</h2>
                        <ul class="space-y-1">
                            <li class="flex justify-between gap-2">
                                <div class="flex gap-3">
                                    <img src="./assets/iconos/puerta.svg">
                                    ${coche.numeroPuertas}
                                </div>
                            </li>
                            <li class="flex justify-between gap-2">
                                <div class="flex gap-3">
                                    <img src="./assets/iconos/pasajeros.svg">
                                    ${coche.numeroAsientos} Pasajeros
                                </div>
                            </li>
                            <li class="flex justify-between gap-2">
                                <div class="flex gap-3">
                                    <img src="./assets/iconos/gasolina.svg">
                                    ${coche.tipoMotor}
                                </div>
                                <img src="./assets/iconos/done.svg">
                            </li>
                        </ul>
                        <div class="flex items-center justify-between mt-4">
                        <div>
                            <span class="text-2xl font-bold">&euro;${coche.precio}</span>
                            <span class="text-sm text-gray-400">/Por Día</span>
                        </div>
                            <img class="hover:scale-[1.1] transition transition-all ease-in-out" src="./fotos/flecha.svg">
                        </div>
                    </div>
                    `;
                    $('#vehiculos-container').append(cocheHTML);
                });

                // Mostrar el botón "Mostrar más coches" solo si hay más coches para cargar
                if (coches.length === cochesPorPagina) {
                    $('#mostrar-mas-coches').show();
                } else {
                    $('#mostrar-mas-coches').hide();
                }
            },
            error: function(xhr, status, error) {
                toastr.error("Error al obtener los coches: " + error);
            }
        });
    }

    // Llamar a la función para cargar los coches inicialmente
    obtenerCoches();

    // Asegurarse de que el botón "Mostrar más" esté oculto al inicio
    $('#mostrar-mas-coches').hide();

    // Evento al hacer clic en el botón de "Mostrar más coches"
    $('#mostrar-mas-coches').on('click', function() {
        pageCoches++; // Incrementar la página
        obtenerCoches(); // Obtener más coches
    });

    // Evento al hacer clic en el botón de filtro
    $('#filtrarBtn').on('click', function(e) { // Asegúrate de que el ID coincida
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        $('#vehiculos-container').html(''); // Limpiar el contenedor de vehículos
        pageCoches = 1; // Resetear la página
        obtenerCoches(); // Obtener coches con los filtros aplicados
    });

    // Manejo de la acción de reserva de un coche
    $(document).on('click', '.btn-reservar', function() {
        var cocheId = $(this).data('id');
        toastr.success("Coche " + cocheId + " reservado exitosamente.");
        // Aquí puedes hacer una nueva llamada AJAX para procesar la reserva si lo necesitas
    });
});
