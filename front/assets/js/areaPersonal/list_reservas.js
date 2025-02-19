$(document).ready(function() {
var id = localStorage.getItem('userId');
loadReservas();
    function capitalizarPrimeraLetra(texto) {
        if (texto && texto.length > 0) {
            return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
        }
        return texto;
    }    
    var id = localStorage.getItem('userId');

    // Función para cargar los reservas desde la base de datos
    function loadReservas() {
        $.ajax({
            url: `http://localhost:8087/reservas/todas/${id}`, // Cambia esto por tu API real
            method: 'GET',
            success: function (data) {
                let reservasTable = $('#reservasTable tbody');
                reservasTable.empty();
    
                if (data.length === 0) {
                    reservasTable.append(`
                        <tr>
                            <td colspan="4">No hay reservas disponibles.</td>
                        </tr>
                    `);
                    return;
                }
    
                data.forEach(reserva => {
                    reservasTable.append(`
                        <tr>
                           <td>${reserva.coche.marca} ${reserva.coche.modelo}</td>
                          <td>${reserva.fechaInicio}</td>
                          <td>${reserva.fechaFin}</td>
                          <td>${capitalizarPrimeraLetra(reserva.estado)}</td>
                            <td>
                                <button class="btn btn-info btn-sm verDetalleBtn" data-id="${reserva.id}">
                                    <i class="fas fa-eye"></i> Ver Detalle
                                </button>
                                <button class="btn btn-warning btn-sm modificarBtn" data-id="${reserva.id}">
                                    <i class="fas fa-edit"></i> Modificar
                                </button>
                            </td>
                        </tr>
                    `);
          });
  
          // Evento para abrir el modal y cargar los detalles del reserva
          $('.verDetalleBtn').on('click', function() {
            const reservaId = $(this).data('id');
            loadreservaDetails(reservaId);
          });
        }
      });
    }
  
  
    $('#searchForm').on('submit', function(e) {
      e.preventDefault();
      let searchTerm = $('#searchInput').val().trim();
      $.ajax({
          url: 'http://localhost:8087/reservas/buscador',
          method: 'GET',
          data: { palabra:searchTerm },
          success: function(data) {
              let reservasTable = $('#reservasTable tbody');
              reservasTable.empty();
              data.forEach(reserva => {
                  reservasTable.append(`
                  <tr>
                      <td>${reserva.marca}</td>
                      <td>${reserva.modelo}</td>
                      <td>${reserva.año}</td>
                      <td>${reserva.disponibilidad ? 'Disponible' : 'No disponible'}</td>
                      <td>${reserva.precioPorHora} €</td>
                      <td>${reserva.precioPorDia} €</td>
                      <td>
                          <button class="button verDetalle" data-id="${reserva.id}">Ver detalle</button>
                          <button class="button">Modificar</button>
                      </td>
                  </tr>
                  `);
              });
  
              // Manejador de evento para el botón "Ver detalle"
              $('.verDetalle').on('click', function() {
                  let reservaId = $(this).data('id'); // Obtener el ID del reserva desde el atributo data-id
                  $.ajax({
                      url: `http://localhost:8087/reservas/verDetalle/${reservaId}`, // URL con el ID del reserva
                      method: 'GET',
                      success: function(response) {
                          // Aquí puedes manejar la respuesta de la solicitud
                          console.log(response);  // Ejemplo: Mostrar los detalles del reserva en la consola
                          // Puedes redirigir o mostrar la información en una ventana modal, etc.
                      },
                      error: function(xhr, status, error) {
                          console.error("Error al obtener el detalle del reserva:", error);
                      }
                  });
              });
          }
      });
  });
    
  
    $('#btnAdd').click(function() {
    // Función para cargar los detalles de un reserva
    function loadreservaDetails(reservaId) {
      $.ajax({
        url: `http://localhost:8087/reservas/verDetalle/${reservaId}`, // Aquí se pasa el id del reserva
        method: 'GET',
        success: function(reserva) {
          // Aquí se agrega la información del reserva al cuerpo del modal
          const modalBody = $('#detalleModalBody');
          modalBody.html(`
            <div class="container">
              <div class="row">
                <!-- Foto del reserva en la primera fila con tamaño ajustado -->
                <div class="col-12 text-center mb-4">
                  <img src="fotos/fotos_reservas/${reserva.imagen}" alt="${reserva.marca} ${reserva.modelo}" class="img-fluid" style="max-width: 400px;">
                </div>
              </div>
  
              <!-- Especificaciones técnicas -->
              <div class="row">
                <div class="col-md-6">
                  <h5><strong>Especificaciones Técnicas</strong></h5>
                  <ul>
                    <li><strong>Motor:</strong> ${reserva.tipoMotor}</li>
                    <li><strong>Cilindrada:</strong> ${reserva.cilindrada} cc</li>
                    <li><strong>Potencia:</strong> ${reserva.potenciaHp} HP</li>
                    <li><strong>Transmisión:</strong> ${reserva.transmision}</li>
                    <li><strong>Capacidad de Combustible:</strong> ${reserva.capacidadCombustible} L</li>
                    <li><strong>Etiqueta Medioambiental:</strong> ${reserva.etiquetaMedioambiental}</li>
                  </ul>
                </div>
  
                <!-- Características del vehículo -->
                <div class="col-md-6">
                  <h5><strong>Características del Vehículo</strong></h5>
                  <ul>
                    <li><strong>Puertas:</strong> ${reserva.numeroPuertas}</li>
                    <li><strong>Asientos:</strong> ${reserva.numeroAsientos}</li>
                    <li><strong>Aire Acondicionado:</strong> ${reserva.aireAcondicionado ? 'Sí' : 'No'}</li>
                    <li><strong>GPS:</strong> ${reserva.gps ? 'Sí' : 'No'}</li>
                    <li><strong>Bluetooth:</strong> ${reserva.bluetooth ? 'Sí' : 'No'}</li>
                    <li><strong>Cámara Reversa:</strong> ${reserva.camaraReversa ? 'Sí' : 'No'}</li>
                    <li><strong>Sensores de Estacionamiento:</strong> ${reserva.sensoresEstacionamiento ? 'Sí' : 'No'}</li>
                  </ul>
                </div>
              </div>
  
              <!-- Seguridad -->
              <div class="row">
                <div class="col-md-6">
                  <h5><strong>Seguridad</strong></h5>
                  <ul>
                    <li><strong>ABS:</strong> ${reserva.abs ? 'Sí' : 'No'}</li>
                    <li><strong>Airbags:</strong> ${reserva.airbags}</li>
                    <li><strong>Control de Tracción:</strong> ${reserva.controlTraccion ? 'Sí' : 'No'}</li>
                    <li><strong>Asistente de Frenado:</strong> ${reserva.asistenteFrenado ? 'Sí' : 'No'}</li>
                  </ul>
                </div>
  
                <!-- Información adicional -->
                <div class="col-md-6">
                  <h5><strong>Información Adicional</strong></h5>
                  <ul>
                    <li><strong>Color:</strong> ${reserva.color}</li>
                    <li><strong>Kilometraje:</strong> ${reserva.kilometraje} km</li>
                    <li><strong>Matrícula:</strong> ${reserva.matricula}</li>
                    <li><strong>Tipo de Vehículo:</strong> ${reserva.tipoVehiculo}</li>
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
      // Aquí puedes abrir un formulario para agregar un reserva
      alert("Añadir reserva");
    });
    // Cargar los reservas al cargar la página
    loadreservas();
  });
  
  });