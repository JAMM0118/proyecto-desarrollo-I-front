
(async function () {
    const urlClient = 'https://proyecto-desarrollo-back-production.up.railway.app/api/clientes';

    const table = document.querySelector('.table-responsive')

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

    function template(cliente) {
        return `<div class="div-table" style="margin:0 !important;">
                            <div class="div-table-row div-table-row-list">
                            <div class="div-table-cell" style="width: 6%;"># ${cliente.id}</div>
                            <div class="div-table-cell" style="width: 15%;">${cliente.identificacion}</div>
                            <div class="div-table-cell" style="width: 15%;">${cliente.nombreCompleto}</div>
                            <div class="div-table-cell" style="width: 12%;">${cliente.numeroTelefono}</div>
                            <div class="div-table-cell" style="width: 12%;">${cliente.correoElectronico}</div>
                                <div class="div-table-cell" style="width: 9%;">
                                    <button class="btn btn-success"><i class="zmdi zmdi-refresh"></i></button>
                                </div>
                                <div class="div-table-cell" style="width: 9%;">
                                    <button class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>
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
})();

