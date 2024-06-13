(async function () {

    const urlLoan = 'https://proyecto-desarrollo-back-production.up.railway.app/api/prestamos';
    const urlCliente = 'https://proyecto-desarrollo-back-production.up.railway.app/api/clientes';
    const urlLibro = 'https://proyecto-desarrollo-back-production.up.railway.app/api/libros';


    const table = document.querySelector('.table-responsive')

    const cargarClientes = async () => {
        console.log("cargando objetos");
        const array = [];
        // const res = await fetch('data.json');
        const res = await fetch(urlCliente);
        const data = await res.json();
        data.forEach(cliente => {
            array.push(cliente);
        });
        return array;
    }

    const cargarLibros = async () => {
        console.log("cargando objetos");
        const array = [];
        // const res = await fetch('data.json');
        const res = await fetch(urlLibro);
        const data = await res.json();
        data.forEach(libro => {
            array.push(libro);
        });
        return array;
    }

    let libros = await cargarLibros();
    let clientes = await cargarClientes();

    function formatearFecha(fechaParaFormatear) {
        let fecha = new Date(fechaParaFormatear);
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan desde 0
        let año = fecha.getFullYear();

        // Asegurándose de que el día y el mes sean de dos dígitos
        if (dia < 10) dia = '0' + dia;
        if (mes < 10) mes = '0' + mes;
        return `${dia}/${mes}/${año}`;

    }

    function template(prestamos) {
        for (let i = 0; i < clientes.length; i++) {
            if (prestamos.clienteId == clientes[i].id) {
                for (let j = 0; j < libros.length; j++) {
                    if (prestamos.libroPrestadoId == libros[j].id) {
                        return `<div class="div-table" style="margin:0 !important;">
                                    <div class="div-table-row div-table-row-list">
                                        <div class="div-table-cell" style="width: 6%;">${prestamos.id}</div>
                                        <div class="div-table-cell" style="width: 8%;">${prestamos.libroPrestadoId}</div>
                                        <div class="div-table-cell" style="width: 10%;">${libros[j].titulo}</div>
                                        <div class="div-table-cell" style="width: 10%;">${clientes[i].identificacion}</div>
                                        <div class="div-table-cell" style="width: 10%;">${clientes[i].nombreCompleto}</div>
                                        <div class="div-table-cell" style="width: 8%;">${formatearFecha(prestamos.fechaPrestamo)}</div>
                                        <div class="div-table-cell" style="width: 8%;">${formatearFecha(prestamos.fechaDevolucion)}</div>
                                        <div class="div-table-cell" style="width: 10%;">${prestamos.valorMulta}</div>
                                        <div  class="div-table-cell" style="width: 8%;"><button data-prestamos-id="${prestamos.id}" class="btn btn-success"><i class="zmdi zmdi-time-restore"></i></button></div>
                        
                        
                                    </div>
                                </div>`
                    }
                }
            }

        }
    }

    const cargarPrestamos = async () => {
        console.log("cargando objetos");
        const array = [];
        // const res = await fetch('data.json');
        const res = await fetch(urlLoan);
        const data = await res.json();
        console.log(data);

        data.forEach(prestamo => {
            if (prestamo.estado === 'PENDIENTE') {
                array.push(prestamo);
            }
        });


        return array;
    }

    const prestamos = await cargarPrestamos();

    prestamos.forEach(prestamo => {
        table.innerHTML += template(prestamo);
    })

    const botonRecibirLibro = document.querySelectorAll('.btn-success');
    botonRecibirLibro.forEach(boton => {
        boton.addEventListener('click', async (event) => {
            event.preventDefault();
            const prestamosId = event.currentTarget.dataset.prestamosId;
            const libroDevuelto = await prestamos.find(prestamo => prestamo.id == prestamosId);
            console.log(libroDevuelto);
            Swal.fire({
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Confirmar",
                confirmButtonColor: "#3598D9", // Color de fondo del botón confirmar
                cancelButtonColor: "#dc3545", // Color de fondo del botón cancelar
                focusConfirm: false, // Evita que el botón confirmar obtenga el foco
                title: "¿Quieres confirmar la devolucion del libro?"
            }).then(async (result) => {
                if(result.isConfirmed){
                    let tokenUser = localStorage.getItem('token');
                    const data = {
                        id: libroDevuelto.id,
                    }
                    console.log(tokenUser);
                    console.log(data);
                    try {
                        let urlDevuelto = `https://proyecto-desarrollo-back-production.up.railway.app/api/prestamos/${libroDevuelto.id}`;
                        const response = await fetch(urlDevuelto, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${tokenUser}`
                            },
                            body: JSON.stringify(data)
                        });
            
                        if (!response.ok) {
                            throw new Error('Error al devolver el libro');
                        }

                        localStorage.setItem('homeElements', '/views/loanpending/loanpending.html');
                        window.location='/views/home/home.html';
                    } catch (error) {
                        console.log(error);
                    }
                }

            });
            
            console.log("Hiciste clic en el botón 'Más información'" + prestamosId);
        });
    });

})();