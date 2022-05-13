const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);



const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//IO =  esta es la comunicacion del backend



let io = socketIO(server);

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('EnviarMensaje',{
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta Aplicacion'
    });

    client.on('disconnect', (server) => {
        console.log('Usuario desconectado');
    })

    //Escuchar al Cliente

    client.on('EnviarMensaje', (mensaje, callback) => {

        
        if(mensaje.usuario){
            callback({
                resp: 'TODO SALIO BIEN!!'
            });
        }else{
            callback({
                resp: 'TODO SALIO MAL '
            })
        }
        console.log('Respuesta Server:',(mensaje);
        callback();
    });
    
});





server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});

