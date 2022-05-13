const express = require('express');
const app = express()

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



const UsuarioSchema = require('../models/usuario');
////Google Sing In

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIEND_ID);


module.exports = app;


app.post('/login' ,(req,res)  => {


    let body = req.body;

    console.log(body);
    UsuarioSchema.findOne({ email:body.email }, (err,usuarioDB) => {
        if(err){
          return   res.status(500).json({
                ok:false,
                err
            });
        }

        if (!usuarioDB) {
            return   res.status(400).json({
                ok:false,
                err: {
                    message: "(usuario) o password incorrecto"
                }
            });
        }

        if(!bcrypt.compareSync( body.password,usuarioDB.password )){
            return   res.status(400).json({
                ok:false,
                err: {
                    message: "usuario o (password) incorrecto"
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
          }, process.env.SEED, { expiresIn:  process.env.CADUCIDAD_TOKEN });


         res.json({
            ok:true,
            usuario: usuarioDB,
            token
        });


    });

    // res.json( {
    //     ok:true
    // } )

} );


// CONFIGURACIONES DE GOOGLE

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIEND_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    // console.log(payload.name);
    // console.log(payload.email);

    return {
        nombre:payload.name,
        email: payload.email,
        img: payload.picture,
        google:true
    }
  }


app.post('/google' , async (req,res)  => {



    let token = req.body.idtoken;

    
    let googleUser =  await verify(token)
        .catch( err => {
              res.status(500).json({
                ok:false,
                err
            });
        });

    console.log(googleUser);

    UsuarioSchema.findOne ( {email:googleUser.email}, (err,usuarioDB) => {

        if(err){
            return res.status(500).json({
                    ok:false,
                    err
                });
        }

        if(usuarioDB){

            if (usuarioDB.google === false) {

                if(err){
                    return   res.status(500).json({
                            ok:false,
                            err: 'Debe de usar su authenticacion normal'
                        });
                    }
                
            } else {
                let token = jwt.sign({
                    usuario: usuarioDB
                    }, process.env.SEED, { expiresIn:  process.env.CADUCIDAD_TOKEN });

                    return res.json({
                        ok:true,
                        usuario: usuarioDB,
                        token,

                    })
            }
            
        }else{

            //Si el usuario no existe en nuestra BD

            let usuario =  new UsuarioSchema();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true,
            usuario.password = ':)',
            
            usuario.save( (err,usuarioBD) => {
                if (err) {
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                }
            } );


            let token = jwt.sign({
                usuario: usuarioDB
                }, process.env.SEED, { expiresIn:  process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok:true,
                    usuario: usuarioDB,
                    token,

                })

        }

    } );

    // res.json({
    //     usuario: googleUser
    // });


} );
