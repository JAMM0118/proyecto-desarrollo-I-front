const url = 'https://proyecto-desarrollo-back-production.up.railway.app/api/users/1';

const table = document.querySelector('.table-responsive')
   

function template(userAdmin){
    return ` <div class="div-table" style="margin:0 !important;">
                    <div class="div-table-row div-table-row-list" style="background-color:#DFF0D8; font-weight:bold;">
                        <div class="div-table-cell" style="width: 6%;"># ${userAdmin.id}</div>
                        <div class="div-table-cell" style="width: 15%;">${userAdmin.username}</div>
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
    
    array.push(data);
    

    return array;
}

let admins = await cargarAdmin();

localStorage.setItem('numeroAdmins', admins.length);

console.log(admins);

admins.forEach(admin => {
    table.innerHTML += template(admin);
})