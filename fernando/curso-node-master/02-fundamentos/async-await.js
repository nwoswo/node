

let getNombreAsync = async() => {

    // throw new Error('No existe un nombre ');
    return 'Ruben';
};

let getNombre = () => {
    return new Promise( (resolve,reject) => {
        setTimeout(() => {
            resolve('Ruben')
        }, 3000);
    } ) 
}

let saludo = async () => {
    let nombre = await getNombre();
    return `Hola Nombre ${nombre}`;
}

saludo().then(mensaje => {
    console.log(mensaje);
}).catch(err => {
    console.log(err);
});

// getNombre().then( nombre  => {
//     console.log(nombre);
// }).catch( err => {
//     console.log(err);
// })
