$(document).ready(function() {
    
    // Recoger los datos del formulario de moto
    $('#formularioMoto').on('submit', function(e) {
      e.preventDefault();  // Evitar el envío por defecto del formulario
      
      // Datos comunes y específicos de motos
      var id = $("#id").val();
      var marca = $("#marca").val();
      var modelo = $("#modelo").val();
      var ano = $("#ano").val();
      var cilindrada = $("#cilindrada").val();
      var potenciaHp = $("#potenciaHp").val();
      var tipoMotor = $("#tipoMotor").val();
      var capacidadCombustible = $("#capacidadCombustible").val();
      var etiquetaMedioambiental = $("#etiquetaMedioambiental").val();
      
      var transmision = $("#transmision").val();
      var tipoFrenoDelantero = $("#tipoFrenoDelantero").val();
      var tipoFrenoTrasero = $("#tipoFrenoTrasero").val();
      var tipoSuspension = $("#tipoSuspension").val();
      var capacidadCargaKg = $("#capacidadCargaKg").val();
      
      var abs = $("#abs").val();
      var controlTraccion = $("#controlTraccion").val();
      var encendidoElectronico = $("#encendidoElectronico").val();
      
      var color = $("#color").val();
      var kilometraje = $("#kilometraje").val();
      var matricula = $("#matricula").val();
      var tipoVehiculo = $("#tipoVehiculo").val();
      var imagen = $("#imagen").val();
      var precioPorDia = $("#precioPorDia").val();
      var precioPorHora = $("#precioPorHora").val();
      var disponibilidad = $("#disponibilidad").val();
      
      // Si id es 0, se añade una nueva moto
      if(id == 0){
        $.ajax({
          url: `http://localhost:8087/motos/guardar`,
          type: 'POST',
          contentType: 'application/json', // Establece el tipo de contenido como JSON
          dataType: 'json',
          data: JSON.stringify({
            marca: marca,
            modelo: modelo,
            año: ano,
            cilindrada: cilindrada,
            potenciaHp: potenciaHp,
            tipoMotor: tipoMotor,
            capacidadCombustible: capacidadCombustible,
            etiquetaMedioambiental: etiquetaMedioambiental,
            transmision: transmision,
            tipoFrenoDelantero: tipoFrenoDelantero,
            tipoFrenoTrasero: tipoFrenoTrasero,
            tipoSuspension: tipoSuspension,
            capacidadCargaKg: capacidadCargaKg,
            abs: abs,
            controlTraccion: controlTraccion,
            encendidoElectronico: encendidoElectronico,
            color: color,
            kilometraje: kilometraje,
            matricula: matricula,
            tipoVehiculo: tipoVehiculo,
            imagen: imagen,
            precioPorDia: precioPorDia,
            precioPorHora: precioPorHora,
            disponibilidad: disponibilidad 
          }),
          success: function(response) {
            console.log('Moto insertada correctamente:', response);
            if(response){
              toastr.success("Moto insertada correctamente.");
              setTimeout(function() {
                window.location.href = `list_motos.html`;
              }, 2000);
            }
          },
          error: function(xhr, status, error) {
            console.log("Error en la solicitud:", status, error);
            try {
                let responseJSON = JSON.parse(xhr.responseText);
                if (responseJSON.error) {
                    toastr.error(responseJSON.error);
                } else {
                    toastr.error("Ocurrió un error inesperado.");
                }
            } catch (e) {
                toastr.error("No se pudo procesar la respuesta del servidor.");
            }
          }
        });
      } else {
        // Si id es distinto de 0, se actualiza la moto existente
        $.ajax({
          url: `http://localhost:8087/motos/save/${id}`,
          type: 'PUT',
          contentType: 'application/json', // Establece el tipo de contenido como JSON
          dataType: 'json',
          data: JSON.stringify({
            id: id,
            marca: marca,
            modelo: modelo,
            año: ano,
            cilindrada: cilindrada,
            potenciaHp: potenciaHp,
            tipoMotor: tipoMotor,
            capacidadCombustible: capacidadCombustible,
            etiquetaMedioambiental: etiquetaMedioambiental,
            transmision: transmision,
            tipoFrenoDelantero: tipoFrenoDelantero,
            tipoFrenoTrasero: tipoFrenoTrasero,
            tipoSuspension: tipoSuspension,
            capacidadCargaKg: capacidadCargaKg,
            abs: abs,
            controlTraccion: controlTraccion,
            encendidoElectronico: encendidoElectronico,
            color: color,
            kilometraje: kilometraje,
            matricula: matricula,
            tipoVehiculo: tipoVehiculo,
            imagen: imagen,
            precioPorDia: precioPorDia,
            precioPorHora: precioPorHora,
            disponibilidad: disponibilidad
          }),
          success: function(response) {
            console.log('Moto guardada correctamente:', response);
            if(response){
              toastr.success("Datos modificados correctamente.");
              setTimeout(function() {
                window.location.href = `list_motos.html`;
              }, 2000);
            }
          },
          error: function(xhr, status, error) {
            console.log('Error en la solicitud:', error);
          }
        });
      }
      
    });
  });
  