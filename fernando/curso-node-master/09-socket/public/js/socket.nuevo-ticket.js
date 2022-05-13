// Comando para establecer la conexion


var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor ')

} )


socket.on('disconnect', function() {
    console.log('Desconectado del servidor ')

} )


socket.on('estadoActual', function(data) {
    $ ('#lblNuevoTicket').text(data.actual);

} )

// $('button').on('click', function(){

// })

$('button').click(function() {
    console.log('Click');

    socket.emit('nextTicket',function(ticket) { 
        $ ('#lblNuevoTicket').text(ticket);
        console.log(ticket);
    })

})



