
var socket = io();


var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necsario');
} 

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio '+escritorio);

$('button').click(function() {

    socket.emit('atenderTicket', {escritorio: escritorio}, function(rpta) {

        if (rpta === 'No hay Tickets') {
            alert(rpta);
            return;
            
        }

        $('small').text('Ticket '+ rpta.numero)
    } )
    $('small')
});


