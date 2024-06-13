
(async function () {

    const urlAdmin = 'https://proyecto-desarrollo-back-production.up.railway.app/api/users';

    const table = document.querySelector('.table-responsive')

    function template(user) {
        return `<div class="div-table-row">
                    <div class="div-table-cell" style="width: 50%">${user.id}</div>
                    <div class="div-table-cell" style="width: 50%">${user.username}</div>
                    
                </div>`
    }

    const cargarAdmin = async () => {
        console.log("cargando objetos");
        const array = [];
        // const res = await fetch('data.json');
        const res = await fetch(urlAdmin);
        const data = await res.json();
        console.log(data);

        data.forEach(user => {
            if (user.rol === "ADMINISTRADOR") {
                array.push(user);
            }
        });

        return array;
    }

    let admins = await cargarAdmin();


    console.log(admins);

    admins.forEach(admin => {
        table.innerHTML += template(admin);
    })
})();
