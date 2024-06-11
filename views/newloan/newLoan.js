(function () {
    // Agregar prestamos
    const urlNewLoan = 'https://proyecto-desarrollo-back-production.up.railway.app/api/prestamos';
    const urlCliente = 'https://proyecto-desarrollo-back-production.up.railway.app/api/clientes';

    const cargarClientes = async () => {
        console.log("cargando objetos");
        const array = [];
        // const res = await fetch('data.json');
        const res = await fetch(urlCliente);
        const data = await res.json();
        data.forEach(cliente => {
            array.push(cliente);
        });
        return array;
    }



    // Guardo el boton y el token
    const guardarBtn = document.getElementById('guardarBtn');
    const token = localStorage.getItem('token');
    //evento de click al boton
    guardarBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        //datos del formulario
        let clientes = await cargarClientes();
        var identificacionCliente = document.getElementById('identificacionCliente').value;
        const idLibro = document.getElementById('idLibro').value;

        for (let i = 0; i < clientes.length; i++) {
            if (identificacionCliente == clientes[i].identificacion) {
                identificacionCliente = clientes[i].id;
                break;
            }
        }
        //json pra enviar
        const data = {
            libroPrestadoId: idLibro,
            clienteId: identificacionCliente,
        }

        console.log(data);
        try {
            const response = await fetch(urlNewLoan, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al agregar el cliente');
            }

            const responseData = await response.json();
            console.log(responseData);
            limpiarCampos();
        } catch (error) {
            console.log(error);
        }
    })


    // Limpiar campos del formulario
    function limpiarCampos() {
        document.getElementById('identificacionCliente').value = '';
        document.getElementById('idLibro').value = '';
    }
})();

