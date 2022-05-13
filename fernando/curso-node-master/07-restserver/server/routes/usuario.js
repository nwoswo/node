
const express = require('express');
const app = express()

const bcrypt = require('bcrypt');
const _ = require('underscore');

const UsuarioSchema = require('../models/usuario');

const { verificaToken,verificaAdmin_Rol }   = require('../middlewares/aautenticacion');
    
    app.get('/usuario', [ verificaToken]  , function (req, res) {

        // return res.json({
        //     usuario: req.usuario,
        //     nombre: req.usuario.nombre,
        //     email: req.usuario.email

        // });
    //   res.send('Hello World')

        console.log( req.params.desde);

        let desde = req.query.desde || 0;
        desde = Number(desde);

        let limite = req.query.limite || 5;
        limite = Number(limite);



        UsuarioSchema.find( {estado:true}, ' nombre email role estado google img ' )
            .skip(desde)
            
            .limit(limite)
            .exec( (err,usuarios) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                UsuarioSchema.count( {estado:true},(err,conteo) => {
                    res.json({
                        ok:true,
                        usuarios:usuarios,
                        cuantos:conteo
                    })
                } )

                
            } );

    //   res.json('Get Usuarios')
    })
    
    app.post('/usuario',[ verificaToken,verificaAdmin_Rol] , (req,res) => {
    
        let body = req.body;

        let usuarioSchema = new UsuarioSchema({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password,10) ,
            role: body.role
        });

        

        usuarioSchema.save( (err,usuarioDB) => {
            if (err) {
                return res.status(400).json({
                     ok: false,
                     err
                })
            }

            
            console.log(usuarioDB);
            res.json({
                ok: true,
                usuario:usuarioDB
            });

        });

        // if(body.nombre === undefined){
        //     res.status(400).json({
        //         ok: false,
        //         mensaje: 'El nombre es necesario'
        //     });
        // }else{
        //     res.json({
        //         persona:body
        //     })
        // }
    
        
    } )
    
    app.put('/usuario/:id',[ verificaToken,verificaAdmin_Rol] , (req,res) => {
        let id = req.params.id


        let body = _.pick(req.body, ['nombre','email','role','estado'] );

        UsuarioSchema.findOneAndUpdate( id, body , 
            {new: true, runValidators: true},
            (err,usuarioDB) => {

            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB
            })

        } )



        // res.json({
        //     id
        // })
    
    } )
    
    app.delete('/usuario/:id',[ verificaToken,verificaAdmin_Rol] , (req,res) => {

        console.log('delete');

        let id = req.params.id;

        let cambiaEstado = {
            estado: false
        }

        UsuarioSchema.findOneAndUpdate( id, cambiaEstado , 
            {new: true,},
            (err,usuarioDB) => {

            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB
            })

        } )



        // UsuarioSchema.findByIdAndRemove( id, (err,usuarioRemove) => {

        //     if (err) {
        //         return res.status(400).json({
        //             ok: false,
        //             err
        //         })
        //     }

        //     if(!usuarioRemove){
        //         return res.status(400).json({
        //             ok: false,
        //             err: {
        //                 message: 'Usuario No encontrado'
        //             }
        //         })
        //     }
            
        //     res.json({
        //         ok:true,
        //         usuario: usuarioRemove
        //     });

        // } );

        
    } )
    

    module.exports = app;