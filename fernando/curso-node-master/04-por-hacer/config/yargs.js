
const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {
    demand: true,
    alias: 'c',
    desc: 'Descripcion de la tarea por hacer'
};



const argv = require('yargs')
    .command('crear','Crear un elemento por hacer', {
        descripcion
    })
    .command('listar','Listar las tareas', {
        descripcion: {
            demand: false,
            alias: 'l',
            desc: 'Listar las tareas'
        }
    })
    .command('borrar','Borra una tarea', {
        descripcion
    })

    .command('actualizar','Actualizar el estado completado de una tarea', {
        descripcion,
        completado
    })
    .help()
    .argv;
    

    module.exports = {
        argv
    }