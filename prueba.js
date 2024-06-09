document.getElementById('miFormulario').addEventListener('submit', obtenerValue);
document.addEventListener('DOMContentLoaded', mensajesPersonalizados);


function obtenerValue(event) {
  event.preventDefault();

  let isTrue = true;
  datosName = document.getElementById('name');
  datosPassword = document.getElementById('con');
  datosTypeUser = document.getElementById('type-user');
  // errorTypeUser = document.getElementById('errorLista');
  console.log("sirver");

  // errorTypeUser.textContent = '';

  if (datosName.value.trim() === '') { isTrue = false; }
  if (datosPassword.value.trim() === '') { isTrue = false; }
  if (datosTypeUser.value.trim() === '') { isTrue = false; }

  console.log(datosName.value);
  console.log(datosPassword.value);
  console.log(datosTypeUser.value);

  if (isTrue) {
    window.location.href = 'views/home.html';

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

