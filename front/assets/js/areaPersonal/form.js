$(document).ready(function() {
    var idCoche = $("#id").val();

    // Recoger los datos del formulario
    $('#formularioVehiculo').on('submit', function(e) {
      e.preventDefault();  // Evitar el envío por defecto del formulario
  
      // Recoger los datos del formulario
      var datos = {
        id: idCoche,
        marca: $("#marca").val(),
        modelo: $("#modelo").val(),
        ano: $("#ano").val(),
        cilindrada: $("#cilindrada").val(),
        potenciaHp: $("#potenciaHp").val(),
        capacidadCombustible: $("#capacidadCombustible").val(),
        transmision: $("#transmision").val(),
        numeroPuertas: $("#numeroPuertas").val(),
        numeroAsientos: $("#numeroAsientos").val(),
        color: $("#color").val(),
        airbags: $("#airbags").val(),
        abs: $("#abs").val(),
        controlTraccion: $("#controlTraccion").val(),
        asistenteFrenado: $("#asistenteFrenado").val(),
        kilometraje: $("#kilometraje").val(),
        matricula: $("#matricula").val(),
        tipoVehiculo: $("#tipoVehiculo").val(),
        imagen: $("#imagen").val(),
        precioPorDia: $("#precioPorDia").val(),
        precioPorHora: $("#precioPorHora").val(),
        disponibilidad: $("#disponibilidad").val()
      };
  
      // Verificar que los datos se recogen correctamente (opcional)
      console.log(datos);
  
      // Realizar la solicitud AJAX para guardar los datos
      $.ajax({
        url: 'http://localhost:8087/coches/save/1',
        type: 'POST',
        contentType: 'application/json', // Establece el tipo de contenido como JSON
        dataType: 'json',
        data: JSON.stringify({
            id: 1,
            nombre: 'Coche Ejemplo',
            disponibilidad: 'disponible', // Asegúrate de que el valor sea válido
            // Otros campos del coche que sean necesarios
        }),
        success: function(response) {
            console.log('Coche guardado correctamente:', response);
        },
        error: function(xhr, status, error) {
            console.log('Error en la solicitud:', error);
        }
    });
    
    });
  });
  