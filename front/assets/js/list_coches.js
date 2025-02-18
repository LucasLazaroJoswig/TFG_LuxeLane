$(document).ready(function() {
  // Función para cargar los coches desde la base de datos
  function loadCoches() {
    $.ajax({
      url: 'http://localhost:8087/coches/todos', // Cambia esto por tu API que devuelve los coches
      method: 'GET',
      success: function(data) {
        let cochesTable = $('#cochesTable tbody');
        cochesTable.empty();
        data.forEach(coche => {
          cochesTable.append(`
            <tr>
              <td>${coche.marca}</td>
              <td>${coche.modelo}</td>
              <td>${coche.año}</td>
              <td>${coche.disponibilidad ? 'Disponible' : 'No disponible'}</td>
              <td>${coche.precioPorHora} €</td>
              <td>${coche.precioPorDia} €</td>
              <td>
                <button class="btn btn-info btn-sm verDetalleBtn" data-id="${coche.id}">Ver detalle</button>
                <button class="btn btn-info btn-sm modificarBtn" data-id="${coche.id}">Modificar</button>                          
              </td>
            </tr>
          `);
        });

        // Evento para abrir el modal y cargar los detalles del coche
        $('.verDetalleBtn').on('click', function() {
          const cocheId = $(this).data('id');
          loadCocheDetails(cocheId);
        });
      }
    });
  }

  // Función para cargar los detalles de un coche
  function loadCocheDetails(cocheId) {
    $.ajax({
      url: `http://localhost:8087/coches/verDetalle/${cocheId}`, // Aquí se pasa el id del coche
      method: 'GET',
      success: function(coche) {
        // Aquí se agrega la información del coche al cuerpo del modal
        const modalBody = $('#detalleModalBody');
        modalBody.html(`
          <div class="container">
            <div class="row">
              <!-- Foto del coche en la primera fila con tamaño ajustado -->
              <div class="col-12 text-center mb-4">
                <img src="fotos/fotos_coches/${coche.imagen}" alt="${coche.marca} ${coche.modelo}" class="img-fluid" style="max-width: 400px;">
              </div>
            </div>

            <!-- Especificaciones técnicas -->
            <div class="row">
              <div class="col-md-6">
                <h5><strong>Especificaciones Técnicas</strong></h5>
                <ul>
                  <li><strong>Motor:</strong> ${coche.tipoMotor}</li>
                  <li><strong>Cilindrada:</strong> ${coche.cilindrada} cc</li>
                  <li><strong>Potencia:</strong> ${coche.potenciaHp} HP</li>
                  <li><strong>Transmisión:</strong> ${coche.transmision}</li>
                  <li><strong>Capacidad de Combustible:</strong> ${coche.capacidadCombustible} L</li>
                  <li><strong>Etiqueta Medioambiental:</strong> ${coche.etiquetaMedioambiental}</li>
                </ul>
              </div>

              <!-- Características del vehículo -->
              <div class="col-md-6">
                <h5><strong>Características del Vehículo</strong></h5>
                <ul>
                  <li><strong>Puertas:</strong> ${coche.numeroPuertas}</li>
                  <li><strong>Asientos:</strong> ${coche.numeroAsientos}</li>
                  <li><strong>Aire Acondicionado:</strong> ${coche.aireAcondicionado ? 'Sí' : 'No'}</li>
                  <li><strong>GPS:</strong> ${coche.gps ? 'Sí' : 'No'}</li>
                  <li><strong>Bluetooth:</strong> ${coche.bluetooth ? 'Sí' : 'No'}</li>
                  <li><strong>Cámara Reversa:</strong> ${coche.camaraReversa ? 'Sí' : 'No'}</li>
                  <li><strong>Sensores de Estacionamiento:</strong> ${coche.sensoresEstacionamiento ? 'Sí' : 'No'}</li>
                </ul>
              </div>
            </div>

            <!-- Seguridad -->
            <div class="row">
              <div class="col-md-6">
                <h5><strong>Seguridad</strong></h5>
                <ul>
                  <li><strong>ABS:</strong> ${coche.abs ? 'Sí' : 'No'}</li>
                  <li><strong>Airbags:</strong> ${coche.airbags}</li>
                  <li><strong>Control de Tracción:</strong> ${coche.controlTraccion ? 'Sí' : 'No'}</li>
                  <li><strong>Asistente de Frenado:</strong> ${coche.asistenteFrenado ? 'Sí' : 'No'}</li>
                </ul>
              </div>

              <!-- Información adicional -->
              <div class="col-md-6">
                <h5><strong>Información Adicional</strong></h5>
                <ul>
                  <li><strong>Color:</strong> ${coche.color}</li>
                  <li><strong>Kilometraje:</strong> ${coche.kilometraje} km</li>
                  <li><strong>Matrícula:</strong> ${coche.matricula}</li>
                  <li><strong>Tipo de Vehículo:</strong> ${coche.tipoVehiculo}</li>
                </ul>
              </div>
            </div>
          </div>
        `);

        // Mostrar el modal
        $('#detalleModal').modal('show');
      }
    });
  }



$('#btnAdd').click(function() {
    // Aquí puedes abrir un formulario para agregar un coche
    alert("Añadir coche");
  });
  // Cargar los coches al cargar la página
  loadCoches();
});





 
  