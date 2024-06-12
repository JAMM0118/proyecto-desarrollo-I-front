(function () {

    const navLoan = document.getElementById('nav-loans');
    const navLoanPending = document.getElementById('nav-loansPending');

    async function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                const container = document.getElementById('navegacionLoanAndLoanPending');
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


    navLoan.addEventListener('click', async (event) => {
        event.preventDefault();
        loadContent('/views/listLoan/listLoan.html');

    });

    navLoanPending.addEventListener('click', async (event) => {
        event.preventDefault();
        loadContent('/views/loanpending/loanpending.html');
    });

})();