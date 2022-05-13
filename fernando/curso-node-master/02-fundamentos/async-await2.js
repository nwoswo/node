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






let getSalario = async  (empleado) => {

  
    let salarioDB = salarios.find( salario => salario.id === empleado.id );

    if(!salarioDB){
        throw new Error(`No se encontro un salario para el usuario: ${empleado.nombre}`);
    }else{
        return { nombre: empleado.nombre, salario: salarioDB.salario };
    }
 

    
}


let getEmpleado = async (id) => {

   

    let empleadoDB = empleados.find( empleado => empleado.id === id );
    if(!empleadoDB){
        throw new Error(`No existe empleado con el id:  ${id}`);
    }else{
        return empleadoDB;
    }

    
}


let getInformacion = async (id) =>{

    let empleado = await getEmpleado(id);
    let rpta = await getSalario(empleado);

   return rpta

}

getInformacion(3).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

// getEmpleado(3).then((empleado) => {
//     // console.log(empleado);

//     return getSalario(empleado);
//     })
//     .then( resp => { console.log(resp); } )
//     .catch((err) => { console.log(err);}
// );
