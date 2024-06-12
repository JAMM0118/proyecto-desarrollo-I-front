document.getElementById('miFormulario').addEventListener('submit', obtenerValue);
document.addEventListener('DOMContentLoaded', mensajesPersonalizados);

const url = 'https://proyecto-desarrollo-back-production.up.railway.app';


async function obtenerValue(event) {
  event.preventDefault();

  let isTrue = true;
  datosName = document.getElementById('name');
  datosPassword = document.getElementById('con');
  datosTypeUser = document.getElementById('type-user');
  // errorTypeUser = document.getElementById('errorLista');
  
  // errorTypeUser.textContent = '';
  

  if (datosName.value.trim() === '') { isTrue = false; }
  if (datosPassword.value.trim() === '') { isTrue = false; }
  if (datosTypeUser.value.trim() === '') { isTrue = false; }

  console.log(datosName.value);
  console.log(datosPassword.value);
  console.log(datosTypeUser.value);
  const datos = {
    username: datosName.value,
    password: datosPassword.value,
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
    localStorage.setItem('username', datos.username);
    
    localStorage.setItem('homeElements','/views/home/homeElements/homeElements.html');

   
    //Guardo el tipo de usuario
    // Redirige al usuario al dashboard
    if (isTrue) {
      window.location.href = '/views/home/home.html';
  
    }
} catch (error) {
    console.error('Error:', error);
    alert('Error en la autenticación. Por favor, intente de nuevo.');
}

  

  // else{
  //   errorTypeUser.textContent = 'Por favor llene todos los campos';
  // }
}


function mensajesPersonalizados() {
  datosName = document.getElementById('name');
  datosPassword = document.getElementById('con');
  datosTypeUser = document.getElementById('type-user');


  datosName.addEventListener('input', function () {
    datosName.setCustomValidity('');
    datosName.checkValidity();
  });

  datosName.addEventListener('invalid', function () {
    if (datosName.value.trim() === '') {
      datosName.setCustomValidity('Por favor, ingrese su nombre.');
    } else {
      datosName.setCustomValidity('');
    }
  });

  datosPassword.addEventListener('input', function () {
    datosPassword.setCustomValidity('');
    datosPassword.checkValidity();
  });

  datosPassword.addEventListener('invalid', function () {
    if (datosPassword.value.trim() === '') {
      datosPassword.setCustomValidity('Por favor, ingrese su contraseña.');
    } else {
      datosPassword.setCustomValidity('');
    }
  });


  datosTypeUser.addEventListener('input', function () {
    datosTypeUser.setCustomValidity('');
    datosTypeUser.checkValidity();
  });

  datosTypeUser.addEventListener('invalid', function () {
    if (datosTypeUser.value === '') {
      datosTypeUser.setCustomValidity('Por favor, seleccione un tipo de usuario');
    } else {
      datosTypeUser.setCustomValidity('');
    }
  });
}

