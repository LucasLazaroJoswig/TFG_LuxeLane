$(document).ready(function() {

  var urlParams = new URLSearchParams(window.location.search);
  var id = parseInt(urlParams.get('id'));
  var tipoVehiculo = urlParams.get('tipoVehiculo');

  //Hazme una comprobacion de todos los campos del formulario de datos de reserva y avisa al usuario si hay algun campo vacio e indica cual con toastr
  $('#datosReservaBtn').on('click', function() {
    if('#fecha_inicio' == '' || '#fecha_fin' == '' || '#direccion' == '' || '#documentacion' == '') {
      toastr.error('Por favor, complete todos los campos.');
    }else {
      nextStep();
    }
  });
  $('#butsave').on('click', function(e) {
    e.preventDefault();

    var nombre     = $('#nombre').val().trim();
    var apellidos  = $('#apellidos').val().trim();
    var email      = $('#reg-email').val().trim();
    var password   = $('#reg-contraseña').val().trim();
    var telefono   = $('#reg-telefono').val().trim();

    if (!nombre || !apellidos || !email || !password || !telefono) {
      toastr.error("Por favor, complete todos los campos.");
      return;
    }

    $.ajax({
      url: "http://localhost:8087/register",
      type: "POST",
      data: { correo: email, nombre, apellidos, contrasena: password, telefono },
      success: function(response) {
        if(response === 1) {
          toastr.success("Registro exitoso.");
          localStorage.setItem('userId', response.id);
          nextStep();
        } else {
          toastr.error(response === 0 ? "El correo ya está registrado." : "Error en el registro.");
        }
      },
      error: function(xhr, status, error) {
        toastr.error("Error en la solicitud: " + error);
      }
    });
  });

  $('#butlogin').on('click', function(e) {
      e.preventDefault();
      var correo = $('#email').val().trim();
      var contrasena = $('#contrasena').val().trim();

      if (!correo || !contrasena) {
          toastr.error("Por favor, complete todos los campos.");
          return;
      }

      $.ajax({
          url: "http://localhost:8087/login",
          type: "POST",
          data: { correo, contrasena },
          success: function(response) {
            if (response) {
              localStorage.setItem('userId', response.id);
              toastr.success("Login exitoso. ¡Bienvenido!");
              nextStep();
            } else {
              toastr.error("El correo o la contraseña no son correctos");
            }
          },
          error: function(xhr, status, error) {
              toastr.error("Error en la solicitud: " + error);
          }
      });
  });

  $('.previousBtn').on('click', function() { prevStep(); });
  $('.nextBtn').on('click', function() { nextStep(); });

  let currentStep = 1;

  function updateIndicators() {
    for (let i = 1; i <= 3; i++) {
      $(`#step${i}Indicator`).toggleClass('text-[#ff3600]', i === currentStep);
      $(`#step${i}Indicator`).toggleClass('text-gray-400', i !== currentStep);
    }
  }

  function nextStep() {
    $(`#step${currentStep}`).addClass('hidden');
    currentStep++;
    $(`#step${currentStep}`).removeClass('hidden');
    updateIndicators();
  }

  function prevStep() {
    $(`#step${currentStep}`).addClass('hidden');
    currentStep--;
    $(`#step${currentStep}`).removeClass('hidden');
    updateIndicators();
  }

  updateIndicators();
  $('#butReserva').on('click', function(e) {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
        toastr.error("Debe iniciar sesión para realizar la reserva.");
        return;
    }
    const formData = new FormData();
    formData.append('usuario_id', userId);
    formData.append('fecha_inicio', $('#fecha_inicio').val());
    formData.append('fecha_fin', $('#fecha_fin').val());
    formData.append('direccion', $('#direccion').val());
    formData.append('documentacion', $('#documentacion')[0].files[0]); // Agregar archivo
    formData.append('vehiculo_id', id);
    formData.append('tipo_vehiculo', tipoVehiculo);
    formData.append('tipoCarnet', $('#tipoCarnet').val());
    
    console.log("FormData contents:");
for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
}

    $.ajax({
        url: 'http://localhost:8087/reservas/crear',
        type: 'POST',
        data: formData,
        processData: false, // No procesar los datos
        contentType: false, // No establecer el tipo de contenido
        success: function(response) {
            if(response && response.id) {
                toastr.success("Reserva creada exitosamente.");
                nextStep();
            } else {
                toastr.error("Error al crear la reserva.");
            }
        },
        error: function(xhr) {
            toastr.error("Error en la solicitud: " + xhr.responseText);
        }
    });
  });
});
