(function() {
    // Función para cargar contenido en el elemento 'navegacion-page'
    async function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                const container = document.getElementById('navegacion-page');
                container.innerHTML = data;
                executeScripts(container);
            })
            .catch(error => console.error('Error al cargar el archivo:', error));
    }

    // Función para ejecutar scripts contenidos en el HTML cargado
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

    // Asignación de eventos a los elementos de navegación
    const navItems = {
        'nav-home': '/views/home/homeElements.html',
        'nav-newLoan': '/views/newLoan/newLoan.html',
        'nav-newSupervisor': '/views/newSupervisor/newSupervisor.html',
        'nav-newClients': '/views/newClients/newClients.html',
        'nav-newBook': '/views/newBook/newBook.html',
        'nav-listLoan': '/views/listLoan/listLoan.html',
        'nav-listBook': '/views/listBook/listBook.html',
        'nav-listAdmin': '/views/listAdmin/listAdmin.html',
        'nav-listSupervisor': '/views/listSupervisor/listSupervisor.html',
        'nav-listClients': '/views/listClients/listClients.html',
        'nav-loanPending': '/views/loanPending/loanPending.html',
        'nav-report': '/views/report/report.html',
    };

    // Cargar el contenido inicial desde localStorage
    const homeElements = localStorage.getItem('homeElements');
    if (homeElements) {
        loadContent(homeElements);
    } else {
        loadContent(navItems['nav-home']);
    }

    // Asignar eventos de clic a todos los elementos de navegación
    for (const [id, url] of Object.entries(navItems)) {
        const navElement = document.getElementById(id);
        if (navElement) {
            navElement.addEventListener('click', (event) => {
                event.preventDefault(); // Evitar comportamiento predeterminado
                loadContent(url);
            });
        } else {
            console.warn(`Elemento de navegación con id ${id} no encontrado.`);
        }
    }
})();
