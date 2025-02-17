$(document).ready(function() {

    document.addEventListener('click', function (event) {
        if (event.target.closest('#reservarBtn')) {
            $('#reservarModal').removeClass('hidden');
        }
    
        if (event.target.closest('#closeModal')) {
            $('#reservarModal').addClass('hidden');
        }
    });
    // Obtener los datos del formulario
    $('#reserva-form').on('submit', function(e) {
        e.preventDefault();
        const datosReserva = {
            idCoche: $('#idCoche').val(),
            fechaInicio: $('#fechaInicio').val(),
            fechaFin: $('#fechaFin').val(),
            nombre: $('#nombre').val(),
            apellidos: $('#apellidos').val(),
            email: $('#email').val(),
            telefono: $('#telefono').val(),
            direccion: $('#direccion').val(),
            ciudad: $('#ciudad').val(),
            codigoPostal: $('#codigoPostal').val(),
            provincia: $('#provincia').val(),
            pais: $('#pais').val()
        };
        console.log('Datos de la reserva:', datosReserva);

        // Enviar los datos de la reserva al servidor
        $.ajax({
            url: 'http://localhost:8087/reservas',
            method: 'POST',
            data: JSON.stringify(datosReserva),
            contentType: 'application/json',
            success: function(response) {
                console.log('Respuesta del servidor:', response);
                alert('Reserva realizada con éxito');
                window.location.href = 'reservas.html';
            },
            error: function() {
                console.log('No se pudo realizar la reserva');
                alert('No se pudo realizar la reserva');
            }
        });
    });
}); 
