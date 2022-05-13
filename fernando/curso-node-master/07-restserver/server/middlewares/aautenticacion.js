
const jwt = require('jsonwebtoken');

// ======
// Verificar Token
// ============
// req = solicitud
// res = respuesta
// next = continuar con la ejecucion del programa

let verificaToken =  (req,res,next) => {

    // console.log("1:",req.headers['authorization']);
    // console.log("2:",req.headers.authorization);
    // console.log("3",req.get('Authorization'));

    let token = req.get('Authorization'); 

    jwt.verify(token, process.env.SEED, (err,decoded) => {
        //decoded va a tener informacion del usuario

        if(err){
            return res.status(401).json({
                ok:false,
                err: {
                    message: "Token no Valido"
                }
            });
        }

        
        req.usuario = decoded.usuario;
        console.log(req.usuario);

        next();
        

    } )

    // res.json({
    //     token:token
    // });  

   

};


let verificaAdmin_Rol =  (req,res,next) => {

    let usuario = req.usuario; 

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.status(401).json({
            ok:false,
            err: {
                message: "El usuario no es administrador"
            }
        });

        
    }


};

//============
//  Verifica Token Img
//============

let verificaTokenImg =  (req,res,next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err,decoded) => {
        //decoded va a tener informacion del usuario

        if(err){
            return res.status(401).json({
                ok:false,
                err: {
                    message: "Token no Valido"
                }
            });
        }

        
        req.usuario = decoded.usuario;
        console.log(req.usuario);

        next();
        

    } )


    // res.json({
    //    token
    // });

};


module.exports = {
    verificaToken,
    verificaAdmin_Rol,
    verificaTokenImg
}