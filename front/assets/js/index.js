const cochesPorSlide = 4;
let slideActual = 0;
let totalSlides = 0;
let gruposDeCoches = [];

// Estilos necesarios para estructura fija y sin saltos
const style = document.createElement('style');
style.innerHTML = `
    .slider-wrapper {
        max-width: 87%;
        margin: 0 auto;
        overflow: hidden;
    }

    .slide-grupo {
        display: none;
        transition: opacity 0.5s ease-in-out;
        height: 450px;
    }

    .slide-grupo.activo {
        display: flex;
        opacity: 1;
        justify-content: center;
        gap: 1rem;
    }

    .slider-controles {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
    }

    .slider-controles button {
        background: transparent;
        border: none;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

function mostrarCoches() {
    $.ajax({
        url: 'http://localhost:8087/coches/',
        type: "GET",
        success: function(response) {
            if (Array.isArray(response)) {
                const coches = response;
                gruposDeCoches = [];

                for (let i = 0; i < coches.length; i += cochesPorSlide) {
                    gruposDeCoches.push(coches.slice(i, i + cochesPorSlide));
                }

                totalSlides = gruposDeCoches.length;

                renderSlider();

                // Controladores
                $('#btn-prev').on('click', function () {
                    slideActual = (slideActual - 1 + totalSlides) % totalSlides;
                    actualizarSlide();
                });

                $('#btn-next').on('click', function () {
                    slideActual = (slideActual + 1) % totalSlides;
                    actualizarSlide();
                });

            } else {
                console.error("Error: La respuesta no es un array. Respuesta:", response);
            }
        },
        error: function(xhr, status, error) {
            toastr.error("Error al obtener los coches: " + error);
        }
    });
}

function renderSlider() {
    let sliderHTML = gruposDeCoches.map((grupo, index) => {
        let cochesHTML = grupo.map(coche => `
            <div class="card text-white p-4 shadow-lg" style="height: 400px; width: 270px; background-color: #191919; border-radius: 25px;">
                <div style="height: 120px;">
                    <img src="./fotos/fotos_coches/${coche.imagen}" loading="lazy" alt="${coche.marca} ${coche.modelo}" class="d-block w-100" style="height: 100%; object-fit: cover; border-radius: 25px;">
                </div>
                <div class="card-body" style="height: 230px; position: relative;">
                    <span class="badge bg-secondary">${coche.tipoVehiculo}</span>
                    <h2 class="card-title fs-4">${coche.marca} ${coche.modelo}</h2>
                    <ul class="list-unstyled text-md">
                        <li class="d-flex justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <img src="./assets/iconos/puerta.svg" class="w-5 h-5">
                                Puertas
                            </div>
                            ${coche.numeroPuertas}
                        </li>
                        <li class="d-flex justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <img src="./assets/iconos/pasajeros.svg" class="w-5 h-5">
                                ${coche.numeroAsientos} Pasajeros
                            </div>
                        </li>
                    </ul>
                    <div class="d-flex justify-content-between align-items-center mt-4" style="position: absolute; bottom: 10px; width: 100%;">
                        <div>
                            <span class="fs-4 fw-bold">&euro;${coche.precioPorDia}</span>
                            <span class="text small">/Por Día</span>
                        </div>
                        <img class="flecha-btn" src="./fotos/flecha.svg" data-id="${coche.id}" style="width: 40px; height: 40px; cursor: pointer;">
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="slide-grupo ${index === 0 ? 'activo' : ''}" data-slide="${index}">
                ${cochesHTML}
            </div>
        `;
    }).join('');

    $('#vehiculos-container').html(`
        <div class="slider-wrapper">
            ${sliderHTML}
            <div class="slider-controles">
                <button id="btn-prev">
                    <img src="assets/iconos/Button - Previous slide.svg" alt="Anterior" width="50" height="50">
                </button>
                <button id="btn-next">
                    <img src="assets/iconos/Button - Next slide.svg" alt="Siguiente" width="50" height="50">
                </button>
            </div>
        </div>
    `);

    $('.flecha-btn').on('click', function () {
        const cocheId = $(this).data('id');
        window.location.href = `cocheDetalles.html?id=${cocheId}`;
    });
}

function actualizarSlide() {
    $('.slide-grupo').removeClass('activo');
    $(`.slide-grupo[data-slide="${slideActual}"]`).addClass('activo');
}

mostrarCoches();
