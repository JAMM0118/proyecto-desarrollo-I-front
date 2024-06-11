// Agregar libros

const url = 'https://proyecto-desarrollo-back-production.up.railway.app/api/clientes';

// Guardo el boton y el token
const guardarBtn = document.getElementById('guardarBtn');
const token = localStorage.getItem('token'); 
//evento de click al boton
guardarBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    
    //datos del formulario
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const identificacion = document.getElementById('identificacion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('correo').value;
    //json pra enviar
    const data = {
        identificacion: identificacion,
        nombreCompleto: nombreCompleto,
        numeroTelefono: telefono,
        correoElectronico: email,
    }

    console.log(data);
    try {
        const response = await fetch(url, {
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
function limpiarCampos(){
    document.getElementById('nombreCompleto').value = '';
    document.getElementById('identificacion').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('correo').value = '';
}