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
                          <button class="button verDetalle" data-id="${coche.id}">Ver detalle</button>
                          <button class="button">Modificar</button>
                      </td>
                  </tr>
                  `);
              });

              // Manejador de evento para el botón "Ver detalle"
              $('.verDetalle').on('click', function() {
                  let cocheId = $(this).data('id'); // Obtener el ID del coche desde el atributo data-id
                  $.ajax({
                      url: `http://localhost:8087/coches/verDetalle/${cocheId}`, // URL con el ID del coche
                      method: 'GET',
                      success: function(response) {
                          // Aquí puedes manejar la respuesta de la solicitud
                          console.log(response);  // Ejemplo: Mostrar los detalles del coche en la consola
                          // Puedes redirigir o mostrar la información en una ventana modal, etc.
                      },
                      error: function(xhr, status, error) {
                          console.error("Error al obtener el detalle del coche:", error);
                      }
                  });
              });
          }
      });
  }


  $('#searchForm').on('submit', function(e) {
    e.preventDefault();
    let searchTerm = $('#searchInput').val().trim();
    $.ajax({
        url: 'http://localhost:8087/coches/buscador', // Cambia esto por tu API que devuelve los coches
        method: 'GET',
        data: { palabra:searchTerm },
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
                        <button class="button verDetalle" data-id="${coche.id}">Ver detalle</button>
                        <button class="button">Modificar</button>
                    </td>
                </tr>
                `);
            });

            // Manejador de evento para el botón "Ver detalle"
            $('.verDetalle').on('click', function() {
                let cocheId = $(this).data('id'); // Obtener el ID del coche desde el atributo data-id
                $.ajax({
                    url: `http://localhost:8087/coches/verDetalle/${cocheId}`, // URL con el ID del coche
                    method: 'GET',
                    success: function(response) {
                        // Aquí puedes manejar la respuesta de la solicitud
                        console.log(response);  // Ejemplo: Mostrar los detalles del coche en la consola
                        // Puedes redirigir o mostrar la información en una ventana modal, etc.
                    },
                    error: function(xhr, status, error) {
                        console.error("Error al obtener el detalle del coche:", error);
                    }
                });
            });
        }
    });
});
  

  $('#btnAdd').click(function() {
    // Aquí puedes abrir un formulario para agregar un coche
    alert("Añadir coche");
  });
  loadCoches();

});


 
  