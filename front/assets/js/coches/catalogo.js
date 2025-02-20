$(document).ready(function() {

    let coches = []; // Lista completa de coches
    let cochesFiltrados = []; // Lista de coches filtrados
    let pageCoches = 1; // Página actual
    const cochesPorPagina = 9; // Límite cambiado a 9
  
    // Obtener el precio máximo
    $.ajax({
      url: 'http://localhost:8087/coches/precioMaximo',
      method: 'GET',
      success: function(precioMax) {
        $('#precioRange').attr('max', precioMax).val(precioMax);
        $('#precioValue').text(precioMax);
      },
      error: function() {
        console.log("No se pudo obtener el precio máximo.");
      }
    });
  
    // Mostrar precio en el slider
    $('#precioRange').on('input', function() {
      const maxPrice = $(this).val();
      $('#precioValue').text(maxPrice);
    });
  
    // Cargar marcas
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
  
    // Cambiar modelos según marca
    $('#marca').on('change', function() {
      const selectedBrand = $(this).val();
      $('#modelo').prop('disabled', !selectedBrand);
  
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
        $('#modelo').empty().append('<option value="">Seleccionar Modelo</option>').prop('disabled', true);
      }
    });
  
    // Mostrar/ocultar acordeones
    $('.accordion-item button').on('click', function() {
      const target = $(this).data('toggle');
      const arrow = $(this).find('span');
      $('#' + target).toggleClass('hidden');
      arrow.toggleClass('rotate-180');
    });
  
    // Obtener tipos de coche
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
  
    // Obtener tipos de combustible
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
  
    // Obtener tipos de transmisión
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
  
    // Obtener todos los coches
    function obtenerTodosCoches() {
      $.ajax({
        url: "http://localhost:8087/coches/",
        type: "GET",
        success: function(response) {
          coches = response;
          cochesFiltrados = [...coches];
          pageCoches = 1;
          $('#vehiculos-container').empty();
          mostrarCoches();
        },
        error: function(xhr, status, error) {
          toastr.error("Error al obtener los coches: " + error);
        }
      });
    }
  
    // Mostrar coches paginados
    function mostrarCoches() {
      const inicio = (pageCoches - 1) * cochesPorPagina;
      const fin = pageCoches * cochesPorPagina;
      const cochesAMostrar = cochesFiltrados.slice(inicio, fin);
  
      cochesAMostrar.forEach(function(coche) {
        const cocheHTML = `
          <div class="max-w-sm bg-[#191919] text-white rounded-2xl p-5 shadow-lg space-y-4 flex flex-wrap justify-between flex-col">
            <div class="w-100">
              <img src="./fotos/fotos_coches/${coche.imagen}" alt="${coche.marca} ${coche.modelo}" class="w-full rounded-xl" />
            </div>
            <div class="w-full">
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
                    ${coche.numeroAsientos} Pasajeros
                  </div>
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
                <img class="hover:scale-[1.1] transition transition-all ease-in-out flecha-btn" src="./fotos/flecha.svg" data-id="${coche.id}">
              </div>
            </div>
          </div>
        `;
        $('#vehiculos-container').append(cocheHTML);
      });
  
      if (fin < cochesFiltrados.length) {
        $('#mostrar-mas-coches').show();
      } else {
        $('#mostrar-mas-coches').hide();
      }
    }
  
    // Evento "Mostrar más coches"
    $('#mostrar-mas-coches').on('click', function() {
      pageCoches++;
      mostrarCoches();
    });
  
    // Filtrar coches por marca o modelo
    $('#filtrarBtn').on('click', function(e) {
      e.preventDefault();
      const filtro = $('#filtroInput').val().toLowerCase();
  
      cochesFiltrados = coches.filter(coche => {
        return coche.marca.toLowerCase().includes(filtro) ||
               coche.modelo.toLowerCase().includes(filtro);
      });
  
      pageCoches = 1;
      $('#vehiculos-container').empty();
      mostrarCoches();
    });
  
    // Enviar los filtros avanzados
    $('#filtersForm').on('submit', function(e) {
      e.preventDefault();
      const filtros = {
        tipoVehiculo: $('#tipoVehiculo').val() || null,
        marca: $('#marca').val() || null,
        modelo: $('#modelo').val() || null,
        precioMax: $('#precioRange').val() || null,
        tipoCombustible: $('#tipoCombustible').val() || null,
        transmision: $('#transmisionSelect').val() || null
      };
  
      Object.keys(filtros).forEach(key => {
        if (filtros[key] === "" || filtros[key] === null) {
          delete filtros[key];
        }
      });
  
      $.ajax({
        url: 'http://localhost:8087/coches/filtrar',
        method: 'GET',
        dataType: "json",
        data: filtros,
        success: function(coches) {
          cochesFiltrados = coches; // Actualizamos la lista filtrada
          pageCoches = 1;
          $('#vehiculos-container').html('');
          mostrarCoches();
        },
        error: function(xhr, status, error) {
          toastr.error("Error al obtener los coches: " + error);
        }
      });
    });
  
    // Evento para los botones de detalle
    $(document).on('click', '.flecha-btn', function() {
      var cocheId = $(this).data('id');
      window.location.href = `./cocheDetalles.html?id=${cocheId}`;
    });
  
    // Llamada inicial
    obtenerTodosCoches();
  
  });
  