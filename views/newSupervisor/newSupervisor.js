(function () {

    const urlNewSupervisor = 'https://proyecto-desarrollo-back-production.up.railway.app/auth/register/user';
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
        loadContent('/views/newSupervisor/newSupervisor.html');

    });
    const guardarBtn = document.getElementById('guardarBtn');
    const token = localStorage.getItem('token');
    //evento de click al boton
    guardarBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        //datos del formulario
        const userName = document.getElementById('userNameSupervisor').value;
        const passwordUser = document.getElementById('password').value;

        if(userName === '' || passwordUser === '' ){
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
            username: userName,
            password: passwordUser,
        }

        console.log(data);
        try {
            const response = await fetch(urlNewSupervisor, {
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

        function limpiarCampos() {
            document.getElementById('userNameSupervisor').value = '';
            document.getElementById('password').value = '';
        }
    })

   

})();