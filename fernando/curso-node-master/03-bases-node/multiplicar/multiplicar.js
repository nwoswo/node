const fs = require('fs');

const util = require('util');
const sleep = util.promisify(setTimeout)
// const writeFile = util.promisify(fs.writeFile);
const colors = require('colors');

//const {} as express = require('express'); -> externos
//const fs = require('./fs');   -> nosotros excribimos

// modulo.exports.

let listarTabla = (base, limite) => {
    console.log('+++++++++++++'.green);
    console.log(`+++++ Tabla de ${base} ++++++++`.green);
    console.log('+++++++++++++'.green);

    let data ='';
    for (let i = 1; i <= limite; i++) {
        data += `${ base } * ${ i } = ${ base * i }\n`;
       
    }
    console.log(data);
}

crearArchivo = async (base,limite) => {
    
    console.log(base);

    if( !Number(base) ){
       throw new Error(`La base no es un Numero ${base}`);
       
    }


    let data ='';
    for (let index = 0; index <= limite; index++) {
    
        data += ` ${base} * ${index} : ${base*index} \n`;
    
    }

        console.log('1');
        
            var  file =   '';
            await sleep(2000)
            fs.writeFile(`./tablas/tabla-${base}.txt`, data, err => {})
           
            return `tabla-${ base }.txt`;
              
            // }, 6000);
          
            // setTimeout( async () => {
            //return file;
        // }, 6000);
            
         
       
      
        
}

let crearArchivo2 = (base) => {

    return new Promise((resolve, reject) => {

        if( !Number(base) ){
            reject(`La base no es un Numero ${base}`);
            return;
        }
        let data = '';

        for (let i = 1; i <= 10; i++) {
            data += `${ base } * ${ i } = ${ base * i }\n`;
        }

        
        fs.writeFile(`tablas/tabla-${ base }.txt`, data, (err) => {
            setTimeout(() => {
                if (err)
                    reject(err)
                else
                    resolve(`tabla-${ base }.txt`);
                }, 2000);
        });
       
        

    });


}




// crearArchivo3 = async (base) => {
    
//     let data ='';
//     for (let index = 0; index <= 10; index++) {
    
//         data += ` ${base} * ${index} : ${base*index} \n`;
    
//     }
    
    
//     await writeFile(`tablas/tabla-${base}-al-${limite}.txt`, data);
    
 
// }


module.exports = 
    { 
        crearArchivo: crearArchivo,
        crearArchivo2: crearArchivo2,
        listarTabla: listarTabla
    }



   

