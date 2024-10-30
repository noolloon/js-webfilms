let paginaActual = 1;
let paginaMaximaCargada = 1;
let peliculas = '';
let ultimaPelicula;
let observadorAbajo;
let observadorArriba;

const modoDeCargar = 'button'; // 'auto' para carga automática, 'button' para carga con botón, 'none' para sin carga adicional
const API_KEY = 'TU_API_KEY_AQUI';

const configurarCarga = () => {
    if (modoDeCargar === 'auto' || modoDeCargar === 'button') {
        observadorAbajo = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting && paginaActual === paginaMaximaCargada) {
                    if (modoDeCargar === 'auto') {
                        cargarSiguientePagina();
                    }
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px',
            threshold: 0.1
        });

        observadorArriba = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    const paginaElemento = entrada.target;
                    if (paginaElemento && paginaElemento.dataset.pagina) {
                        paginaActual = parseInt(paginaElemento.dataset.pagina);
                        actualizarContadorPagina();
                    }
                }
            });
        }, {
            rootMargin: '0px 0px -50% 0px',
            threshold: 0
        });
    }

    if (modoDeCargar === 'button') {
        const botonCargarMas = document.createElement('button');
        botonCargarMas.textContent = 'Cargar más películas';
        botonCargarMas.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-8 mx-auto block';
        botonCargarMas.addEventListener('click', cargarSiguientePagina);
        document.body.appendChild(botonCargarMas);
    }
};

const cargarSiguientePagina = () => {
    paginaActual++;
    paginaMaximaCargada = Math.max(paginaMaximaCargada, paginaActual);
    cargarPeliculas();
};

const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=${paginaActual}`);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            
            let nuevasPeliculas = '';
            datos.results.forEach((pelicula, index) => {
                nuevasPeliculas += `
                    <div class="pelicula zoomitem font-bold bg-slate-900 shadow-lg rounded-lg overflow-hidden cursor-pointer" data-id="${pelicula.id}" data-pagina="${paginaActual}">
                        <a href="javascript:void(0);" class="block">
                            <picture class="overflow-hidden block">
                                <img 
                                    class="poster w-full h-140 object-cover hover:scale-125 ease-in duration-150" 
                                    src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" 
                                    alt="${pelicula.title}"
                                />
                            </picture>
                            <div class="font-extrabold p-4">
                                <span class="font-[1000] text-white">${pelicula.title}</span>
                            </div>
                        </a>
                    </div>
                `;
            });

            document.getElementById('contenedor').insertAdjacentHTML('beforeend', nuevasPeliculas);
            actualizarContadorPagina();

            if (modoDeCargar === 'auto' || modoDeCargar === 'button') {
                const peliculasEnPantalla = document.querySelectorAll('#contenedor .pelicula');
                peliculasEnPantalla.forEach(pelicula => {
                    observadorArriba.observe(pelicula);
                });

                if (ultimaPelicula) {
                    observadorAbajo.unobserve(ultimaPelicula);
                }
                ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
                if (ultimaPelicula) {
                    observadorAbajo.observe(ultimaPelicula);
                }
            }
        } else {
            console.log('Hubo un error en la respuesta de la API');
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

const actualizarContadorPagina = () => {
    document.getElementById('contador').textContent = `Página: ${paginaActual}/${paginaMaximaCargada}`;
};

const abrirPaginaPelicula = (id) => {
    console.log('Abriendo película con ID:', id);
    window.open(`https://www.themoviedb.org/movie/${id}`, '_blank');
};

document.getElementById('contenedor').addEventListener('click', (e) => {
    e.preventDefault();
    const pelicula = e.target.closest('.pelicula');
    if (pelicula) {
        const id = pelicula.dataset.id;
        console.log('Clic en película con ID:', id);
        abrirPaginaPelicula(id);
    }
});

configurarCarga();
cargarPeliculas();