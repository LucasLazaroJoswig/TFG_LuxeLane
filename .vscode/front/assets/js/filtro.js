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
        success: function(coches) {
          // Limpiar el contenedor antes de agregar los coches
          $('#vehiculos-container').html('');

          // Recorrer los coches y mostrarlos
          coches.forEach(function(coche) {
              var cocheHTML = `
              <div class="max-w-sm bg-[#191919] text-white rounded-2xl p-5 shadow-lg space-y-4">
                  <img src="./fotos/fotos_coches/${coche.imagen}" alt="${coche.marca} ${coche.modelo}" class="w-full rounded-xl" />
                  <div class="text-xs bg-gray-800 px-2 py-1 rounded-full w-max">${coche.tipoVehiculo}</div>
                  <h2 class="text-2xl font-bold text-left">${coche.marca} ${coche.modelo}</h2>
                  <ul class="space-y-1">
                      <li class="flex justify-between gap-2">
                          <div class="flex gap-3">
                              <img src="./assets/iconos/puerta.svg">
                              Puertas
                            </div>
                            ${coche.numeroPuertas}
                      </li>
                      <li class="flex justify-between gap-2">
                          <div class="flex gap-3">
                              <img src="./assets/iconos/pasajeros.svg">
                              Pasajeros
                          </div>
                          ${coche.numeroAsientos}
                      </li>
                      <li class="flex justify-between gap-2">
                          <div class="flex gap-3">
                              <img src="./assets/iconos/gasolina.svg">
                              ${coche.tipoMotor}
                          </div>
                          <img src="./assets/iconos/done.svg">
                      </li>
                  </ul>
                  <div class="flex items-center justify-between mt-4">
                  <div>
                      <span class="text-2xl font-bold">&euro;${coche.precioPorDia}</span>
                      <span class="text-sm text-gray-400">/Por Día</span>
                  </div>
                      <img class="hover:scale-[1.1] transition transition-all ease-in-out" src="./fotos/flecha.svg">
                      
                  </div>
                  </div>

              `;
              $('#vehiculos-container').append(cocheHTML);
          });
          
      },
      error: function(xhr, status, error) {
          toastr.error("Error al obtener los coches: " + error);
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
  