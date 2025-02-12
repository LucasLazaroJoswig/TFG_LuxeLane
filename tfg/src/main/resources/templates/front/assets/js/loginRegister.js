$(document).ready(function() {
  $('#butsave').on('click', function(e) {
    e.preventDefault(); 

    var nombre     = $('#nombre').val().trim();
    var apellidos  = $('#apellidos').val().trim();
    var email      = $('#reg-email').val().trim();
    var password   = $('#reg-contraseña').val().trim();
    var telefono   = $('#reg-telefono').val().trim();

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (nombre === "" || apellidos === "" || email === "" || password === "" || telefono === "") {
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
      data: {
        correo: email,
        nombre: nombre,
        apellidos: apellidos,
        contrasena: password,
        telefono: telefono
      },
      success: function(response) {
        if(response === 1) {
          toastr.success("Registro exitoso. ¡Por favor, inicia sesión!");
          $('#registerForm')[0].reset();
          loginTab.click();
        } else if(response === 0) {
          toastr.error("El correo ya está registrado.");
        } else {
          toastr.error("Error en el registro.");
        }
      },
      error: function(xhr, status, error) {
        toastr.error("Error en la solicitud: " + error);
      }
    });
  });


  $('#butlogin').on('click', function(e) {
    e.preventDefault();

    var email     = $('#email').val().trim();
    var contrasena = $('#contrasena').val().trim();

    if(email === "" || contrasena === "") {
      toastr.error("Por favor, complete todos los campos.");
      return;
    }


    $.ajax({
      url: "http://localhost:8087/login",
      type: "POST",
      data: {
        email: email,
        contrasena: contrasena
      },
      success: function(response) {
        if(response.statusCode == 200) {
          window.location.href = "home";
        } else if(response.statusCode == 201) {
          toastr.error("Correo o contraseña inválidos.");
        } else {
          toastr.error("Error desconocido.");
        }
      },
      error: function(xhr, status, error) {
        toastr.error("Error en la solicitud: " + error);
      }
    });
  });
});
