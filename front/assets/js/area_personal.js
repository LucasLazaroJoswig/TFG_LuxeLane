$(document).ready(function() {
    var id = localStorage.getItem('userId');
    var nombre = localStorage.getItem('userName');
    var apellidos = localStorage.getItem('userApellidos');
    var correo = localStorage.getItem('userCorreo');
    var telefono = localStorage.getItem('userTelefono');
    var carnet = localStorage.getItem('userCarnet');

    // Mostrar el nombre de usuario en el HTML
    if (nombre && apellidos) {
        $('h1').text('Bienvenido, ' + nombre + ' ' + apellidos);
    } else {
        // Si no hay usuario en el localStorage, redirigir al login
        window.location.href = "login.html"; // Cambia esto por la ruta correcta
    }

    // Rellenar los campos del formulario con los datos almacenados
    if (id) {
        $('#id').val(id);
    }
    if (nombre) {
        $('#nombre').val(nombre);
    }
    if (apellidos) {
        $('#apellidos').val(apellidos);
    }
    if (correo) {
        $('#email').val(correo);
    }
    if (telefono) {
        $('#telefono').val(telefono);
    }
    if (carnet) {
        $('#carnet').html(`<img src="${carnet}" alt="Carnet de conducir" class="w-[50px] h-[50px"]>`);
    }

    // Evento cuando se hace clic en el botón "Guardar cambios"
    $('#butsave').on('click', function(e) {
        e.preventDefault(); 
        
        var idUsuario  = $('#id').val().trim();
        var nombre     = $('#nombre').val().trim();
        var apellidos  = $('#apellidos').val().trim();
        var correo     = $('#email').val().trim();
        var telefono   = $('#telefono').val().trim();
    
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    
        // Validación de campos vacíos
        if (nombre === "" || apellidos === "" || correo === "" || idUsuario === "" || telefono === "") {
            toastr.error("Por favor, complete todos los campos.");
            return;
        }
        if (!emailReg.test(correo)) {
            toastr.error("El correo electrónico no es válido.");
            return;
        }
        
        // Definir la URL con el ID de usuario
        var url = `http://localhost:8087/modificar/${idUsuario}`;
    
        // Realizar la solicitud AJAX para modificar el usuario
        $.ajax({
            url: url,
            type: "POST",
            data: {
                correo: correo,
                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono
            },
            success: function(response) {
                if(response) {
                    // Mostrar mensaje de éxito
                    toastr.success("Datos modificados correctamente.");
                    
                    // Actualizar el localStorage con los nuevos datos
                    localStorage.setItem('userName', response.nombre);
                    localStorage.setItem('userApellidos', response.apellidos);
                    localStorage.setItem('userCorreo', response.correo);
                    localStorage.setItem('userTelefono', response.telefono);
                    
                    // Recargar la página para mostrar los datos actualizados
                    setTimeout(function() {
                        location.reload(); // Recarga la página
                    }, 2000); // Espera 2 segundos antes de recargar
                } else if(response === 0) {
                    toastr.error("Error en la modificación.");
                } else {
                    toastr.error("Error en el registro.");
                }
            },
            error: function(xhr, status, error) {
                toastr.error("Error en la solicitud: " + error);
            }
        });
    });
    $('#butLogout').on('click', function(e) {
        e.preventDefault();
        
        // Eliminar todos los valores en localStorage que indican que el usuario está autenticado
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userApellidos');
        localStorage.removeItem('userCorreo');
        localStorage.removeItem('userTelefono');
        localStorage.removeItem('userCarnet');
        
        // Redirigir a la página de login
        window.location.href = "login.html";
    });
});
