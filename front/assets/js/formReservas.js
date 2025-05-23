$(document).ready(function() {

  var urlParams = new URLSearchParams(window.location.search);
  var id = parseInt(urlParams.get('id'));
  var tipoVehiculo = urlParams.get('tipoVehiculo');



  //Hazme una comprobacion de todos los campos del formulario de datos de reserva y avisa al usuario si hay algun campo vacio e indica cual con toastr
  $('#datosReservaBtn').on('click', function() {
    if($('#fecha_inicio').val().trim() == '' || $('#fecha_fin').val().trim() == '' || $('#direccion').val().trim() == '') {
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

  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  if (!nombre || !apellidos || !email || !password || !telefono) {
    toastr.error("Por favor, complete todos los campos.");
    return;
  }
  if (!emailReg.test(email)) {
    toastr.error("El correo electrónico no es válido.");
    return;
  }
  if (password.length < 8) {
    toastr.error("La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  $.ajax({
    url: "http://localhost:8087/register",
    type: "POST",
    data: { correo: email, nombre, apellidos, contrasena: password, telefono },
    success: function(response) {
      if(response) {
        toastr.success("Registro exitoso.");
        localStorage.setItem('userLoggedIn', true);
        localStorage.setItem('userId', response.id);  
        localStorage.setItem('userName', response.nombre);  
        localStorage.setItem('userApellidos', response.apellidos);  
        localStorage.setItem('userCorreo', response.correo);  
        localStorage.setItem('userTelefono', response.telefono);
        localStorage.setItem('userRol', response.rol.toLowerCase());
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
        localStorage.setItem('userLoggedIn', true);
        localStorage.setItem('userId', response.id);  
        localStorage.setItem('userName', response.nombre);  
        localStorage.setItem('userApellidos', response.apellidos);  
        localStorage.setItem('userCorreo', response.correo);  
        localStorage.setItem('userTelefono', response.telefono);
        localStorage.setItem('userRol',response.rol.toLowerCase());
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
            if(response) {
                toastr.success("Reserva creada exitosamente.");
                localStorage.setItem('userCarnet', response.documentos);
                if (localStorage.getItem('userRol') === "chofer") {
                  window.location.href = "areaPersonalChofer.html"; // Redirige a la página principal  
                } else if (localStorage.getItem('userRol') === "admin") {
                  window.location.href = "areaPersonalAdmin.html"; // Redirige a la página principal  
                } else {
                  window.location.href = "areaPersonal.html"; // Redirige a la página principal  
                }
            } else {
                toastr.error("Error al crear la reserva.");
            }
        },
        error: function(xhr) {
            toastr.error("Error en la solicitud: " + xhr.responseText);
        }
    });
  });


  if (localStorage.getItem('userLoggedIn')) {
    $('#step1').addClass('hidden'); // Ocultar el paso de login/registro
    nextStep();
    $(`#step2`).removeClass('hidden');
    updateIndicators();
    $('#prevBtnDatos').addClass('hidden');;
  }


});
