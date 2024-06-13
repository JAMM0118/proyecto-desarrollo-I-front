
(async function () {

    const urlSupervisor = 'https://proyecto-desarrollo-back-production.up.railway.app/api/users';

    const table = document.querySelector('.table-responsive')

    function template(user) {
        return `<div class="div-table" style="margin:0 !important;">
                        <div class="div-table-row div-table-row-list">
                            <div class="div-table-cell" style="width: 6%;">${user.id}</div>
                            <div class="div-table-cell" style="width: 15%;">${user.username}</div>
                            <div class="div-table-cell" style="width: 9%;">
                                <button data-supervisor-id="${user.id}" class="btn btn-success"><i class="zmdi zmdi-refresh"></i></button>
                            </div>
                            <div class="div-table-cell" style="width: 9%;">
                                <button data-supervisor-id="${user.id}" class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>
                            </div>
                        </div>
                    </div>`
    }

    const cargarSupervisor = async () => {
        console.log("cargando objetos");
        const array = [];
        // const res = await fetch('data.json');
        const res = await fetch(urlSupervisor);
        const data = await res.json();
        console.log(data);

        data.forEach(user => {
            if (user.rol === "SUPERVISOR") {
                array.push(user);
            }
        });

        return array;
    }

    let supervisores = await cargarSupervisor();


    console.log(supervisores);

    supervisores.forEach(supervisor => {
        table.innerHTML += template(supervisor);
    });

    const token = localStorage.getItem('token');


    function reload() {
        window.location = 'index.html';
    };

    const botonActualizar = document.querySelectorAll('.btn-success');
    botonActualizar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const supervisorId = event.currentTarget.dataset.supervisorId;
            const supervisor = supervisores.find(supervisor => supervisor.id == supervisorId);
            console.log(supervisor);

            function showFormWithDefaults(newUserNameValue) {
                if (("SUPERVISOR" == localStorage.getItem('role')) && (supervisor.username != localStorage.getItem('username'))) {
                    Swal.fire({
                        title: "No puedes modificar un username diferente al tuyo",
                        icon: "error",
                    });
                    return;
                }
                else {
                    Swal.fire({
                        title: "Actualizar username del supervisor",
                        html:
                            '<form id="form-swal" style="text-align: left;">' +
                            '<label for="newUserName" class="swal2-label">Username:</label>' +
                            '<input type="text" id="newUserName" name="newUserName" class="swal2-input">' +
                            '</form>',
                        showCancelButton: true,
                        cancelButtonText: "Cancelar",
                        confirmButtonText: "Enviar",
                        confirmButtonColor: "#3598D9", // Color de fondo del botón confirmar
                        cancelButtonColor: "#dc3545", // Color de fondo del botón cancelar
                        focusConfirm: false, // Evita que el botón confirmar obtenga el foco
                        preConfirm: () => {
                            // Validación opcional o procesamiento antes de enviar
                            const newUserName = document.getElementById('newUserName').value;
                            console.log("Nombre:", newUserName);
                            if (!newUserName) {
                                Swal.showValidationMessage('Por favor, completa todos los campos');
                                return false;
                            }
                            return { newUserName: newUserName };
                        }
                    }).then(async (result) => {
                        if (result.isConfirmed) {


                            //json pra enviar
                            const data = {
                                id: supervisor.id,
                                username: result.value.newUserName,
                            }

                            console.log(data);


                            try {
                                const response = await fetch(urlSupervisor, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify(data)
                                });

                                if (!response.ok) {
                                    throw new Error('Error al modificar el supervisor');
                                };

                                const responseData = await response.json();
                                console.log(responseData);


                                Swal.fire({
                                    title: "Datos enviados correctamente",
                                    text: "Ahora te redirigiremos a la página de login para que se hagan efectivos los cambios",
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


                }

                // Asignar valores predeterminados después de crear el formulario
                document.getElementById('newUserName').value = newUserNameValue;

            }

            // Llamar a la función con valores predeterminados
            showFormWithDefaults(supervisor.username);
            console.log("Hiciste clic en el botón 'Más información'" + supervisorId);
        });
    });



    const botonEliminar = document.querySelectorAll('.btn-danger');
    botonEliminar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const supervisorId = event.currentTarget.dataset.supervisorId;
            const supervisor = supervisores.find(supervisor => supervisor.id == supervisorId);
            console.log(supervisor);
            const data = {
                id: supervisor.id,
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
                title: `¿Estás seguro de eliminar este supervisor?`

            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await fetch(`${urlSupervisor}/${supervisorId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(data)
                        });

                        if (!response.ok) {
                            throw new Error('Error al eliminar el supervisor');
                        };
                        reload();
                    } catch (error) {
                        console.log(error);
                    }
                }
            });



            console.log("Hiciste clic en el botón 'Más información'" + supervisorId);
        });
    });
})();
