(async function () {

    const links = {
        'adminValue': 'https://proyecto-desarrollo-back-production.up.railway.app/api/users',
        'supervisorValue': 'https://proyecto-desarrollo-back-production.up.railway.app/api/users',
        'clientValue': 'https://proyecto-desarrollo-back-production.up.railway.app/api/clientes',
        'bookValue': 'https://proyecto-desarrollo-back-production.up.railway.app/api/libros',
        'loanValue': 'https://proyecto-desarrollo-back-production.up.railway.app/api/prestamos',
    };

    for (const [id, url] of Object.entries(links)) {
        let navElement = document.getElementById(id);
        if (navElement) {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            
            navElement.textContent = data.length != null ? data.length : 0;
            
            if(id == 'adminValue') {
                navElement.textContent = data.filter(user => user.rol === "ADMINISTRADOR").length;
                console.log(data);
            }
            
            if(id == 'supervisorValue') {
                navElement.textContent = data.filter(user => user.rol === "SUPERVISOR").length;
            }

        } else {
            console.warn(`Elemento de navegación con id ${id} no encontrado.`);
        }
    }
})();

