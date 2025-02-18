$(document).ready(function() {

  if (localStorage.getItem('userId')!=null) {
    window.location.href = "areaPersonal.html"; // Redirige a la página principal
  } else {
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
    
        var correo     = $('#email').val().trim();
        var contrasena = $('#contrasena').val().trim();
    
        if(correo === "" || contrasena === "") {
            toastr.error("Por favor, complete todos los campos.");
            return;
        }
    
        $.ajax({
            url: "http://localhost:8087/login",
            type: "POST",
            data: {
                correo: correo,
                contrasena: contrasena
            },
            success: function(response) {
              if (response) {
                toastr.success("Login exitoso. ¡Bienvenido!");
                // Asumiendo que el objeto "response" contiene los datos del usuario
                localStorage.setItem('userLoggedIn', true);
                localStorage.setItem('userId', response.id);  
                localStorage.setItem('userName', response.nombre);  
                localStorage.setItem('userApellidos', response.apellidos);  
                localStorage.setItem('userCorreo', response.correo);  
                localStorage.setItem('userTelefono', response.telefono);  
                
                const rol = response.rol.toLowerCase(); // Convierte el rol a minúsculas

                if (rol === "chofer") {
                  window.location.href = "areaPersonalChofer.html"; // Redirige a la página principal  
                } else if (rol === "admin") {
                  window.location.href = "areaPersonalAdmin.html"; // Redirige a la página principal  
                } else {
                  window.location.href = "areaPersonal.html"; // Redirige a la página principal  
                }
            } else {
                toastr.error("El correo o la contraseña no son correctos");
            }
            },
            error: function(xhr, status, error) {
                toastr.error("Error en la solicitud: " + error);
            }
        });
    });
    
    $('#butLogout').on('click', function(e) {
        e.preventDefault();
        
        // Eliminar el token o cualquier valor en localStorage que indique que el usuario está autenticado
        localStorage.removeItem('userLoggedIn');
        // Redirigir a la página de login
        window.location.href = "../../login.html";
    });
    
  }

    
  });
  