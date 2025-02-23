$(document).ready(function() {
  // Suponemos que el ID del usuario se obtiene de la sesión o se define de forma fija para pruebas
  var userId = 1;
  
  // Función para cargar las reservas según el filtro de estado seleccionado
  function loadReservas(filter) {
    let url = '';
    // Determinar la URL del endpoint según el filtro
    switch(filter) {
      case 'confirmadas':
        url = `http://localhost:8087/reservas/confirmadas/${userId}`;
        break;
      case 'canceladas':
        url = `http://localhost:8087/reservas/canceladas/${userId}`;
        break;
      case 'pendientes':
        url = `http://localhost:8087/reservas/pendientes/${userId}`;
        break;
      case 'completadas':
        url = `http://localhost:8087/reservas/completadas/${userId}`;
        break;
      case 'todas':
      default:
        url = `http://localhost:8087/reservas/todas/${userId}`;
        break;
    }
    
    $.ajax({
      url: url,
      method: 'GET',
      success: function(data) {
        if (data.length === 0) {
          $('#cochesTable tbody').html('<tr><td colspan="6">No se encontraron reservas.</td></tr>');
          return;
        }else{
        let reservasTable = $('#cochesTable tbody');
        reservasTable.empty();
        data.forEach(reserva => {
          // Determinar si la reserva es de coche o de moto según los valores de coche_id y moto_id
          let vehiculo = reserva.coche_id != null ? reserva.coche.marca + " " + reserva.coche.modelo : reserva.moto.marca + ' ' + reserva.moto.modelo;
          let cancelarBtn =reserva.estado!='CANCELADA' ? `<button class="btn btn-info btn-sm cancelarBtn" data-id="${reserva.id}">Cancelar</button>` : '';
          reservasTable.append(`
            <tr>
              <td>${vehiculo}</td>
              <td>${reserva.fechaInicio}</td>
              <td>${reserva.fechaFin}</td>
              <td>${reserva.estado}</td>
              <td>${reserva.precioTotal}</td>

              <td>
                <button class="btn btn-info btn-sm verDetalleBtn" data-id="${reserva.id}">Ver detalle</button>
                ${cancelarBtn}
              </td>
            </tr>
          `);
        });
        }
        // Asignar el evento para mostrar el detalle de la reserva en el modal
        $('.verDetalleBtn').on('click', function() {
          const reservaId = $(this).data('id');
          loadReservaDetails(reservaId);
        });
        $('.cancelarBtn').on('click', function() {
          const reservaId = $(this).data('id');
          $('#cancelarModalBody').html(`<p>¿Está seguro de que desea cancelar la reserva?</p>`);
          // Se asigna el id de la reserva al botón de confirmar cancelación
          $('.confirmarCancelarBtn').attr('data-id', reservaId);
          // Se muestra la modal
          $('#cancelarModal').modal('show');
        });
        
      },
      error: function(xhr, status, error) {
        console.error("Error al cargar reservas:", status, error);
      }
    });
  }
  
  // Función para cargar los detalles de una reserva y mostrarlos en el modal
  function loadReservaDetails(reservaId) {
    $.ajax({
      url: `http://localhost:8087/reserva/verDetalle/${reservaId}`,
      method: 'GET',
      success: function(reserva) {
        console.log(reserva);
        const modalBody = $('#detalleModalBody');
        let vehiculo = reserva.coche_id != null ? reserva.coche.marca + " " + reserva.coche.modelo : reserva.moto.marca + ' ' + reserva.moto.modelo;
        modalBody.html(`
          <div class="container">
            <div class="row">
              <div class="col-md-6 text-start">
                <p><strong>ID:</strong> ${reserva.id}</p>
                <p><strong>Marca y Modelo:</strong> ${vehiculo}</p>
                <p><strong>Fecha Inicio:</strong> ${reserva.fechaInicio}</p>
                <p><strong>Fecha Fin:</strong> ${reserva.fechaFin}</p>
                <p><strong>Estado:</strong> ${reserva.estado}</p>
                <p><strong>Precio Total:</strong> ${reserva.precioTotal} €</p>
              </div>
            </div>
          </div>
        `);
        $('#detalleModal').modal('show');
      },
      error: function(xhr, status, error) {
        console.error("Error al cargar el detalle de la reserva:", status, error);
      }
    });
  }
  
  // Cargar las reservas con el filtro por defecto ("todas") al cargar la página
  loadReservas('confirmadas');
  
  //al hacer click en boton de cancelar abrir modal de confirmacion
  // Al hacer clic en el botón de cancelar, se abre la modal de confirmación


// Al confirmar la cancelación
$('.confirmarCancelarBtn').on('click', function() {
  const reservaId = $(this).data('id');
  $.ajax({
    url: `http://localhost:8087/cancelarReserva`,
    data: { id: reservaId },
    method: 'PUT',
    success: function(response) {
      if (response) {
        toastr.success("Reserva cancelada exitosamente.");
        // Ocultar la modal tras la cancelación
        $('#cancelarModal').modal('hide');
        // Recargar las reservas, por ejemplo, mostrando todas
        loadReservas('todas');
      } else {
        toastr.error("Error al cancelar la reserva.");
      }
    },
    error: function(xhr, status, error) {
      console.error("Error al cancelar la reserva:", status, error);
    }
  });
});



  // Al hacer clic en el botón de filtrar, se carga el filtro seleccionado
  $('#btnFilter').on('click', function() {
    let selectedFilter = $('#filterEstado').val();
    loadReservas(selectedFilter);
  });
});
