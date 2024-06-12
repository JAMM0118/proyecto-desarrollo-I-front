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
                        <a href="#!" class="btn btn-info btn-xs" style="margin-right: 10px;"><i class="zmdi zmdi-info-outline"></i> &nbsp;&nbsp; Más información</a>
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


})();

