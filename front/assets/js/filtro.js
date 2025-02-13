$(document).ready(function() {

  $.ajax({
    url: 'http://localhost:8087/coches/precioMaximo',
    method: 'GET',
    success: function(precioMax) {
      // Establecer el valor máximo del slider al precio máximo
      $('#precioRange').attr('max', precioMax).val(precioMax);
      $('#precioValue').text(precioMax);
    },
    error: function() {
      console.log("No se pudo obtener el precio máximo.");
    }
  });

  // Función para mostrar el precio en el slider
  $('#precioRange').on('input', function() {
    const maxPrice = $(this).val();
    $('#precioValue').text(maxPrice);
  });

  $.ajax({
    url: 'http://localhost:8087/coches/marcas',
    method: 'GET',
    success: function(marcas) {
      $('#marca').empty().append('<option value="">Seleccionar Marca</option>');
      marcas.forEach(function(marca) {
        $('#marca').append(`<option value="${marca}">${marca}</option>`);
      });
    },
    error: function() {
      console.log("No se pudieron cargar las marcas.");
    }
  });

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
    } else {
      // Si la marca está vacía, también vaciamos el modelo
      $('#modelo').empty().append('<option value="">Seleccionar Modelo</option>').prop('disabled', true);
    }
  });

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
      filtros.tipoVehiculo = $('#tipoVehiculo').val() || null;
      filtros.marca = $('#marca').val() || null;
      filtros.modelo = $('#modelo').val() || null;
      filtros.precioMax = $('#precioRange').val() || null;
      filtros.tipoCombustible = $('#tipoCombustible').val() || null;
      filtros.transmision = $('#transmisionSelect').val() || null;
    
      // Filtrar los valores vacíos y eliminarlos de `filtros`
      Object.keys(filtros).forEach(key => {
        if (filtros[key] === "" || filtros[key] === null) {
          delete filtros[key];  // Eliminar filtros vacíos
        }
      });
    
      console.log(filtros);  // Verifica los valores antes de la solicitud
    
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
      // Obtener todos los tipos de coche al cargar la página
      $.ajax({
        url: 'http://localhost:8087/coches/tiposCoche',
        method: 'GET',
        success: function(tiposCoche) {
          $('#tipoVehiculo').empty().append('<option value="">Seleccionar Tipo de Coche</option>');
          tiposCoche.forEach(function(tipo) {
            $('#tipoVehiculo').append(`<option value="${tipo}">${tipo}</option>`);
          });
        },
        error: function() {
          console.log("No se pudieron cargar los tipos de coche.");
        }
      });

      $.ajax({
        url: 'http://localhost:8087/coches/tiposCombustible',
        method: 'GET',
        success: function(tiposCombustible) {
          $('#tipoCombustible').empty().append('<option value="">Seleccionar Tipo de Combustible</option>');
          tiposCombustible.forEach(function(tipo) {
            $('#tipoCombustible').append(`<option value="${tipo}">${tipo}</option>`);
          });
        },
        error: function() {
          console.log("No se pudieron cargar los tipos de combustible.");
        }
      });

      $.ajax({
        url: 'http://localhost:8087/coches/tiposTransmision',
        method: 'GET',
        success: function(tiposTransmision) {
          $('#transmisionSelect').empty().append('<option value="">Seleccionar Transmisión</option>');
          tiposTransmision.forEach(function(tipo) {
            $('#transmisionSelect').append(`<option value="${tipo}">${tipo}</option>`);
          });
        },
        error: function() {
          console.log("No se pudieron cargar los tipos de transmisión.");
        }
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
              <img src="./fotos/fotos_coches/${car.imagen}" alt="${car.marca} ${car.modelo}">
              <p>Tipo: ${car.tipoVehiculo}</p>
              <p>Precio: $${car.precioPorDia}/dia</p>
              <p>Combustible: ${car.tipoMotor}</p>
              <p>Transmisión: ${car.transmision}</p>
            </div>
          `;
        });
        resultsHtml += '</div>';
        $('#carResults').html(resultsHtml);
      }
    }
  });
  