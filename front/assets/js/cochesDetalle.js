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
                $('#detalle-coche').html(`
                    <h1>${coche.marca} ${coche.modelo}</h1>
                    <img src="./fotos/fotos_coches/${coche.imagen}" alt="${coche.marca} ${coche.modelo}" />
                    <p>Tipo de Vehículo: ${coche.tipoVehiculo}</p>
                    <p>Puertas: ${coche.numeroPuertas}</p>
                    <p>Pasajeros: ${coche.numeroAsientos}</p>
                    <p>Motor: ${coche.tipoMotor}</p>
                    <p>Precio por Día: &euro;${coche.precioPorDia}</p>
                `);
            },
            error: function(xhr, status, error) {
                toastr.error("Error al obtener los detalles del coche: " + error);
            }
        });
    }

    // Llamar a la función para obtener los detalles del coche
    obtenerDetallesCoche(cocheId);
});