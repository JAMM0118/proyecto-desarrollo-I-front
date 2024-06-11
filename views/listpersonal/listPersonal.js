const url = 'https://proyecto-desarrollo-back-production.up.railway.app/api/users';

const table = document.querySelector('.table-responsive')
   

function template(user){
    return `<div class="div-table" style="margin:0 !important;">
                        <div class="div-table-row div-table-row-list">
                            <div class="div-table-cell" style="width: 6%;"># ${user.id}</div>
                            <div class="div-table-cell" style="width: 15%;">${user.username}</div>
                            <div class="div-table-cell" style="width: 9%;">
                                <button class="btn btn-success"><i class="zmdi zmdi-refresh"></i></button>
                            </div>
                            <div class="div-table-cell" style="width: 9%;">
                                <button class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>
                            </div>
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
    
    data.forEach(user => {
        array.push(user);
    });

    return array;
}

let admins = await cargarAdmin();


console.log(admins);

admins.forEach(admin => {
    table.innerHTML += template(admin);
})