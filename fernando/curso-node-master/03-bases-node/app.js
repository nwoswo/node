// const multiplicar = require('./multiplicar/multiplicar');

const argv = require('./config/yargs').argv;
const colors = require('colors');


const  { listarTabla,crearArchivo,crearArchivo2 }  = require('./multiplicar/multiplicar');



let comando = argv._[0];

switch( comando ){

  case 'listar':
    listarTabla(argv.base,argv.limite);
  break;

  case 'crear':
    
    crearArchivo(argv.base,argv.limite).then((archivo) => {
      console.log(`${archivo.green}`);
      console.log(`${archivo.green}`);
    }).catch( err =>  console.log(err) );
  break;

  default:
    console.log('comando no reconocido');
  
}

// console.log(argv);




// console.log(process.argv);

// let argv = process.argv;
// let parametro = argv[2];

// let base = parametro.split('=')[1]
// console.log(base);
// crearArchivo2(base).then((archivo) => {
//   console.log(archivo);
// }).catch((err) => {
//   console.log(err);
// });



