(async function () {

    const url = 'https://proyecto-desarrollo-back-production.up.railway.app/api/libros';

    const table = document.querySelector('.container-fluid')


    function template(libro) {
        return ` <div class="media media-hover">
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
                        <a data-libro-id="${libro.id}" class="btn btn-info btn-xs" style="margin-right: 10px;"><i class="zmdi zmdi-info-outline"></i> &nbsp;&nbsp; Más información</a>
                    </p>
                </div>
            </div>`
    }

    const cargarLibros = async () => {
        console.log("cargando objetos");
        const array = [];
        // const res = await fetch('data.json');
        const res = await fetch(url);
        const data = await res.json();
        data.forEach(libro => {
            array.push(libro);
        });
        return array;
    }

    let libros = await cargarLibros();

    console.log(libros);

    libros.forEach(libro => {
        table.innerHTML += template(libro);
    })


    const botonMasInformacion = document.querySelectorAll('.btn-info');
    botonMasInformacion.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const libroId = event.currentTarget.dataset.libroId;
            const libro = libros.find(libro => libro.id == libroId);
            console.log(libro);
            swal({
                title: "Informacion del libro",
                closeOnConfirm: false,
                animation: "slide-from-top",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#3598D9",
                html: true,
                text: `<div style='text-align: left;'>
                        <strong>ID:</strong> ${libro['id']}<br>
                        <strong>ISBN:</strong> ${libro['isbn']}<br>
                        <strong>Título:</strong> ${libro['titulo']}<br>
                        <strong>Autor:</strong> ${libro['autor']}<br>
                        <strong>Fecha de Publicación:</strong> ${libro['fechaPublicacion']}<br>
                        <strong>Numero de paginas:</strong> ${libro['numeroPaginas']}<br>
                        <strong>Genero:</strong> ${libro['genero']}<br>
                        <strong>Descripcion:</strong> ${libro['descripcion']}<br>
                        <strong>Copias Totales:</strong> ${libro['copiasTotales']}<br>
                        <strong>Copias Disponibles:</strong> ${libro['copiasDisponibles']}<br>
                        </div>`,
                });
            console.log("Hiciste clic en el botón 'Más información'" + libroId);
        });
    });


})();

