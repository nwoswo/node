// setTimeout(() => {
//    console.log('Hola Mundo'); 
// }, 3000);


let getUsuaroById = (id, callback) => {
    let usuario = {
        nombre: 'Eder',
        id: id,
    }

    if(id ==20) {
        callback(`Error No existe ${id}`);
    }else{
        callback(null,usuario);
    }
    
} 



getUsuaroById(20, (err,usuario)=> { 

    if(err){
        return console.log(err);
    }
    console.log('Usuario BD:',usuario); 
} );