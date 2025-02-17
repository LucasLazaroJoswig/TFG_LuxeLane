$(document).ready(function() {
    // Función para cargar los coches desde la base de datos
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
            <td>
              <button class="button">Ver detalle</button>
              <button class="button">Modificar</button>
              <button class="button">Eliminar</button>
            </td>
          </tr>
            `);
          });
        }
      });
    }
  
    loadCoches(); // Cargar coches al cargar la página
  
    // Añadir coche
    $('#btnAdd').click(function() {
      // Aquí puedes abrir un formulario para agregar un coche
      alert("Añadir coche");
    });
  });
  