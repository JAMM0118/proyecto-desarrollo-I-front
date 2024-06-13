
(async function () {

    const urlClient = 'https://proyecto-desarrollo-back-production.up.railway.app/api/clientes';
    const urlPrestamos = 'https://proyecto-desarrollo-back-production.up.railway.app/api/prestamos';

    const table = document.querySelector('.table-responsive')

    function template(cliente) {
        return `<div class="div-table" style="margin:0 !important;">
                            <div class="div-table-row div-table-row-list">
                            <div class="div-table-cell" style="width: 6%;">${cliente.id}</div>
                            <div class="div-table-cell" style="width: 10%;">${cliente.identificacion}</div>
                            <div class="div-table-cell" style="width: 10%;">${cliente.nombreCompleto}</div>
                            <div class="div-table-cell" style="width: 8%;">${cliente.numeroTelefono}</div>
                            <div class="div-table-cell" style="width: 12%;">${cliente.correoElectronico}</div>
                                <div class="div-table-cell" style="width: 9%;">
                                    <button data-cliente-id="${cliente.id}" class="btn btn-success"><i class="zmdi zmdi-refresh"></i></button>
                                </div>
                                <div class="div-table-cell" style="width: 9%;">
                                    <button data-cliente-id="${cliente.id}" class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>
                                </div>
                            </div>
                        </div>`
    }

    const cargarClientes = async () => {
        console.log("cargando objetos");
        const array = [];
        // const res = await fetch('data.json');
        const res = await fetch(urlClient);
        const data = await res.json();
        data.forEach(cliente => {
            array.push(cliente);
        });
        return array;
    }

    let clientes = await cargarClientes();

    console.log(clientes);

    clientes.forEach(cliente => {
        table.innerHTML += template(cliente);
    })

    const token = localStorage.getItem('token');

    function reload() {
        localStorage.setItem('homeElements', '/views/listclients/listclients.html');
        window.location = '/views/home/home.html';
    };

    const botonActualizar = document.querySelectorAll('.btn-success');
    botonActualizar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const clienteId = event.currentTarget.dataset.clienteId;
            const cliente = clientes.find(cliente => cliente.id == clienteId);
            console.log(cliente);

            function showFormWithDefaults(nameValue, emailValue, cedulaValue, telefonoValue) {
                Swal.fire({
                    title: "Actualizar información del cliente",
                    html:
                        '<form id="form-swal" style="text-align: left;">' +
                        '<label for="cedula" class="swal2-label">Identificacion:</label>' +
                        '<input type="text" id="cedula"  pattern="[0-9]{1,10}" maxlength="10"  name="cedula" class="swal2-input">' +
                        '<label for="name" class="swal2-label">Nombre Completo:</label>' +
                        '<input type="text" id="name" name="name" class="swal2-input"><br>' +
                        '<label for="phone" class="swal2-label">Telefono:</label>' +
                        '<input type="text" pattern="[0-9]{10,10}" maxlength="10" id="phone" name="phone" class="swal2-input">' +
                        '<label for="email" class="swal2-label">Correo:</label>' +
                        '<input type="email" id="email" name="email" class="swal2-input">' +
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
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const cedula = document.getElementById('cedula').value;
                        const telefono = document.getElementById('phone').value;
                        console.log("Nombre:", name);
                        console.log("Correo:", email);
                        console.log("Cedula:", cedula);
                        console.log("Telefono:", telefono);
                        if (!name || !email || !cedula || !telefono) {
                            Swal.showValidationMessage('Por favor, completa todos los campos');
                            return false;
                        }
                        return { name: name, email: email, cedula: cedula, telefono: telefono };
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {

                       
                        //json pra enviar
                        const data = {
                            identificacion: result.value.cedula,
                            nombreCompleto: result.value.name,
                            numeroTelefono: result.value.telefono,
                            correoElectronico: result.value.email,
                        }

                        console.log(data);
                        try {
                            const response = await fetch(`https://proyecto-desarrollo-back-production.up.railway.app/api/clientes/${clienteId}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify(data)
                            });

                            if (!response.ok) {
                                throw new Error('Error al modificar el cliente');
                            };

                            const responseData = await response.json();
                            console.log(responseData);


                            Swal.fire({
                                title: "Datos enviados correctamente",
                                text: `Nombre:${result.value.name}, Correo: ${result.value.email}, Cedula: ${result.value.cedula}, Telefono: ${result.value.telefono}`,
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
                document.getElementById('name').value = nameValue;
                document.getElementById('email').value = emailValue;
                document.getElementById('cedula').value = cedulaValue;
                document.getElementById('phone').value = telefonoValue;

            }

            // Llamar a la función con valores predeterminados
            showFormWithDefaults(cliente.nombreCompleto, cliente.correoElectronico, cliente.identificacion, cliente.numeroTelefono);
            console.log("Hiciste clic en el botón 'Más información'" + clienteId);
        });
    });

    let bandera = false;
                    

    const botonEliminar = document.querySelectorAll('.btn-danger');
    botonEliminar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const clienteId = event.currentTarget.dataset.clienteId;
            const cliente = clientes.find(cliente => cliente.id == clienteId);
            console.log(cliente);
            const data = {
                id: cliente.id,
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
                title: `¿Estás seguro de eliminar este cliente?`

            }).then(async(result) => {
                if (result.isConfirmed) {
                    console.log(bandera);
                     await clienteHavePrestamos(clienteId);
                     console.log(bandera);
                    
                    if( bandera == false){
                        try {
                            const response = await fetch(`https://proyecto-desarrollo-back-production.up.railway.app/api/clientes/${clienteId}`, {
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
                    else{
                        Swal.fire({
                            title: "Este cliente no se puede eliminar",
                            text: "El cliente esta en el historial de prestamos",
                            icon: "error",
                        });
                    }
                     
                     
                }
            });



            console.log("Hiciste clic en el botón 'Más información'" + clienteId);
        });
    });

    async function clienteHavePrestamos (id){
        const res = await fetch(urlPrestamos);
        const data = await res.json();
        data.forEach(prestamo => {
            if(prestamo.clienteId == id){
                bandera = true;
                return true;
            }
        });
        return false;

    }
})();

