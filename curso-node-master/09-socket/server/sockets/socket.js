const { io } = require('../server');



const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {


    client.on('nextTicket',(callback)=>{
        console.log('nextTicket');
        callback(ticketControl.siguiente());
        //client.emit('nextTicket')
    })

    client.emit('estadoActual',
            {
                actual: ticketControl.getULtimoTicket(),
                ultimos4: ticketControl.getULtimos4()
            }
         
        //client.emit('nextTicket')
    )

    client.on('atenderTicket', (data, callback) => {

        if(!data.escritorio) {
            return callback({
                err: true,
                mensaje : 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar / notificar cambios en los ULTIMOS 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getULtimos4()
        })
        

    })


    // console.log('Usuario conectado');

    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });



    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    // // Escuchar el cliente
    // client.on('enviarMensaje', (data, callback) => {

    //     console.log(data);

    //     client.broadcast.emit('enviarMensaje', data);


    //     // if (mensaje.usuario) {
    //     //     callback({
    //     //         resp: 'TODO SALIO BIEN!'
    //     //     });

    //     // } else {
    //     //     callback({
    //     //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     //     });
    //     // }



    // });

});