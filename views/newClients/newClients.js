(function () {
    
    const urlNewClient = 'https://proyecto-desarrollo-back-production.up.railway.app/api/clientes';
    const navCliente = document.getElementById('nav-clientes');
    const navSupervisor = document.getElementById('nav-supervisores');

    async function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                const container = document.getElementById('navegacion-supervisorCliente');
                container.innerHTML = data;
                executeScripts(container);
            })
            .catch(error => console.error('Error al cargar el archivo:', error));
    }

    function executeScripts(container) {
        const scripts = container.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.type = scripts[i].type ? scripts[i].type : 'text/javascript';
            if (scripts[i].src) {
                script.src = scripts[i].src;
                script.onload = () => console.log(`Script ${script.src} cargado y ejecutado`);
                document.head.appendChild(script);
            } else {
                script.text = scripts[i].innerHTML;
                document.body.appendChild(script);
                console.log('Script inline ejecutado');
            }
        }
    }


    navCliente.addEventListener('click', async (event) => {
        event.preventDefault();
        loadContent('/views/newClients/newClients.html');

    });
    
    navSupervisor.addEventListener('click', async (event) => {
        event.preventDefault();
        if(localStorage.getItem('role') === 'ADMINISTRADOR'){
            loadContent('/views/newSupervisor/newSupervisor.html');
        }
        else{
            swal({
                title: `Lo sentimos supervisor ${localStorage.getItem('username')}`,
                closeOnConfirm: false,
                animation: "slide-from-top",
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#3598D9",
                type: 'info',
                text: 'No tienes permisos para acceder a esta seccion'
            });
        }
    });


    // Guardo el boton y el token
    const guardarBtn = document.getElementById('guardarBtn');
    const token = localStorage.getItem('token');
    //evento de click al boton
    guardarBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        //datos del formulario
        const nombreCompleto = document.getElementById('nombreCompleto').value;
        const identificacion = document.getElementById('identificacion').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('correo').value;

        if(nombreCompleto === '' || identificacion === '' || telefono === '' || email === ''){
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
            identificacion: identificacion,
            nombreCompleto: nombreCompleto,
            numeroTelefono: telefono,
            correoElectronico: email,
        }

        console.log(data);
        try {
            const response = await fetch(urlNewClient, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al agregar el cliente');
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
        document.getElementById('nombreCompleto').value = '';
        document.getElementById('identificacion').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('correo').value = '';
    }
})();
