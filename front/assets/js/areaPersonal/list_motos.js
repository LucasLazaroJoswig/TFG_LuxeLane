$(document).ready(function() {
    // Función para cargar las motos desde la base de datos
    function loadMotos() {
      $.ajax({
        url: 'http://localhost:8087/motos/todos', // Cambia esto por tu API que devuelve las motos
        method: 'GET',
        success: function(data) {
          let motosTable = $('#motosTable tbody');
          motosTable.empty();
          data.forEach(moto => {
            motosTable.append(`
            <tr>
            <td>${moto.marca}</td>
            <td>${moto.modelo}</td>
            <td>${moto.año}</td>
            <td>${moto.disponibilidad ? 'Disponible' : 'No disponible'}</td>
            <td>${moto.precioPorHora} €</td>
            <td>${moto.precioPorDia} €</td>
            <td>
              <button class="button">Ver detalle</button>
              <button class="button">Modificar</button>
            </td>
          </tr>
            `);
          });
        }
      });
    }
  
    loadMotos(); // Cargar motos al cargar la página
  
    // Añadir moto
    $('#btnAdd').click(function() {
      // Aquí puedes abrir un formulario para agregar una moto
      alert("Añadir moto");
    });
  });
  