const { getUsuario } = require('./usuarios/usuario');

console.log('Inicio de programa');

getUsuario(1, (usuario1)=>{
  console.log(usuario1);
})

getUsuario(2, (usuario1)=>{
  console.log(usuario1);
})

console.log('Hola Mundo');
