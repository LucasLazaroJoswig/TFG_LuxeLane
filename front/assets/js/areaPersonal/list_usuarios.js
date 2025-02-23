document.addEventListener("DOMContentLoaded", function() {
  // Función para cargar los usuarios desde la base de datos
  function loadUsuarios() {
      fetch('http://localhost:8087/usuarios/todos') // Cambia la URL por la de tu API
          .then(response => response.json())
          .then(data => {
              let usuariosTable = document.querySelector('#cochesTable tbody');
              usuariosTable.innerHTML = '';
              data.forEach(usuario => {
                  let row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${usuario.nombre}</td>
                      <td>${usuario.apellidos}</td>
                      <td>${usuario.correo}</td>
                      <td>${usuario.telefono}</td>
                      <td>${usuario.rol}</td>
                      <td>${usuario.enabled}</td>

                      <td>
                          <button class="button">Ver detalle</button>
                          <button class="button">Modificar</button>
                          <button class="button">Desactivar</button>
                      </td>
                  `;
                  usuariosTable.appendChild(row);
              });
          })
          .catch(error => console.error('Error al cargar usuarios:', error));
  }

  $('#searchForm').on('submit', function(e) {
    e.preventDefault();
    let searchTerm = $('#searchInput').val().trim();
    $.ajax({
        url: 'http://localhost:8087/usuarios/buscador',
        method: 'GET',
        data: { palabra:searchTerm },
        success: function(data) {
            let usuariosTable = $('#cochesTable tbody');
            usuariosTable.empty();
            data.forEach(usuario => {
              
                usuariosTable.append(`
                <tr>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellidos}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.telefono}</td>
                    <td>${usuario.rol} €</td>
                    <td>${usuario.estado}</td>

                    <td>
                      <button class="btn btn-info btn-sm verDetalleBtn" data-id="${usuario.id}">Ver detalle</button>
                      <button class="btn btn-info btn-sm modificarBtn" data-id="${usuario.id}">Modificar</button>   
                      <button class="btn btn-info btn-sm desactivarBtn">Desactivar</button>                       
                    </td>
                </tr>
                `);
            });

            // Manejador de evento para el botón "Ver detalle"
            $('.verDetalleBtn').on('click', function() {
              const usuarioId = $(this).data('id');
              loadUsuarioDetails(usuarioId);
            });
            $('.modificarBtn').on('click', function() {
              const usuarioId = $(this).data('id');
              redirigirConDatos(usuarioId);
            });
        }
    });
});

  loadUsuarios(); // Cargar usuarios al cargar la página

  // Añadir usuario

});
