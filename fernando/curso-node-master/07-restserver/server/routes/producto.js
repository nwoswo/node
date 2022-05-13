const express = require('express');

const { verificaToken } = require('../middlewares/aautenticacion');
let app = express();
let ProductoSchema = require('../models/producto');



//============
//  Obtener Productos
//============

app.get( '/productos', verificaToken,(req,res) => {
    //trae todos los productos
    // populrate: usuario categoria
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    ProductoSchema.find(
        {disponible:true}
    )
    .skip(desde)
    .limit(5)
    .populate('usuario','nombre email')
    .populate('categoria')
    .exec( (err,productoDB) => {
        return bodygneral(res,err,productoDB);
    } )



} );


//============
//  Producto Buscar
//============

app.get( '/productos/buscar/:termino', verificaToken,(req,res) => {

    let termino = req.params.termino;
    let regex =  new RegExp(termino,'i');
 

    ProductoSchema.find({ nombre: regex })
        .populate('categoria','nombre')
        .exec( (err,productoDB) => {
            return bodygneral(res,err,productoDB);
        } )



} );

//============
//  Producto por Id
//============

app.get( '/productos/:id', verificaToken,(req,res) => {
    //trae todos los productos
    // populrate: usuario categoria
    
    let id = req.params.id;

    ProductoSchema.findById( id)
    .populate('usuario','nombre email')
    .populate('categoria','id descripcion')
    .exec(
    (err,productoDB) => {
        return bodygneral(res,err,productoDB);
    } )




} );

//============
//  Crear un Nuevo Producto
//============

app.post( '/producto',verificaToken, (req,res) => {
    //grabar el usuario
    // grabar una categoria del listado

    let body = req.body;

    let productoSchema =  new ProductoSchema( {
        usuario: req.usuario._id,
        nombre : body.nombre, 
        precioUni : body.precioUni, 
        descripcion : body.descripcion, 
        disponible : body.disponible, 
        categoria : body.categoria
    } ) ;

    productoSchema.save( (err,productoDB) => {


        return bodygneral(res,err,productoDB);

    } )




} );


//============
//  Actualizar un producto
//============

app.put( '/producto/:id',verificaToken,  (req,res) => {

    let body = req.body;
    let id = req.params.id;

    let productoSchema = {
        
        nombre : body.nombre, 
        precioUni : body.precioUni, 
        descripcion : body.descripcion, 
        usuario : req.usuario._id,
    }

    ProductoSchema.findOneAndUpdate(id, productoSchema, 
        { new: true, runValidators: true }, (err,productoDB) => {
        
         return bodygneral(res,err,productoDB);

    } );





} );

//============
//  Borrar un producto
//  Cambiamos el estado
//============

app.delete( '/producto/:id', (req,res) => {
    // cambiar disponible : false 

        let id = req.params.id;

        ProductoSchema.findById(id, (err,productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: 'No Existe'
                });
            }

            productoDB.disponible = false;

            productoDB.save( (err,productoDB) => {
                return bodygneral(res,err,productoDB);
            } );


        })



} );



function bodygneral(res,err,productoDB){

    if (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
    if (!productoDB) {
        return res.status(400).json({
            ok: false,
            err: 'No Existe'
        });
    }

    res.json({
        ok: true,
        producto: productoDB
    })



    return res;
}


module.exports = app;