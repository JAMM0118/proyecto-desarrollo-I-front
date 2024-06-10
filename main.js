
const url = 'https://proyecto-desarrollo-back-production.up.railway.app';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Captura de los datos del formulario
        const nombres = form.querySelector('input[type="text"]').value;
        const password = form.querySelector('input[type="password"]').value;
        const userType = form.querySelector('select').value;

        if (!nombres || !password || !userType) {
            alert('Por favor, complete todos los campos.');
            return; 
        }

        // Creación del objeto de datos
        const datos = {
            username: nombres,
            password: password
        };

        console.log(datos);


        try {
            // Petición POST al backend
            const response = await fetch(`${url}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            if (!response.ok) {
                throw new Error('Error en la autenticación');
            }

            const data = await response.json();

            // Asumiendo que el JWT está en data.token
            const token = data.token;
            
            // Guarda el JWT en localStorage
            localStorage.setItem('token', token);
            //Guardo el  username
            console.log(datos.username);
            localStorage.setItem('username', datos.username);
            console.log(localStorage.getItem('username'));

            console.log(datos);

            //Guardo el tipo de usuario
            localStorage.setItem('userType', userType);

            // Redirige al usuario al dashboard
            window.location.href = '/views/home.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la autenticación. Por favor, intente de nuevo.');
        }
    });
});

function peticionPost() {
    const url = 'http://localhost:8080/api/users';

    const datos = {
        "id": 1,
        "username": "vic.hernandez",
        "firstname": "jose",
        "lastname": "ortiz",
        "country": "Arg"
    }

    // Obtener el JWT desde el almacenamiento local (localStorage)
    const token = localStorage.getItem('token');

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Agregar el JWT en el encabezado Authorization
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// console.log(localStorage.getItem('token'));

// console.log("peticion post para modificar al usuario haciendo uso del token");

// peticionPost();