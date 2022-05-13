
function getUsuarioSync(id){
  const startPoint = new Date().getTime();
  while (new Date().getTime() - startPoint <= 3000) {
    // esperando ..
  }

  return {
    id,
    nombre: `Usuario${id}`
  };

}

function getUsuario(id, callback){
  let usuario = {
    id,
    nombre: `Usuario${id}`
  }

  setTimeout(() => { callback(usuario)}, 3000);
}

module.exports = {
  getUsuarioSync,
  getUsuario
};
