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
        salario: 1000
    },
    {
        id: 2,
        salario: 1800
    }
];

let getSalario = (empleado,callback) => {
    let salarioDB = salarios.find( salario => salario.id === empleado.id );

    if(!salarioDB){
        callback(`No se encontro un salario para el usuario: ${empleado.nombre}`);
    }else{
        callback(null, { nombre: empleado.nombre, salario: salarioDB.salario });
    }
}


let getEmpleado = (id,callback) => {
    let empleadoDB = empleados.find( empleado => empleado.id === id );
    if(!empleadoDB){
        callback(`No existe ${id}`);
    }else{
        callback(null,empleadoDB);
    }
    
}
 

getEmpleado(2, (err,empleado)=> { 
    if(err){
        console.log(err);
    }else{

        getSalario(empleado, (err,salario) => {
            if(err){
                console.log(err);
            }else{
                console.log(salario);
            }
        } ) 
        
    }
    
} );





