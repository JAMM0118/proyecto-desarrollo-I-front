(async function () {

    const urlPrestamos = 'https://proyecto-desarrollo-back-production.up.railway.app/api/prestamos';
    const urlLibros = 'https://proyecto-desarrollo-back-production.up.railway.app/api/libros';

    const table = document.getElementById('tablaPrestamos')
    const table2 = document.getElementById('tablaLibros')

    function template(genero, cantidadLibros, porcentaje) {
        return `<tr>
                <td>${genero}</td>
                <td>${cantidadLibros}</td>
                <td>${porcentaje}%</td>
                </tr>`
    }
    

    

    const cantidadPrestamos = document.getElementById('cantidadPrestamosTotales');
    const cantidadLibros = document.getElementById('tablaLibrosTotal');
    

    const cargarLibros = async () => {
        console.log("cargando objetos");
        const array = [];
        // const res = await fetch('data.json');
        const res = await fetch(urlLibros);
        const data = await res.json();
        console.log(data);

        data.forEach(libro => {
                array.push(libro);
            
        });
        cantidadLibros.textContent = array.length;
        return array;
    }

    const cargarPretamos = async () => {
        console.log("cargando objetos");
        const array = [];
        // const res = await fetch('data.json');
        const res = await fetch(urlPrestamos);
        const data = await res.json();
        console.log(data);

        data.forEach(prestamo => {
                array.push(prestamo);
            
        });

        cantidadPrestamos.textContent = array.length;
        return array;
    }

    let libros = await cargarLibros();
    let prestamos = await cargarPretamos();

    let cantidadLibrosPorGenero = 0;
    let porcentajeLibroGenero = 0;
    let listaGeneros = [];

    for(let i = 0; i < libros.length; i++){
        if(listaGeneros.indexOf(libros[i].genero) === -1){
            listaGeneros.push(libros[i].genero);
        }
    }
    for(let i = 0; i < listaGeneros.length; i++){
        cantidadLibrosPorGenero = 0;
        for(let j = 0; j < libros.length; j++){
            if(listaGeneros[i] == libros[j].genero) {
                cantidadLibrosPorGenero++;
            }
        }
        porcentajeLibroGenero = (cantidadLibrosPorGenero * 100) / libros.length;
        
        table2.innerHTML += template(listaGeneros[i], cantidadLibrosPorGenero, porcentajeLibroGenero.toFixed(2));
    }
    
    
    let porcentajeLibroGeneroPrestado = 0;
    let cantidadPrestamosLibro = 0;
    let generoLibro = '';

    console.log(libros);
    console.log(prestamos);
    
    for(let i = 0; i < listaGeneros.length; i++){
        cantidadPrestamosLibro = 0;
        generoLibro = listaGeneros[i];
        for(let j = 0; j < libros.length; j++){
            if(libros[j].genero === generoLibro){
                for(let k = 0; k < prestamos.length; k++){
                    if(prestamos[k].libroPrestadoId === libros[j].id){
                        cantidadPrestamosLibro++;
                    }
                }
            }
        }
        porcentajeLibroGeneroPrestado = (cantidadPrestamosLibro * 100) / prestamos.length;
        table.innerHTML += template(generoLibro, cantidadPrestamosLibro, porcentajeLibroGeneroPrestado.toFixed(2));
    }


})();