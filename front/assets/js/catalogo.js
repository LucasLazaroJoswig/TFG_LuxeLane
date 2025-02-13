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
                        <div class="vehiculo">
                            <img src="./fotos/${coche.imagenUrl}" alt="${coche.marca} ${coche.modelo}">
                            <h3>${coche.marca} ${coche.modelo}</h3>
                            <p>${coche.tipoVehiculo} | ${coche.tipoCombustible}</p>
                            <span>${coche.precioPorDia} / Día</span>
                            <button class="btn-reservar" data-id="${coche.id}">Reservar</button>
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
