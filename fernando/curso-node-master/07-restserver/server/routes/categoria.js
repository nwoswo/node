const express = require('express');

const { verificaToken,verificaAdmin_Rol }   = require('../middlewares/aautenticacion');
const CategoriaSchema =  require('../models/categoria');
let app = express();


//============
//  Mostrar todas las categorias
//============
app.get('/categoria',  [ verificaToken],(req,res) => {

    CategoriaSchema.find({})
    .sort('descripcion')
    .populate('usuario','nombre email')
    .exec((err,categoriaDB)   => {
        return bodygneral(res, err,categoriaDB);
    } );

});


//============
//  Mostar categoria por Id
//============
app.get('/categoria/:id', [ verificaToken],(req,res) => {

    let id = req.params.id;

    CategoriaSchema.findById(id, (err,categoriaDB) => {

        return bodygneral(res, err,categoriaDB);

    } );

});


//============
//  Crear Nueva categoria
//============
app.post('/categoria',  [ verificaToken], (req,res) => {
    // regresa la  nueva categoria
    // req.usuario._id

    let body = req.body;

    let categoriaSchema =  new  CategoriaSchema({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoriaSchema.save(  (err,categoriaDB) => {

        return bodygneral(res, err,categoriaDB);


    })

});


//============
//  Actualizar la descripcion de la categoria
//============
app.put('/categoria/:id',  [ verificaToken],(req,res) => {


    console.log('put');

    let id= req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    CategoriaSchema.findByIdAndUpdate(id,descCategoria, (err, categoriaDB) => {

        
        return bodygneral(res,err,categoriaDB);


    } ) 
    
});



//============
//  Borrar la categoria / solo adminstrador puede borrar de manera fisica
//============
app.delete('/categoria/:id', [ verificaToken,verificaAdmin_Rol] ,(req,res) => {
    //findbyIdAndRemove

    let id = req.params.id;

    CategoriaSchema.findByIdAndRemove(id, (err,categoriaDB) => {

        return bodygneral(res,err,categoriaDB);


    } );


});


function bodygneral(res,err,categoriaDB){

    if (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
    if (!categoriaDB) {
        return res.status(400).json({
            ok: false,
            err: 'No Existe'
        });
    }

    res.json({
        ok: true,
        categoria: categoriaDB
    })



    return res;
}





module.exports = app;