const cochesPorPagina = 10; // Definir la cantidad de coches por página

// Función para obtener coches
function mostrarCoches() {
    $.ajax({
        url: 'http://localhost:8087/coches/todos', // Endpoint para obtener coches con paginación
        type: "GET",
        success: function(response) {
            console.log('Respuesta completa del servidor:', response); // Verificar la respuesta completa

            // Asegurarse de que la respuesta sea un array
            if (Array.isArray(response)) {
                const coches = response; // Usar directamente la respuesta como array

                // Recorrer los coches y mostrarlos
                coches.forEach(function(coche) {
                    var cocheHTML = `
                    <div class="overflow-x-auto flex space-x-4 p-5">
    <!-- Caja de ejemplo, esta se generará dinámicamente -->
    <div class="min-w-[200px] bg-[#191919] text-white rounded-2xl p-3 shadow-lg space-y-4 flex flex-col">
        <div class="w-full">
            <!-- Imagen del coche más pequeña -->
            <img src="./fotos/fotos_coches/${coche.imagen}" alt="${coche.marca} ${coche.modelo}" class="w-full h-32 object-cover rounded-xl" />
        </div>
        <div class="w-full">
            <div class="text-xs bg-gray-800 px-2 py-1 rounded-full w-max">${coche.tipoVehiculo}</div>
            <h2 class="text-lg font-bold text-left">${coche.marca} ${coche.modelo}</h2>
            <ul class="space-y-1 text-sm">
                <li class="flex justify-between gap-2">
                    <div class="flex gap-3">
                        <img src="./assets/iconos/puerta.svg" class="w-4 h-4">
                        Puertas
                    </div>
                    ${coche.numeroPuertas}
                </li>
                <li class="flex justify-between gap-2">
                    <div class="flex gap-3">
                        <img src="./assets/iconos/pasajeros.svg" class="w-4 h-4">
                        ${coche.numeroAsientos} Pasajeros
                    </div>
                </li>
                <li class="flex justify-between gap-2">
                    <div class="flex gap-3">
                        <img src="./assets/iconos/gasolina.svg" class="w-4 h-4">
                        ${coche.tipoMotor}
                    </div>
                    <img src="./assets/iconos/done.svg" class="w-4 h-4">
                </li>
            </ul>
            <div class="flex items-center justify-between mt-4">
                <div>
                    <span class="text-xl font-bold">&euro;${coche.precioPorDia}</span>
                    <span class="text-xs text-gray-400">/Por Día</span>
                </div>
                <img class="hover:scale-[1.1] transition transition-all ease-in-out flecha-btn w-5 h-5" src="./fotos/flecha.svg" data-id="${coche.id}">
            </div>
        </div>
    </div>
    <!-- Las demás cajas se generarán dinámicamente -->
</div>


                    `;
                    $('#vehiculos-container').append(cocheHTML);
                });

                // Agregar evento click a los botones de flecha
                $('.flecha-btn').on('click', function() {
                    var cocheId = $(this).data('id');
                    window.location.href = `../../cocheDetalles.html?id=${cocheId}`;
                });

                // Mostrar el botón "Mostrar más coches" solo si hay más coches para cargar
                if (coches.length === cochesPorPagina) {
                    $('#mostrar-mas-coches').show();
                } else {
                    $('#mostrar-mas-coches').hide();
                }
            } else {
                // Si la respuesta no es un array, mostramos un error
                console.error("Error: La respuesta no es un array. Respuesta:", response);
            }
        },
        error: function(xhr, status, error) {
            toastr.error("Error al obtener los coches: " + error);
        }
    });
}

// Llamar a la función para cargar los coches inicialmente
mostrarCoches();
