$(document).ready(function() {
    // Obtener coches al cargar la página
    function obtenerCoches() {


        $.ajax({
            url: "http://localhost:8087/coches/", // Ruta al endpoint del backend
            type: "GET",
            success: function(coches) {
                // Limpiar el contenedor antes de agregar los coches
                $('#vehiculos-container').html('');

                // Recorrer los coches y mostrarlos
                coches.forEach(function(coche) {
                    var cocheHTML = `
                    <div class="max-w-sm bg-[#191919] text-white rounded-2xl p-5 shadow-lg space-y-4">
                        <img src="./fotos/fotos_coches/${coche.imagen}" alt="Honda CRV" class="w-full rounded-xl" />
                        <div class="text-xs bg-gray-800 px-2 py-1 rounded-full w-max">${coche.tipoVehiculo}</div>
                        <h2 class="text-2xl font-bold text-left">${coche.marca} ${coche.modelo}</h2>
                        <ul class="space-y-1">
                            <li class="flex justify-between gap-2">
                                <div class="flex gap-3">
                                    <img src="./assets/iconos/puerta.svg">
                                    ${coche.numeroPuertas}
                                </div>
                                4
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
                                    <img src="./assets/iconos/gasolina.svg">
                                    ${coche.tipoMotor}
                                </div>
                                <img src="./assets/iconos/done.svg">
                            </li>
                        </ul>
                        <div class="flex items-center justify-between mt-4">
                        <div>
                            <span class="text-2xl font-bold">&euro;219</span>
                            <span class="text-sm text-gray-400">/Por Día</span>
                        </div>
                            <img class="hover:scale-[1.1] transition transition-all ease-in-out" src="./fotos/flecha.svg">
                            
                        </div>
                        </div>

                    `;
                    $('#vehiculos-container').append(cocheHTML);
                });
                
            },
            error: function(xhr, status, error) {
                toastr.error("Error al obtener los coches: " + error);
            }
        });
    }

    // Llamar a la función para cargar los coches inicialmente
    obtenerCoches();

    // Evento al hacer clic en el botón de filtro
    $('#filtro-btn').on('click', function(e) {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        obtenerCoches(); // Obtener coches con los filtros aplicados
    });

    // Manejo de la acción de reserva de un coche (ejemplo de cómo hacer algo con el ID)
    $(document).on('click', '.btn-reservar', function() {
        var cocheId = $(this).data('id');
        toastr.success("Coche " + cocheId + " reservado exitosamente.");
        // Aquí puedes hacer una nueva llamada AJAX para procesar la reserva si lo necesitas
    });
});
