(async function () {
    const urlListBook = 'https://proyecto-desarrollo-back-production.up.railway.app/api/libros';
    const table = document.querySelector('.container-fluid');

    function template(libro) {
        return `<div class="media media-hover">
                    <div class="media-left media-middle">
                        <a href="#!" class="tooltips-general" data-toggle="tooltip" data-placement="right" title="Más información del libro">
                          <img class="media-object" src="../../assets/img/book.png" alt="Libro" width="48" height="48">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">${libro.id} - ${libro.titulo}</h4>
                        <div class="pull-left">
                            <strong>${libro.autor}<br>
                            <strong>${libro.fechaPublicacion}<br>
                        </div>
                        <p class="text-center pull-right">
                            <a href="#!" data-libro-id="${libro.id}" class="btn btn-info btn-xs" style="margin-right: 10px;"><i class="zmdi zmdi-info-outline"></i> &nbsp;&nbsp; Más información</a>
                        </p>
                    </div>
                </div>`;
    }

    const cargarLibros = async () => {
        try {
            console.log("Cargando libros...");
            const response = await fetch(urlListBook);
            if (!response.ok) {
                throw new Error('Error al cargar los libros');
            }
            const data = await response.json();
            console.log("Libros cargados:", data);
            return data;
        } catch (error) {
            console.error('Error al cargar libros:', error);
            return []; // Devuelve un array vacío en caso de error
        }
    };

    const renderizarLibros = async () => {
        const libros = await cargarLibros();
        console.log("Libros cargados:", libros);
        table.innerHTML = ""; // Limpiar contenido anterior
        libros.forEach(libro => {
            table.innerHTML += template(libro);
        });
        // Volver a vincular los eventos después de renderizar los libros
        vincularEventos();
    };

    function mostrarInformacionLibro(event) {
        // Obtén el ID del libro del atributo de datos del botón
        const libroId = event.target.dataset.libroId;
        
        // Aquí puedes usar el ID del libro para obtener más información sobre ese libro, por ejemplo, haciendo otra solicitud a la API
        
        // Por ahora, simplemente mostraremos un mensaje en la consola con el ID del libro
        console.log("Mostrar información del libro con ID:", libroId);
    }

    const vincularEventos = () => {
        // Aquí debes volver a vincular los eventos necesarios
        // Por ejemplo, si necesitas un evento para cada botón "Más información", puedes hacerlo aquí
        const botonesMasInformacion = document.querySelectorAll('.btn-info');
        botonesMasInformacion.forEach(boton => {
            boton.addEventListener('click', mostrarInformacionLibro);
        });
    };

    // Renderizar libros al cargar la página inicialmente
    await renderizarLibros();

   
})();
