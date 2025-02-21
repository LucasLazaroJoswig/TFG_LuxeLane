$(document).ready(function() {
    
    
    // Recoger los datos del formulario
    $('#formularioVehiculo').on('submit', function(e) {
      e.preventDefault();  // Evitar el envío por defecto del formulario
      var id = $("#id").val();
      var marca = $("#marca").val();
      var modelo = $("#modelo").val();
      var ano = $("#ano").val();
      var cilindrada = $("#cilindrada").val();
      var potenciaHp = $("#potenciaHp").val();
      var capacidadCombustible = $("#capacidadCombustible").val();
      var transmision = $("#transmision").val();
      var numeroPuertas = $("#numeroPuertas").val();
      var numeroAsientos = $("#numeroAsientos").val();
      var color = $("#color").val();
      var airbags = $("#airbags").val();
      var abs = $("#abs").val();
      var camaraReversa = $("#camaraReversa").val();
      var bluetooth = $("#bluetooth").val();
      var gps = $("#gps").val();
      var aireAcondicionado = $("#aireAcondicionado").val();
      var sensoresEstacionamiento = $("#sensoresEstacionamiento").val();
      var controlTraccion = $("#controlTraccion").val();
      var asistenteFrenado = $("#asistenteFrenado").val();
      var kilometraje = $("#kilometraje").val();
      var matricula = $("#matricula").val();
      var tipoVehiculo = $("#tipoVehiculo").val();
      var imagen = $("#imagen").val();
      var etiquetaMedioambiental = $("#etiquetaMedioambiental").val();
      var tipoMotor = $("#tipoMotor").val();
      var precioPorDia = $("#precioPorDia").val();
      var precioPorHora = $("#precioPorHora").val();
      var disponibilidad = $("#disponibilidad").val();
      // Realizar la solicitud AJAX para guardar los datos
      
      if(id == 0){
        //metodo para añadir
        $.ajax({
          url: `http://localhost:8087/coches/guardar`,
          type: 'POST',
          contentType: 'application/json', // Establece el tipo de contenido como JSON
          dataType: 'json',
          data: JSON.stringify({
            marca: marca,
            modelo: modelo,
            año: ano,
            cilindrada: cilindrada,
            potenciaHp: potenciaHp,
            capacidadCombustible: capacidadCombustible,
            transmision: transmision,
            numeroPuertas: numeroPuertas,
            numeroAsientos: numeroAsientos,
            color: color,
            airbags: airbags,
            abs: abs,
            camaraReversa: camaraReversa,
            gps: gps,
            aireAcondicionado: aireAcondicionado,
            sensoresEstacionamiento: sensoresEstacionamiento,
            bluetooth: bluetooth,
            controlTraccion: controlTraccion,
            asistenteFrenado: asistenteFrenado,
            kilometraje: kilometraje,
            matricula: matricula,
            tipoVehiculo: tipoVehiculo,
            imagen: imagen,
            etiquetaMedioambiental:etiquetaMedioambiental,
            tipoMotor:tipoMotor,
            precioPorDia: precioPorDia,
            precioPorHora: precioPorHora,
            disponibilidad: disponibilidad 
          }),
          success: function(response) {
              console.log('Coche insertado correctamente:', response);
              if(response){
                toastr.success("Coche insertado correctamente.");
                setTimeout(function() {
                  window.location.href = `list_coches.html`;
                }, 2000);
              }
          },
          error: function(xhr, status, error) {
            console.log("Error en la solicitud:", status, error);
            
            // Intenta parsear la respuesta JSON del servidor
            try {
                let responseJSON = JSON.parse(xhr.responseText);
                if (responseJSON.error) {
                    toastr.error(responseJSON.error); // Muestra el mensaje de error en un toast
                } else {
                    toastr.error("Ocurrió un error inesperado.");
                }
            } catch (e) {
                toastr.error("No se pudo procesar la respuesta del servidor.");
            }
        }
      });
      }else{
        //metodo para actualizar
        $.ajax({
          url: `http://localhost:8087/coches/save/${id}`,
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
            capacidadCombustible: capacidadCombustible,
            transmision: transmision,
            numeroPuertas: numeroPuertas,
            numeroAsientos: numeroAsientos,
            color: color,
            airbags: airbags,
            abs: abs,
            camaraReversa: camaraReversa,
            gps: gps,
            aireAcondicionado: aireAcondicionado,
            sensoresEstacionamiento: sensoresEstacionamiento,
            bluetooth: bluetooth,
            controlTraccion: controlTraccion,
            asistenteFrenado: asistenteFrenado,
            kilometraje: kilometraje,
            matricula: matricula,
            tipoVehiculo: tipoVehiculo,
            imagen: imagen,
            etiquetaMedioambiental:etiquetaMedioambiental,
            tipoMotor:tipoMotor,
            precioPorDia: precioPorDia,
            precioPorHora: precioPorHora,
            disponibilidad: disponibilidad // Asegúrate de que el valor sea válido
              // Otros campos del coche que sean necesarios
          }),
          success: function(response) {
              console.log('Coche guardado correctamente:', response);
              if(response){
                toastr.success("Datos modificados correctamente.");
                setTimeout(function() {
                  window.location.href = `list_coches.html`;
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
  