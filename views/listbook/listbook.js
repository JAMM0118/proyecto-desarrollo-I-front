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
                        <strong>Cantidad disponible: ${libro.copiasDisponibles}<br>
                    </div>
                    <p class="text-center pull-right">
                        <a data-libro-id="${libro.id}" class="btn btn-danger btn-xs" style="margin-right: 10px;"><i class="zmdi zmdi-delete"></i> &nbsp;&nbsp;Eliminar</a>
                    </p>
                    <p class="text-center pull-right">
                        <a data-libro-id="${libro.id}" class="btn btn-success btn-xs" style="margin-right: 10px;"><i class="zmdi zmdi-refresh"></i> &nbsp;&nbsp;Editar</a>
                    </p>
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
            Swal.fire({
                title: "Informacion del libro",
                confirmButtonText: "Cerrar",
                html: '<div style="text-align: left;">' +
                `<strong>ID:</strong> ${libro["id"]}<br>` +
                `<strong>ISBN:</strong> ${libro["isbn"]}<br>` +
                `<strong>Título:</strong> ${libro["titulo"]}<br>` +
                `<strong>Autor:</strong> ${libro["autor"]}<br>` +
                `<strong>Fecha de Publicación:</strong> ${libro["fechaPublicacion"]}<br>` +
                `<strong>Numero de paginas:</strong> ${libro["numeroPaginas"]}<br>` +
                `<strong>Genero:</strong> ${libro["genero"]}<br>` +
                `<strong>Descripcion:</strong> ${libro["descripcion"]}<br>` +
                `<strong>Copias Totales:</strong> ${libro["copiasTotales"]}<br>` +
                `<strong>Copias Disponibles:</strong> ${libro["copiasDisponibles"]}<br> </div>`,    
             });

            console.log("Hiciste clic en el botón 'Más información'" + libroId);
        });
    });

    const token = localStorage.getItem('token');

    function reload() {
        localStorage.setItem('homeElements', '/views/listbook/listbook.html');
        window.location = '/views/home/home.html';
    };

    const botonActualizar = document.querySelectorAll('.btn-success');
    botonActualizar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const libroId = event.currentTarget.dataset.libroId;
            const libro = libros.find(libro => libro.id == libroId);
            console.log(libro);

            function showFormWithDefaults(isbnValue, titleValue, authorValue, dateValue, pagesValue, genreValue, descriptionValue, copiesValue, copiesDValue) {
                Swal.fire({
                    title: "Actualizar información del libro",
                    html:
                        '<form id="form-swal" style="text-align: left;">' +
                        '<label for="isbn" class="swal2-label">ISBN:</label>' +
                        '<input type="text" pattern="[0-9]{1,12}" maxlength="12" id="isbn" name="isbn" class="swal2-input">' +

                        '<label for="title" class="swal2-label">Titulo:</label>' +
                        '<input type="text" id="title" name="title" class="swal2-input"><br>' +

                        '<label for="author" class="swal2-label">Autor:</label>' +
                        '<input type="text" id="author" name="author" class="swal2-input"><br>' +

                        '<label for="fecha" class="swal2-label">Fecha de publicacion:</label>' +
                        '<input type="date" id="fecha" name="fecha" class="swal2-input">' +

                        '<label for="pages" class="swal2-label">Numero de paginas:</label>' +
                        '<input type="text" pattern="[0-9]{1,5}" maxlength="5" id="pages" name="pages" class="swal2-input">' +


                        '<label for="genre" class="swal2-label">Genero:</label>' +
                        '<input type="text" id="genre" name="genre" class="swal2-input">' +

                        '<label for="description" class="swal2-label">Descripcion:</label>' +
                        '<input type="text" id="description" name="description" class="swal2-input">' +

                        '<label for="copies" class="swal2-label">Copias totales:</label>' +
                        '<input type="text" pattern="[0-9]{1,7}" maxlength="7" id="copies" name="copies" class="swal2-input">' +

                        '<label for="copiesD" class="swal2-label">Copias Disponibles:</label>' +
                        '<input type="text" pattern="[0-9]{1,7}" maxlength="7" id="copiesD" name="copiesD" class="swal2-input">' +
                        '</form>',
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Enviar",
                    confirmButtonColor: "#3598D9", // Color de fondo del botón confirmar
                    cancelButtonColor: "#dc3545", // Color de fondo del botón cancelar
                    focusConfirm: false, // Evita que el botón confirmar obtenga el foco
                    preConfirm: () => {
                        const form = document.getElementById('form-swal');
                        if (!form.checkValidity()) {
                            let invalidField = null;
                
                            Array.from(form.elements).forEach(element => {
                                if (!element.checkValidity()) {
                                    invalidField = element;
                                }
                            });
                
                            if (invalidField) {
                                Swal.showValidationMessage(`Campo no válido: ${invalidField.name}`);
                            } else {
                                Swal.showValidationMessage('Por favor, asegúrese de que todos los campos sean válidos.');
                            }
                
                            return false;
                        }
                        // Validación opcional o procesamiento antes de enviar
                        //datos del formulario
                        const isbn = document.getElementById('isbn').value;
                        const titulo = document.getElementById('title').value;
                        const author = document.getElementById('author').value;
                        const fecha = document.getElementById('fecha').value;                        
                        const pages = document.getElementById('pages').value;
                        const genero = document.getElementById('genre').value;
                        const descripcion = document.getElementById('description').value;
                        const copiasTotales =  document.getElementById('copies').value;
                        const copiasDisponibles = document.getElementById('copiesD').value;
                        
                        if (!isbn || !titulo || !fecha || !author || !pages || !genero || !descripcion || !copiasTotales || !copiasDisponibles) {
                            Swal.showValidationMessage('Por favor, completa todos los campos');
                            return false;
                        }
                        return { isbn: isbn, titulo: titulo, author: author,fecha: fecha, pages: pages, genero: genero, descripcion: descripcion, copiasTotales: copiasTotales, copiasDisponibles: copiasDisponibles};
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        //json pra enviar
                        const data = {
                            isbn: result.value.isbn,
                            titulo: result.value.titulo,
                            autor:  result.value.author,
                            fechaPublicacion: result.value.fecha,
                            numeroPaginas: result.value.pages,
                            genero: result.value.genero,
                            descripcion: result.value.descripcion,
                            copiasTotales:result.value.copiasTotales,
                            copiasDisponibles: result.value.copiasDisponibles
                        }
                        console.log(data);
                        try {
                            const response = await fetch(`https://proyecto-desarrollo-back-production.up.railway.app/api/libros/${libroId}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify(data)
                            });

                            if (!response.ok) {
                                throw new Error('Error al modificar el libro');
                            };

                            const responseData = await response.json();
                            console.log(responseData);


                            Swal.fire({
                                title: "Datos enviados correctamente",
                                text: "El libro ha sido modificado correctamente",
                                icon: "success",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    reload();
                                }
                            });

                        } catch (error) {
                            console.log(error);
                        }


                   }
                });

                // Asignar valores predeterminados después de crear el formulario
                document.getElementById('isbn').value = isbnValue;
                document.getElementById('title').value = titleValue;
                document.getElementById('author').value = authorValue;

                document.getElementById('pages').value = pagesValue;
                console.log(typeof pagesValue);
                
                document.getElementById('genre').value = genreValue;
                document.getElementById('fecha').value = dateValue;
                console.log(dateValue instanceof Object ? 'date' : 'no date');
                
                document.getElementById('description').value = descriptionValue;
                document.getElementById('copies').value = copiesValue;
                console.log(typeof copiesValue);
                
                document.getElementById('copiesD').value = copiesDValue;
                console.log(typeof copiesDValue)


            }

            // Llamar a la función con valores predeterminados
            showFormWithDefaults(libro.isbn, libro.titulo, libro.autor, libro.fechaPublicacion, libro.numeroPaginas, libro.genero, libro.descripcion, libro.copiasTotales, libro.copiasDisponibles);
            console.log("Hiciste clic en el botón 'Más información'" + libroId);
        });
    });



    const botonEliminar = document.querySelectorAll('.btn-danger');
    botonEliminar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const libroId = event.currentTarget.dataset.libroId;
            const libro = libros.find(libro => libro.id == libroId);
            console.log(libro);
            const data = {
                id: libro.id,
            }

            console.log(data);

            Swal.fire({
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Confirmar",
                confirmButtonColor: "#3598D9", // Color de fondo del botón confirmar
                cancelButtonColor: "#dc3545", // Color de fondo del botón cancelar
                focusConfirm: false, // Evita que el botón confirmar obtenga el foco
                title: `¿Estás seguro de eliminar este libro?`

            }).then(async(result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await fetch(`https://proyecto-desarrollo-back-production.up.railway.app/api/libros/${libroId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(data)
                        });

                        if (!response.ok) {
                            throw new Error('Error al eliminar el cliente');
                        };
                        reload();
                    } catch (error) {
                        console.log(error);
                    }
                }
            });



            console.log("Hiciste clic en el botón 'Más información'" + libroId);
        });
    });


})();

