const { getUsuarioSync } = require('./usuarios/usuario');

console.log('Inicio de programa');

let usuario1 = getUsuarioSync(1);
console.log('Usuario1: ', usuario1);

let usuario2 = getUsuarioSync(2);
console.log('Usuario1: ', usuario2);

console.log('Hola Mundo !');



