require('./config/config');
const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

const app = express()


//////////bodyParser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
///////


// app.use( require('./routes/usuario') );
// app.use( require('./routes/login') );
//change for ->  Configuracion Global de Rutas
app.use( require('./routes/index') );


//HABILITAR LA CARPETA PUBLIC
app.use( express.static( path.resolve(__dirname,'../public') ) );

// console.log('1');
// console.log(path.resolve(__dirname,'../public'));
// console.log('2');

mongoose.connect(process.env.urlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},  (err) => {
    if(err) throw err;
    console.log('Base de datos Online');
});








 
app.listen( process.env.PORT , () => {
    console.log('Escuchando al servidor ',process.env.PORT);
} )