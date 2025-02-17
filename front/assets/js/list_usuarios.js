document.addEventListener("DOMContentLoaded", function() {
  // Función para cargar los usuarios desde la base de datos
  function loadUsuarios() {
      fetch('http://localhost:8087/usuarios/todos') // Cambia la URL por la de tu API
          .then(response => response.json())
          .then(data => {
              let usuariosTable = document.querySelector('#usuariosTable tbody');
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
                          <button class="button">Eliminar</button>
                      </td>
                  `;
                  usuariosTable.appendChild(row);
              });
          })
          .catch(error => console.error('Error al cargar usuarios:', error));
  }

  loadUsuarios(); // Cargar usuarios al cargar la página

  // Añadir usuario
  document.querySelector('#btnAdd').addEventListener('click', function() {
      alert("Añadir usuario"); // Aquí puedes abrir un formulario para agregar un usuario
  });
});
