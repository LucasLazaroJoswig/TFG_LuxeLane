$(document).ready(function() {

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
              <td>${coche.disponibilidad} </td>
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
        $('.modificarBtn').on('click', function() {
          const cocheId = $(this).data('id');
          redirigirConDatos(cocheId);
        });
      }
    });
  }


  $('#searchForm').on('submit', function(e) {
    e.preventDefault();
    let searchTerm = $('#searchInput').val().trim();
    $.ajax({
        url: 'http://localhost:8087/coches/buscador',
        method: 'GET',
        data: { palabra:searchTerm },
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

            // Manejador de evento para el botón "Ver detalle"
            $('.verDetalleBtn').on('click', function() {
              const cocheId = $(this).data('id');
              loadCocheDetails(cocheId);
            });
            $('.modificarBtn').on('click', function() {
              const cocheId = $(this).data('id');
              redirigirConDatos(cocheId);
            });
        }
    });
});
function loadCocheDetails(cocheId) {
  $.ajax({
    url: `http://localhost:8087/coches/verDetalle/${cocheId}`, // Aquí se pasa el id del coche
    method: 'GET',
    success: function(coche) {
      // Aquí se agrega la información del coche al cuerpo del modal
      const modalBody = $('#detalleModalBody');
      modalBody.html(`
        <div class="container">
          <div class="row justify-content-center">
            <!-- Foto del coche -->
            <div class="col-12 text-center mb-4">
              <img src="fotos/fotos_coches/${coche.imagen}" alt="${coche.marca} ${coche.modelo}" class="img-fluid rounded shadow" style="max-width: 400px;">
            </div>
          </div>

          <div class="row">
            <!-- Especificaciones Técnicas -->
            <div class="col-md-6 mb-4">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title"><strong>Especificaciones Técnicas</strong></h5>
                  <ul class="list-unstyled">
                    <li><i class="fas fa-cogs"></i> <strong>Motor:</strong> ${coche.tipoMotor}</li>
                    <li><i class="fas fa-tachometer-alt"></i> <strong>Cilindrada:</strong> ${coche.cilindrada} cc</li>
                    <li><i class="fas fa-bolt"></i> <strong>Potencia:</strong> ${coche.potenciaHp} HP</li>
                    <li><i class="fas fa-cogs"></i> <strong>Transmisión:</strong> ${coche.transmision}</li>
                    <li><i class="fas fa-gas-pump"></i> <strong>Capacidad de Combustible:</strong> ${coche.capacidadCombustible} L</li>
                    <li><i class="fas fa-leaf"></i> <strong>Etiqueta Medioambiental:</strong> ${coche.etiquetaMedioambiental}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Características del Vehículo -->
            <div class="col-md-6 mb-4">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title"><strong>Características del Vehículo</strong></h5>
                  <ul class="list-unstyled">
                    <li><i class="fas fa-door-open"></i> <strong>Puertas:</strong> ${coche.numeroPuertas}</li>
                    <li><i class="fas fa-cogs"></i> <strong>Asientos:</strong> ${coche.numeroAsientos}</li>
                    <li><i class="fas fa-snowflake"></i> <strong>Aire Acondicionado:</strong> ${coche.aireAcondicionado ? 'Sí' : 'No'}</li>
                    <li><i class="fas fa-location-arrow"></i> <strong>GPS:</strong> ${coche.gps ? 'Sí' : 'No'}</li>
                    <li><i class="fas fa-bluetooth"></i> <strong>Bluetooth:</strong> ${coche.bluetooth ? 'Sí' : 'No'}</li>
                    <li><i class="fas fa-camera-retro"></i> <strong>Cámara Reversa:</strong> ${coche.camaraReversa ? 'Sí' : 'No'}</li>
                    <li><i class="fas fa-parking"></i> <strong>Sensores de Estacionamiento:</strong> ${coche.sensoresEstacionamiento ? 'Sí' : 'No'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Seguridad -->
            <div class="col-md-6 mb-4">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title"><strong>Seguridad</strong></h5>
                  <ul class="list-unstyled">
                    <li><i class="fas fa-shield-alt"></i> <strong>ABS:</strong> ${coche.abs ? 'Sí' : 'No'}</li>
                    <li><i class="fas fa-cogs"></i> <strong>Airbags:</strong> ${coche.airbags}</li>
                    <li><i class="fas fa-tachometer-alt"></i> <strong>Control de Tracción:</strong> ${coche.controlTraccion ? 'Sí' : 'No'}</li>
                    <li><i class="fas fa-car-crash"></i> <strong>Asistente de Frenado:</strong> ${coche.asistenteFrenado ? 'Sí' : 'No'}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Información adicional -->
            <div class="col-md-6 mb-4">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title"><strong>Información Adicional</strong></h5>
                  <ul class="list-unstyled">
                    <li><i class="fas fa-paint-brush"></i> <strong>Color:</strong> ${coche.color}</li>
                    <li><i class="fas fa-road"></i> <strong>Kilometraje:</strong> ${coche.kilometraje} km</li>
                    <li><i class="fas fa-car"></i> <strong>Matrícula:</strong> ${coche.matricula}</li>
                    <li><i class="fas fa-car-side"></i> <strong>Tipo de Vehículo:</strong> ${coche.tipoVehiculo}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);

      // Mostrar el modal
      $('#detalleModal').modal('show');
    }
  });
}
function redirigirConDatos(cocheId) {
    $.ajax({
      url: `http://localhost:8087/coches/verDetalle/${cocheId}`,
      method: 'GET',
      success: function(coche) {
        // Crear los parámetros de la URL
        const url = `form.html?imagen=${encodeURIComponent(coche.imagen)}&marca=${encodeURIComponent(coche.marca)}&modelo=${encodeURIComponent(coche.modelo)}&año=${coche.año}&cilindrada=${coche.cilindrada}&potenciaHp=${coche.potenciaHp}&capacidadCombustible=${coche.capacidadCombustible}&transmision=${encodeURIComponent(coche.transmision)}&numeroPuertas=${coche.numeroPuertas}&numeroAsientos=${coche.numeroAsientos}&color=${encodeURIComponent(coche.color)}&airbags=${coche.airbags}&abs=${coche.abs}&controlTraccion=${coche.controlTraccion}&asistenteFrenado=${coche.asistenteFrenado}&kilometraje=${coche.kilometraje}&matricula=${coche.matricula}&tipoVehiculo=${encodeURIComponent(coche.tipoVehiculo)}&precioPorDia=${coche.precioPorDia}&precioPorHora=${coche.precioPorHora}&disponibilidad=${coche.disponibilidad ? 'disponible' : 'noDisponible'}&id=${encodeURIComponent(coche.id)}`;
        
        // Redirigir a form.html con los parámetros
        window.location.href = url;
      }
    });
  }


$('#btnAdd').click(function() {
  // Aquí puedes abrir un formulario para agregar un coche
  window.location.href = "form.html";
});

  // Cargar los coches al cargar la página
  loadCoches();
});





 
