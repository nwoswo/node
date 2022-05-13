const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const UsuarioSchema = require('../models/usuario');
const ProductoSchema = require('../models/producto');

const fs = require('fs');
const path = require('path');


//midelware
//default options
app.use(fileUpload({ useTempFiles: true }));  // --> transofrma lo que sea que esta subiendo a req.files

app.put( '/upload/:tipo/:id', (req,res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if(!req.files){

        return res.status(400)
            .json({
                ok: false,
                err: {
                    message : 'No se ha seleccionado ningun archivo'
                }
            })
    }

    // Valida Tipo

    let tiposValidos = ['productos','usuarios'];

    if(tiposValidos.indexOf(tipo) <0 ){
        return res.status(400)
        .json({
            ok:false,
            err: 'Tipos no validos ' +tiposValidos.join(',')
        })
    }



    

    

   

    let archivo = req.files.archivo; // --> viene con un input llamado asi
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length -1];

    //Estebsuibes permitidas
    let extensionesValidas = ['png','gif','jpg','jpeg'];

    if(extensionesValidas.indexOf( extension) < 0){
        return res.status(400).json({
            ok:false,
            err : {
                message : 'las Extensiones permitidas son '+extensionesValidas.join(','),
                ext: extension
            }
        })
    }


    
    // cambiar nombre al archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err){
            return res.status(500)
            .json({
                ok:false,
                err
            })
        }

        //Aqui la imagen cargada
        
        switch (tipo) {
            case 'productos':
                imagenProducto(id,res,nombreArchivo)
                break;
            case 'usuarios':
                imagenUsuario(id,res,nombreArchivo)
                 break;
        }
        
        // imagenUsuario(id,res,nombreArchivo)
        // return res.json({
        //     ok:true,
        //     message: 'Imagen subida correctamente'
        // });
            
    

        // res.send('File uploaded!');
    });


    function imagenProducto(id, res,nombreArchivo){
        
        ProductoSchema.findById(id, (err,productoDB) =>{
            if (err){
                borrarArchivo(nombreArchivo,'productos')
                return res.status(500)
                .json({
                    ok:false,
                    err
                })
            }
            if (!productoDB){
                return res.status(400)
                .json({
                    ok:false,
                    err : {
                        message: 'Usuario no existe'
                    }
                })
            }

            borrarArchivo(productoDB.img,'productos')

            productoDB.img = nombreArchivo;
            productoDB.save(  (err,productoUpdate) => {
                if (err){
                
                    return res.status(500)
                    .json({
                        ok:false,
                        err
                    })
                }

                res.json({
                    ok: true,
                    producto: productoUpdate,
                    img:nombreArchivo
                });
            } );

        } )

    }


    function imagenUsuario(id, res,nombreArchivo){

        UsuarioSchema.findById(id, (err,usuarioDB) => {

            if (err){
                borrarArchivo(nombreArchivo,'usuarios')

                return res.status(500)
                .json({
                    ok:false,
                    err
                })
            }
            if (!usuarioDB){
                return res.status(400)
                .json({
                    ok:false,
                    err : {
                        message: 'Usuario no existe'
                    }
                })
            }

            borrarArchivo(usuarioDB.img,'usuarios')


            usuarioDB.img = nombreArchivo;

            usuarioDB.save( (err,usuarioUpdate)  => {
                if (err){
                    return res.status(500)
                    .json({
                        ok:false,
                        err
                    })
                }

                 res.json({
                    ok: true,
                    usuario: usuarioUpdate,
                    img: nombreArchivo
                });
            })

        })

    }

    function borrarArchivo(nombreImagen, tipo){

        
   

        let pathImagen = path.resolve(__dirname,`../../uploads/${tipo}/${nombreImagen}`);

   
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen);
            }

    }
    

} );

module.exports = app;