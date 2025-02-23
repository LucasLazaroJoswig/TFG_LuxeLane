$(document).ready(function() {

    let motos = []; // Lista completa de motos
    let motosFiltrados = []; // Lista de motos filtrados
    let pagemotos = 1; // Página actual
    const motosPorPagina = 9; // Límite cambiado a 9
  
    // Obtener el precio máximo
    $.ajax({
      url: 'http://localhost:8087/motos/precioMaximo',
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
      url: 'http://localhost:8087/motos/marcas',
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
          url: `http://localhost:8087/motos/modelos/${selectedBrand}`,
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
  
    // Obtener tipos de moto
    $.ajax({
      url: 'http://localhost:8087/motos/tiposMoto',
      method: 'GET',
      success: function(tiposmoto) {
        $('#tipoVehiculo').empty().append('<option value="">Seleccionar Tipo de moto</option>');
        tiposmoto.forEach(function(tipo) {
          $('#tipoVehiculo').append(`<option value="${tipo}">${tipo}</option>`);
        });
      },
      error: function() {
        console.log("No se pudieron cargar los tipos de moto.");
      }
    });
  
    // Obtener tipos de combustible
    $.ajax({
      url: 'http://localhost:8087/motos/tiposCombustible',
      method: 'GET',
      success: function(tiposCombustible) {
        $('#tipoCombustible').empty().append('<option value="">Seleccionar Tipo de Motor</option>');
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
      url: 'http://localhost:8087/motos/tiposTransmision',
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
  
    // Obtener todos los motos
    function obtenerTodosmotos() {
      $.ajax({
        url: "http://localhost:8087/motos/",
        type: "GET",
        success: function(response) {
          motos = response;
          motosFiltrados = [...motos];
          pagemotos = 1;
          $('#vehiculos-container').empty();
          mostrarmotos();
        },
        error: function(xhr, status, error) {
          toastr.error("Error al obtener los motos: " + error);
        }
      });
    }
  
    // Mostrar motos paginados
    function mostrarmotos() {
      const inicio = (pagemotos - 1) * motosPorPagina;
      const fin = pagemotos * motosPorPagina;
      const motosAMostrar = motosFiltrados.slice(inicio, fin);
  
      motosAMostrar.forEach(function(moto) {
        const motoHTML = `
          <div class="max-w-sm bg-[#191919] text-white rounded-2xl p-5 shadow-lg space-y-4 flex flex-wrap justify-between flex-col">
            <div class="w-100">
              <img src="./fotos/img_motos/${moto.imagen}" alt="${moto.marca} ${moto.modelo}" class="w-full rounded-xl" />
            </div>
            <div class="w-full">
              <div class="text-xs bg-gray-800 px-2 py-1 rounded-full w-max">${moto.tipoVehiculo}</div>
              <h2 class="text-2xl font-bold text-left">${moto.marca} ${moto.modelo}</h2>
              <hr class="my-2 w-full border-gray-600">
              <ul class="space-y-1">
                <li class="flex justify-between gap-2">
                  <div class="flex gap-3">
                    
                    Potencia (caballos)
                  </div>
                  ${moto.potenciaHp}
                </li>
                <li class="flex justify-between gap-2">
                  <div class="flex gap-3">

                    Cilindrada (CC)
                  </div>
                  ${moto.cilindrada}
                </li>
                <li class="flex justify-between gap-2">
                  <div class="flex gap-3">
                    ${moto.tipoMotor}
                  </div>
                  <img src="./assets/iconos/done.svg">
                </li>
              </ul>
              <div class="flex items-center justify-between mt-4">
                <div>
                  <span class="text-2xl font-bold">&euro;${moto.precioPorDia}</span>
                  <span class="text-sm text-gray-400">/Por Día</span>
                </div>
                <img class="hover:scale-[1.1] transition transition-all ease-in-out flecha-btn" src="./fotos/flecha.svg" data-id="${moto.id}">
              </div>
            </div>
          </div>
        `;
        $('#vehiculos-container').append(motoHTML);
      });
  
      if (fin < motosFiltrados.length) {
        $('#mostrar-mas-motos').show();
      } else {
        $('#mostrar-mas-motos').hide();
      }
    }
  
    // Evento "Mostrar más motos"
    $('#mostrar-mas-motos').on('click', function() {
      pagemotos++;
      mostrarmotos();
    });
  
    // Filtrar motos por marca o modelo
    $('#filtrarBtn').on('click', function(e) {
      e.preventDefault();
      const filtro = $('#filtroInput').val().toLowerCase();
  
      motosFiltrados = motos.filter(moto => {
        return moto.marca.toLowerCase().includes(filtro) ||
               moto.modelo.toLowerCase().includes(filtro);
      });
  
      pagemotos = 1;
      $('#vehiculos-container').empty();
      mostrarmotos();
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
        url: 'http://localhost:8087/motos/filtrar',
        method: 'GET',
        dataType: "json",
        data: filtros,
        success: function(motos) {
          motosFiltrados = motos; // Actualizamos la lista filtrada
          pagemotos = 1;
          $('#vehiculos-container').html('');
          mostrarmotos();
        },
        error: function(xhr, status, error) {
          toastr.error("Error al obtener los motos: " + error);
        }
      });
    });
  
    // Evento para los botones de detalle
    $(document).on('click', '.flecha-btn', function() {
      var motoId = $(this).data('id');
      window.location.href = `./motoDetalles.html?id=${motoId}`;
    });
  
    // Llamada inicial
    obtenerTodosmotos();
  
  });
  