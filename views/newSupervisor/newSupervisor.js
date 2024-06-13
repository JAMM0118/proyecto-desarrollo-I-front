(function () {

    const urlNewSupervisor = 'https://proyecto-desarrollo-back-production.up.railway.app/auth/register/user';

    const guardarBtn = document.getElementById('guardarBtn');
    const token = localStorage.getItem('token');
    //evento de click al boton
    guardarBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        //datos del formulario
        const userName = document.getElementById('userNameSupervisor').value;
        const passwordUser = document.getElementById('password').value;

        if(userName === '' || passwordUser === '' ){
            Swal.fire({
                title: "Por favor llena todos los campos!",
                icon: "error",
            });
            return;
        }
        //json pra enviar
        const data = {
            username: userName,
            password: passwordUser,
        }

        console.log(data);
        try {
            const response = await fetch(urlNewSupervisor, {
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

            Swal.fire({
                title: "Enviado!",
                text: "Tu formulario ha sido enviado correctamente.",
                icon: "success",
            });



            limpiarCampos();
        } catch (error) {
            console.log(error);
        }

        function limpiarCampos() {
            document.getElementById('userNameSupervisor').value = '';
            document.getElementById('password').value = '';
        }
    })

   

})();