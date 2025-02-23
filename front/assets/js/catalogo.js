$(document).ready(function() {
    let pageCoches = 1; // Página de coches
    const cochesPorPagina = 10; // Número de coches a cargar por página
    let filtros = {}; // Objeto para almacenar los filtros aplicados

    // Función para obtener los coches con los filtros aplicados
    function obtenerCoches() {
        // Realizar la solicitud AJAX con los filtros y la paginación
        $.ajax({
            url: `http://localhost:8087/coches/?page=${pageCoches}&limit=${cochesPorPagina}`, // Endpoint con paginación
            type: "GET",
            data: filtros, // Enviar los filtros aplicados
            success: function(response) {
                console.log('Respuesta del servidor:', response); // Verificar la respuesta

                const coches = response.content; // Obtener la lista de coches de la propiedad 'content'

                // Recorrer los coches y mostrarlos
                coches.forEach(function(coche) {
                    var cocheHTML = `
                    <div class="max-w-xs bg-[#191919] text-white rounded-lg p-2 shadow-md space-y-2 caja-coche">
                        <img src="./fotos/fotos_coches/${coche.imagen}" alt="${coche.marca} ${coche.modelo}" class="w-3/4 rounded-md contenido-coche mx-auto" />
                        <div class="text-[8px] bg-gray-800 px-1 py-0.5 rounded-full w-max contenido-coche mx-auto">${coche.tipoVehiculo}</div>
                        <h2 class="text-sm font-bold text-center contenido-coche">${coche.marca} ${coche.modelo}</h2>
                        <ul class="space-y-0.5 contenido-coche text-xs">
                            <li class="flex justify-between gap-1">
                                <div class="flex gap-1">
                                    <img src="./assets/iconos/puerta.svg" class="w-3 h-3">
                                    ${coche.numeroPuertas}
                                </div>
                            </li>
                            <li class="flex justify-between gap-1">
                                <div class="flex gap-1">
                                    <img src="./assets/iconos/pasajeros.svg" class="w-3 h-3">
                                    ${coche.numeroAsientos} Pasajeros
                                </div>
                            </li>
                            <li class="flex justify-between gap-1">
                                <div class="flex gap-1">
                                    <img src="./assets/iconos/gasolina.svg" class="w-3 h-3">
                                    ${coche.tipoMotor}
                                </div>
                                <img src="./assets/iconos/done.svg" class="w-3 h-3">
                            </li>
                        </ul>
                        <div class="flex items-center justify-between mt-2 contenido-coche text-xs">
                            <div>
                                <span class="text-sm font-bold">&euro;${coche.precioPorDia}</span>
                                <span class="text-xs text-gray-400">/Por Día</span>
                            </div>
                            <img class="hover:scale-[1.05] transition transition-all ease-in-out w-4 h-4" src="./fotos/flecha.svg">
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

    // Agregar estilos dinámicos
    $("head").append(`
        <style>
            @media (max-width: 1440px) {
                .caja-coche { max-width: 120px; padding: 5px; }
                .contenido-coche { font-size: 10px; }
            }
        </style>
    `);

    // Llamar a la función para cargar los coches inicialmente
    obtenerCoches();

    // Asegurarse de que el botón "Mostrar más" esté oculto al inicio
    $('#mostrar-mas-coches').hide();

    // Evento al hacer clic en el botón de "Mostrar más coches"
    $('#mostrar-mas-coches').on('click', function() {
        pageCoches++; // Incrementar la página
        obtenerCoches(); // Obtener más coches respetando el filtro
    });

    // Evento al hacer clic en el botón de filtro
    $('#filtrarBtn').on('click', function(e) { // Asegúrate de que el ID coincida
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        $('#vehiculos-container').html(''); // Limpiar el contenedor de vehículos
        pageCoches = 1; // Resetear la página a la primera
        filtros = { // Obtener los filtros aplicados
            tipoVehiculo: $('#tipoVehiculo').val(),
            marca: $('#marca').val(),
            modelo: $('#modelo').val(),
            precioMax: $('#precioRange').val(),
            tipoCombustible: $('#tipoCombustible').val(),
            transmision: $('#transmisionSelect').val()
        };
        // Llamar a la función para cargar los coches con los filtros aplicados
        obtenerCoches();
        $('#mostrar-mas-coches').show(); // Mostrar el botón de "Mostrar más" al aplicar el filtro
    });

    // Manejo de la acción de reserva de un coche
    $(document).on('click', '.btn-reservar', function() {
        var cocheId = $(this).data('id');
        toastr.success("Coche " + cocheId + " reservado exitosamente.");
        // Aquí puedes hacer una nueva llamada AJAX para procesar la reserva si lo necesitas
    });
});
