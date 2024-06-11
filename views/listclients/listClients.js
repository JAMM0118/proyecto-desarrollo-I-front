const url = 'https://proyecto-desarrollo-back-production.up.railway.app/api/clientes';

const table = document.querySelector('.table-responsive')
   

function template(cliente){
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

const cargarClientes = async() => {
    console.log("cargando objetos");
    const array = [];
    // const res = await fetch('data.json');
    const res = await fetch(url);
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