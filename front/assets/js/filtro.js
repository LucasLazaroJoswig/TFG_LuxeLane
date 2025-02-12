$(document).ready(function() {
    // Función para mostrar/ocultar acordeones
    $('.accordion-item button').on('click', function() {
      const target = $(this).data('toggle');
      const arrow = $(this).find('span');
      $('#' + target).toggleClass('hidden');
      arrow.toggleClass('rotate-180');
    });
  
    // Habilitar los modelos dependiendo de la marca seleccionada
    $('#marca').on('change', function() {
      const selectedBrand = $(this).val();
      $('#modelo').prop('disabled', !selectedBrand);
  
      // Limpiar y cargar modelos según la marca seleccionada
      if (selectedBrand) {
        $.ajax({
          url: `http://localhost:8087/coches/modelos/${selectedBrand}`,
          method: 'GET',
          success: function(models) {
            $('#modelo').empty().append('<option value="">Seleccionar Modelo</option>');
            models.forEach(function(model) {
              $('#modelo').append(`<option value="${model}">${model}</option>`);
            });
          },
          error: function() {
            $('#modelo').empty().append('<option value="">No se encontraron modelos</option>');
          }
        });
      }
    });
  
    // Deslizador de precio
    $('#precioRange').on('input', function() {
      const minPrice = 0;
      const maxPrice = $(this).val();
      $('#precioValue').text(maxPrice);
    });
  
    // Enviar los filtros
    $('#filtersForm').on('submit', function(e) {
      e.preventDefault();
      
      const filtros = {};
  
      // Recoger los valores de los filtros
      const filters = {
        tipoVehiculo: $('#tipoVehiculo').val(),
        marca: $('#marca').val(),
        modelo: $('#modelo').val(),
        precioMin: 0,  // Precio mínimo siempre es 0
        precioMax: $('#precioRange').val(),  // Tomamos el valor máximo del deslizador
        tipoCombustible: $('#tipoCombustible').val(),
        transmision: $('#transmisionSelect').val()
      };
  
      // Filtramos los valores vacíos y los agregamos a la variable `filtros`
      console.log(filters)
  
      // Realizar la solicitud AJAX con los filtros
      $.ajax({
        url: 'http://localhost:8087/coches/filtrar',  // Cambia esta URL si es necesario
        method: 'GET',
        dataType: "json",
        data: filtros,
        success: function(data) {
          displayCarResults(data);
        },
        error: function() {
          $('#carResults').html('<p class="text-white">Hubo un error al cargar los coches.</p>');
        }
      });
    });
  
    // Mostrar los resultados de los coches
    function displayCarResults(cars) {
      $('#carResults').empty();
      if (cars.length === 0) {
        $('#carResults').html('<p class="text-white">No se encontraron coches.</p>');
      } else {
        let resultsHtml = '<div class="grid grid-cols-1 gap-4">';
        cars.forEach(car => {
          resultsHtml += `
            <div class="bg-gray-800 text-white p-4 rounded-lg">
              <h3 class="text-xl font-bold">${car.marca} ${car.modelo}</h3>
              <p>Tipo: ${car.tipoVehiculo}</p>
              <p>Precio: $${car.precio}</p>
              <p>Combustible: ${car.tipoCombustible}</p>
              <p>Transmisión: ${car.transmision}</p>
            </div>
          `;
        });
        resultsHtml += '</div>';
        $('#carResults').html(resultsHtml);
      }
    }
  });
  