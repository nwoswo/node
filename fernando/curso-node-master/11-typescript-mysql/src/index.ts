import Server from "./server/server";
import  router  from "./router/router";
import MySQL from "./mysql/mysql";


console.log('Codigo TypesScript');


const server = Server.init(3000);
server.app.use(router);

// const mysql = new MySQL;
MySQL.instance;


server.start( () => {

    console.log('Escuchando el puerto ');
})