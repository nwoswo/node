

const http = require('http');

http.createServer( (req,res) => {

    res.writeHead(200, {'Content-Type':'application/json'} );

    let salida ={
        nombre: 'Fernando',
        edad: 32,
        url: req.url
    }

    res.write(JSON.stringify(salida));

    res.end();

    // res.write('Hola Mundo');
    // res.end();

})
.listen(8080);

console.log('Start Server 8080');