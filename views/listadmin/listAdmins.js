const url = 'https://proyecto-desarrollo-back-production.up.railway.app/api/users';

const table = document.querySelector('.table-responsive')
   

function template(userAdmin){
    return ` <div class="div-table-row">
                    <div class="div-table-cell"># ${userAdmin.id}</div>
                    <div class="div-table-cell">${userAdmin.username}</div>
                    <div class="div-table-cell">
                        <button type="submit" class="btn btn-info tooltips-general" data-toggle="tooltip" data-placement="top" title="Pulse para cambiar contraseña"><i class="zmdi zmdi-swap"></i></button>
                    </div>
                    <div class="div-table-cell">
                        <button class="btn btn-success"><i class="zmdi zmdi-refresh"></i></button>
                    </div>
                    <div class="div-table-cell">
                        <button class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>
                    </div>
                </div>`
}

const cargarAdmin = async() => {
    console.log("cargando objetos");
    const array = [];
    // const res = await fetch('data.json');
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    
    array.push(data);
    

    return array;
}

let admins = await cargarAdmin();


console.log(admins);

admins.forEach(admin => {
    table.innerHTML += template(admin);
})