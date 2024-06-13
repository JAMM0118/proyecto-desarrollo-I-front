(function () {
    // Agregar libros
    const urlNewBook = 'https://proyecto-desarrollo-back-production.up.railway.app/api/libros';

    // Guardo el boton y el token
    const guardarBtn = document.getElementById('guardarBtn');
    const token = localStorage.getItem('token');

    //evento de click al boton
    guardarBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        //datos del formulario
        const isbn = document.getElementById('isbn').value;
        const titulo = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const fechaPublicacion = document.getElementById('date').value;
        const numeroPaginas = document.getElementById('pages').value;
        const genero = document.getElementById('genre').value;
        const descripcion = document.getElementById('description').value;
        const copiasTotales = document.getElementById('copies').value;
        const copiasDisponibles = document.getElementById('copies').value;
        
        if(isbn === '' || titulo === '' || author === '' || fechaPublicacion === '' ||
            numeroPaginas === '' || genero === '' || descripcion === '' || copiasTotales === '' 
            || copiasDisponibles === ''){
            swal({
                title: "Por favor llena todos los campos!",
                type: "error",
                closeOnConfirm: false,
                animation: "slide-from-top",
                confirmButtonText: "Ok",
                confirmButtonColor: "#3598D9",
            });
            return;
        }
        //json pra enviar
        const data = {
            isbn: isbn,
            titulo: titulo,
            autor: author,
            fechaPublicacion: fechaPublicacion,
            numeroPaginas: numeroPaginas,
            genero: genero,
            descripcion: descripcion,
            copiasTotales: copiasTotales,
            copiasDisponibles: copiasDisponibles
        }

        try {
            const response = await fetch(urlNewBook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al agregar el libro');
            }

            const responseData = await response.json();
            console.log(responseData);

            swal({
                title: "Enviado!",
                text: "Tu formulario ha sido enviado correctamente.",
                type: "success",
                closeOnConfirm: false,
                animation: "slide-from-top",
                confirmButtonText: "Ok",
                confirmButtonColor: "#3598D9",
            });

            limpiarCampos();
        } catch (error) {
            console.log(error);
        }
    })


    // Limpiar campos del formulario
    function limpiarCampos() {
        document.getElementById('isbn').value = '';
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('date').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('genre').value = '';
        document.getElementById('description').value = '';
        document.getElementById('copies').value = '';
    }
})();


