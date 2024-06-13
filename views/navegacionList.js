(function (){

    const navAdmin = document.getElementById('nav-admin');
    const navSupervisor = document.getElementById('nav-supervisor');
    const navCliente = document.getElementById('nav-client');

    async function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                const container = document.getElementById('navegacionAdminSupervisorClientes');
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


    navSupervisor.addEventListener('click', async (event) => {
        event.preventDefault();
        loadContent('/views/listSupervisor/listSupervisor.html');

    });

    navAdmin.addEventListener('click', async (event) => {
        event.preventDefault();
        loadContent('/views/listadmin/listadmin.html');
    });

    navCliente.addEventListener('click', async (event) => {
        event.preventDefault();
        loadContent('/views/listclients/listclients.html');
    });

})();