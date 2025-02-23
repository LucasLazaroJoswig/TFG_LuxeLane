$(document).ready(function() {
    // Función para cargar las motos desde la base de datos
    function loadMotos() {
      $.ajax({
        url: 'http://localhost:8087/motos/todos', // Cambia esto por tu API que devuelve las motos
        method: 'GET',
        success: function(data) {
          let motosTable = $('#cochesTable tbody');
          motosTable.empty();
          data.forEach(moto => {
            motosTable.append(`
            <tr>
              <td>${moto.marca}</td>
              <td>${moto.modelo}</td>
              <td>${moto.año}</td>
              <td>${moto.precioPorHora} €</td>
              <td>${moto.precioPorDia} €</td>
              <td>${moto.disponibilidad} </td>
              <td>
                <button class="btn btn-info btn-sm verDetalleBtn" data-id="${moto.id}">Ver detalle</button>
                <button class="btn btn-info btn-sm modificarBtn" data-id="${moto.id}">Modificar</button>                          
              </td>
            </tr>
            `);
          });

        // Evento para abrir el modal y cargar los detalles del coche
        $('.verDetalleBtn').on('click', function() {
          const cocheId = $(this).data('id');
          loadMotoDetails(cocheId);
        });
        $('.modificarBtn').on('click', function() {
          const cocheId = $(this).data('id');
          redirigirConDatos(cocheId);
        });
      }
    });
  }
  
    loadMotos(); // Cargar motos al cargar la página
  
    $('#searchForm').on('submit', function(e) {
      e.preventDefault();
      let searchTerm = $('#searchInput').val().trim();
      $.ajax({
          url: 'http://localhost:8087/motos/buscador',
          method: 'GET',
          data: { palabra:searchTerm },
          success: function(data) {
            let motosTable = $('#cochesTable tbody');
            motosTable.empty();
            data.forEach(moto => {
              motosTable.append(`
              <tr>
                <td>${moto.marca}</td>
                <td>${moto.modelo}</td>
                <td>${moto.año}</td>
                <td>${moto.precioPorHora} €</td>
                <td>${moto.precioPorDia} €</td>
                <td>${moto.disponibilidad} </td>
                <td>
                  <button class="btn btn-info btn-sm verDetalleBtn" data-id="${moto.id}">Ver detalle</button>
                  <button class="btn btn-info btn-sm modificarBtn" data-id="${moto.id}">Modificar</button>                          
                </td>
              </tr>
              `);
            });
          }
        });
      });

      function loadMotoDetails(motoId) {
        $.ajax({
          url: `http://localhost:8087/motos/verDetalle/${motoId}`, // Se pasa el id de la moto
          method: 'GET',
          success: function(moto) {
            // Se agrega la información de la moto al cuerpo del modal
            const modalBody = $('#detalleModalBody');
            modalBody.html(`
              <div class="container">
                <div class="row justify-content-center">
                  <!-- Foto de la moto -->
                  <div class="col-12 text-center mb-4">
                    <img src="fotos/img_motos/${moto.imagen}" alt="${moto.marca} ${moto.modelo}" class="img-fluid rounded shadow" style="max-width: 400px;">
                  </div>
                </div>
      
                <div class="row">
                  <!-- Especificaciones Técnicas -->
                  <div class="col-md-6 mb-4">
                    <div class="card shadow-sm h-100">
                      <div class="card-body">
                        <h5 class="card-title"><strong>Especificaciones Técnicas</strong></h5>
                        <ul class="list-unstyled">
                          <li><i class="fas fa-cogs"></i> <strong>Motor:</strong> ${moto.tipoMotor}</li>
                          <li><i class="fas fa-tachometer-alt"></i> <strong>Cilindrada:</strong> ${moto.cilindrada} cc</li>
                          <li><i class="fas fa-bolt"></i> <strong>Potencia:</strong> ${moto.potenciaHp} HP</li>
                          <li><i class="fas fa-cogs"></i> <strong>Transmisión:</strong> ${moto.transmision}</li>
                          <li><i class="fas fa-gas-pump"></i> <strong>Capacidad de Combustible:</strong> ${moto.capacidadCombustible} L</li>
                          <li><i class="fas fa-leaf"></i> <strong>Etiqueta Medioambiental:</strong> ${moto.etiquetaMedioambiental}</li>
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
                          <li><i class="fas fa-stop"></i> <strong>Freno Delantero:</strong> ${moto.tipoFrenoDelantero}</li>
                          <li><i class="fas fa-stop"></i> <strong>Freno Trasero:</strong> ${moto.tipoFrenoTrasero}</li>
                          <li><i class="fas fa-wave-square"></i> <strong>Suspensión:</strong> ${moto.tipoSuspension}</li>
                          <li><i class="fas fa-weight"></i> <strong>Capacidad de Carga:</strong> ${moto.capacidadCargaKg} kg</li>
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
                          <li><i class="fas fa-shield-alt"></i> <strong>ABS:</strong> ${moto.abs ? 'Sí' : 'No'}</li>
                          <li><i class="fas fa-cogs"></i> <strong>Control de Tracción:</strong> ${moto.controlTraccion ? 'Sí' : 'No'}</li>
                          <li><i class="fas fa-bolt"></i> <strong>Encendido Electrónico:</strong> ${moto.encendidoElectronico ? 'Sí' : 'No'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
      
                  <!-- Información Adicional -->
                  <div class="col-md-6 mb-4">
                    <div class="card shadow-sm h-100">
                      <div class="card-body">
                        <h5 class="card-title"><strong>Información Adicional</strong></h5>
                        <ul class="list-unstyled">
                          <li><i class="fas fa-paint-brush"></i> <strong>Color:</strong> ${moto.color}</li>
                          <li><i class="fas fa-road"></i> <strong>Kilometraje:</strong> ${moto.kilometraje} km</li>
                          <li><i class="fas fa-id-badge"></i> <strong>Matrícula:</strong> ${moto.matricula}</li>
                          <li><i class="fas fa-car-side"></i> <strong>Tipo de Vehículo:</strong> ${moto.tipoVehiculo}</li>
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

      function redirigirConDatos(motoId) {
        $.ajax({
          url: `http://localhost:8087/motos/verDetalle/${motoId}`,
          method: 'GET',
          success: function(moto) {
            // Crear los parámetros de la URL
            var disponibilidad = moto.disponibilidad.toLowerCase();
            const url = `formMotos.html?imagen=${encodeURIComponent(moto.imagen)}&etiquetaMedioambiental=${encodeURIComponent(moto.etiquetaMedioambiental)}&marca=${encodeURIComponent(moto.marca)}&tipoMotor=${encodeURIComponent(moto.tipoMotor)}&modelo=${encodeURIComponent(moto.modelo)}&año=${moto.año}&cilindrada=${moto.cilindrada}&potenciaHp=${moto.potenciaHp}&capacidadCombustible=${moto.capacidadCombustible}&transmision=${encodeURIComponent(moto.transmision)}&tipoFrenoDelantero=${encodeURIComponent(moto.tipoFrenoDelantero)}&tipoFrenoTrasero=${encodeURIComponent(moto.tipoFrenoTrasero)}&tipoSuspension=${encodeURIComponent(moto.tipoSuspension)}&capacidadCargaKg=${moto.capacidadCargaKg}&color=${encodeURIComponent(moto.color)}&abs=${moto.abs}&controlTraccion=${moto.controlTraccion}&encendidoElectronico=${moto.encendidoElectronico}&kilometraje=${moto.kilometraje}&matricula=${moto.matricula}&tipoVehiculo=${encodeURIComponent(moto.tipoVehiculo)}&precioPorDia=${moto.precioPorDia}&precioPorHora=${moto.precioPorHora}&disponibilidad=${disponibilidad}&id=${encodeURIComponent(moto.id)}`;
            
            // Redirigir a form.html con los parámetros
            window.location.href = url;
          }
        });
      }
      
      
    // Añadir moto
    $('#btnAdd').click(function() {
      // Aquí puedes abrir un formulario para agregar una moto
      window.location.href = "formMotos.html";
    });
  });
  