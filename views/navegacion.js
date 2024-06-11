let homeELements = localStorage.getItem('homeElements');
fetch(homeELements)
            .then(response => response.text())
            .then(data => {
                document.getElementById('navegacion-page').innerHTML = data;
            })
            .catch(error => console.error('Error al cargar el archivo:', error));


document.getElementById('nav-report').addEventListener("click", function() {
    fetch('/views/report/report.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navegacion-page').innerHTML = data;
            })
            .catch(error => console.error('Error al cargar el archivo:', error));
 });
    

document.getElementById('nav-home').addEventListener("click", function() {
    fetch('/views//home/homeElements.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navegacion-page').innerHTML = data;
            })
            .catch(error => console.error('Error al cargar el archivo:', error));
});


document.getElementById('nav-personal').addEventListener("click", function() {
    fetch('/views/personal/personal.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navegacion-page').innerHTML = data;
            })
            .catch(error => console.error('Error al cargar el archivo:', error));
});


document.getElementById('nav-clients').addEventListener("click", function() {
    fetch('/views/clients/clients.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navegacion-page').innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
});

// document.getElementById('nav-clientes').addEventListener("click", function() {
//     window.parent.location.href = "/views/home.html";

//     fetch('/views/clients/clients.html')
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('navegacion-page').innerHTML = data;
//     })
//     .catch(error => console.error('Error al cargar el archivo:', error));
// });

// document.getElementById('nav-supervisores').addEventListener("click", function() {
//     window.parent.location.href = "/views/home.html";

//     fetch('/views/personal/personal.html')
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('navegacion-page').innerHTML = data;
//     })
//     .catch(error => console.error('Error al cargar el archivo:', error));
// });


document.getElementById('nav-book').addEventListener("click", function() {
    fetch('/views/book/book.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('navegacion-page');
        container.innerHTML = data;

        const scripts = container.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.type = scripts[i].type ? scripts[i].type : 'text/javascript';
            if (scripts[i].src) {
                script.src = scripts[i].src;
                document.head.appendChild(script);
            } else {
                script.text = scripts[i].innerHTML;
                document.body.appendChild(script);
            }
        }
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
});


document.getElementById('nav-listBook').addEventListener("click", function() {
    fetch('/views/listbook/listbook.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('navegacion-page');
        container.innerHTML = data;

        // Extraer y ejecutar los scripts
        const scripts = container.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.type = scripts[i].type ? scripts[i].type : 'text/javascript';
            if (scripts[i].src) {
                script.src = scripts[i].src;
                document.head.appendChild(script);
            } else {
                script.text = scripts[i].innerHTML;
                document.body.appendChild(script);
            }
        }
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
});



document.getElementById('nav-listAdmin').addEventListener("click", function() {
    fetch('/views/listadmin/listadmin.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('navegacion-page');
        container.innerHTML = data;

        const scripts = container.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.type = scripts[i].type ? scripts[i].type : 'text/javascript';
            if (scripts[i].src) {
                script.src = scripts[i].src;
                document.head.appendChild(script);
            } else {
                script.text = scripts[i].innerHTML;
                document.body.appendChild(script);
            }
        }
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
});


document.getElementById('nav-listPersonal').addEventListener("click", function() {
    fetch('/views/listpersonal/listpersonal.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('navegacion-page');
        container.innerHTML = data;

        const scripts = container.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.type = scripts[i].type ? scripts[i].type : 'text/javascript';
            if (scripts[i].src) {
                script.src = scripts[i].src;
                document.head.appendChild(script);
            } else {
                script.text = scripts[i].innerHTML;
                document.body.appendChild(script);
            }
        }
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
});


document.getElementById('nav-listClients').addEventListener("click", function() {
    fetch('/views/listclients/listclients.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('navegacion-page');
        container.innerHTML = data;

        const scripts = container.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.type = scripts[i].type ? scripts[i].type : 'text/javascript';
            if (scripts[i].src) {
                script.src = scripts[i].src;
                document.head.appendChild(script);
            } else {
                script.text = scripts[i].innerHTML;
                document.body.appendChild(script);
            }
        }
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
});



document.getElementById('nav-newloan').addEventListener("click", function() {
    fetch('/views/newloan/newloan.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('navegacion-page');
        container.innerHTML = data;

        const scripts = container.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.type = scripts[i].type ? scripts[i].type : 'text/javascript';
            if (scripts[i].src) {
                script.src = scripts[i].src;
                document.head.appendChild(script);
            } else {
                script.text = scripts[i].innerHTML;
                document.body.appendChild(script);
            }
        }
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
});

document.getElementById('nav-loan').addEventListener("click", function() {
    fetch('/views/loan/loan.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('navegacion-page');
        container.innerHTML = data;

        const scripts = container.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.type = scripts[i].type ? scripts[i].type : 'text/javascript';
            if (scripts[i].src) {
                script.src = scripts[i].src;
                document.head.appendChild(script);
            } else {
                script.text = scripts[i].innerHTML;
                document.body.appendChild(script);
            }
        }
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
});

document.getElementById('nav-loanPending').addEventListener("click", function() {
    fetch('/views/loanpending/loanpending.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('navegacion-page');
        container.innerHTML = data;

        const scripts = container.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.type = scripts[i].type ? scripts[i].type : 'text/javascript';
            if (scripts[i].src) {
                script.src = scripts[i].src;
                document.head.appendChild(script);
            } else {
                script.text = scripts[i].innerHTML;
                document.body.appendChild(script);
            }
        }
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
});


