$(document).ready(function() {
    let coches = []; // Guardar todos los coches
    let pageCoches = 1; // Página actual
    const cochesPorPagina = 10; // Número de coches por página

    // Obtener todos los coches desde el backend
    function obtenerTodosCoches() {
        $.ajax({
            url: "http://localhost:8087/coches/", // Ahora obtenemos todos los coches sin paginación
            type: "GET",
            success: function(response) {
                coches = response; // Guardamos todos los coches
                pageCoches = 1; // Reseteamos la página
                $('#vehiculos-container').empty(); // Limpiamos el contenedor
                mostrarCoches(); // Mostramos los primeros coches
            },
            error: function(xhr, status, error) {
                toastr.error("Error al obtener los coches: " + error);
            }
        });
    }

    // Función para mostrar coches paginados
    function mostrarCoches() {
        const inicio = (pageCoches - 1) * cochesPorPagina;
        const fin = pageCoches * cochesPorPagina;
        const cochesAMostrar = coches.slice(inicio, fin);

        cochesAMostrar.forEach(function(coche) {
            const cocheHTML = `
                <div class="max-w-sm bg-[#191919] text-white rounded-2xl p-5 shadow-lg space-y-4 flex flex-wrap justify-between flex-col">
                    <div class="w-100">
                        <img src="./fotos/fotos_coches/${coche.imagen}" alt="${coche.marca} ${coche.modelo}" class="w-full rounded-xl" />
                    </div>
                    <div class="w-full">
                        <div class="text-xs bg-gray-800 px-2 py-1 rounded-full w-max">${coche.tipoVehiculo}</div>
                        <h2 class="text-2xl font-bold text-left">${coche.marca} ${coche.modelo}</h2>
                        <ul class="space-y-1">
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
                                <span class="text-2xl font-bold">&euro;${coche.precioPorDia}</span>
                                <span class="text-sm text-gray-400">/Por Día</span>
                            </div>
                            <img class="hover:scale-[1.1] transition-all ease-in-out flecha-btn" src="./fotos/flecha.svg" data-id="${coche.id}">
                        </div>
                    </div>
                </div>
            `;
            $('#vehiculos-container').append(cocheHTML);
        });

        // Agregar evento click a los botones de flecha
        $('.flecha-btn').on('click', function() {
            const cocheId = $(this).data('id');
            window.location.href = `./cocheDetalles.html?id=${cocheId}`;
        });

        // Mostrar o ocultar el botón "Mostrar más"
        if (fin < coches.length) {
            $('#mostrar-mas-coches').show();
        } else {
            $('#mostrar-mas-coches').hide();
        }
    }

    // Evento al hacer clic en el botón "Mostrar más coches"
    $('#mostrar-mas-coches').on('click', function() {
        pageCoches++;
        mostrarCoches();
    });

    // Evento al hacer clic en el botón de filtro
    $('#filtrarBtn').on('click', function(e) {
        e.preventDefault();
        const filtro = $('#filtroInput').val().toLowerCase(); // Ejemplo de filtro por texto

        const cochesFiltrados = coches.filter(coche => {
            return coche.marca.toLowerCase().includes(filtro) ||
                   coche.modelo.toLowerCase().includes(filtro);
        });

        $('#vehiculos-container').empty(); // Limpiar el contenedor
        pageCoches = 1; // Reiniciar página
        coches = cochesFiltrados; // Actualizar la lista con los coches filtrados
        mostrarCoches();
    });

    // Llamada inicial para obtener y mostrar los coches
    obtenerTodosCoches();
});
