let empleados = [
    {
        id: 1,
        nombre: 'Eder'
    },
    {
        id: 2,
        nombre: 'Ruben'
    },
    {
        id: 3,
        nombre: 'Fernanda'
    },
];


let salarios = [
    {
        id: 1,
        salario: 4800
    },
    {
        id: 2,
        salario: 1800
    }
];



let getSalario = (empleado) => {

    return new Promise( (resolve,reject) => {
        let salarioDB = salarios.find( salario => salario.id === empleado.id );

        if(!salarioDB){
            reject(`No se encontro un salario para el usuario: ${empleado.nombre}`);
        }else{
            resolve({ nombre: empleado.nombre, salario: salarioDB.salario });
        }
    } )

    
}


let getEmpleado = (id) => {

    return new Promise( (resolve,reject) => {

        let empleadoDB = empleados.find( empleado => empleado.id === id );
        if(!empleadoDB){
            reject(`No existe empleado con el id:  ${id}`);
        }else{
            resolve(empleadoDB);


        }

    } );
   
    
}



getEmpleado(3).then((empleado) => {
    // console.log(empleado);

    return getSalario(empleado);
    })
    .then( resp => { console.log(resp); } )
    .catch((err) => { console.log(err);}
);


// getEmpleado(1).then((empleado) => {
//     // console.log(empleado);

//     getSalario(empleado)
//         .then( empleado =>  console.log(empleado)  ), 
//         err =>  console.log(err); 
        
    
// }).catch((err) => {
//     console.log(err);
// });