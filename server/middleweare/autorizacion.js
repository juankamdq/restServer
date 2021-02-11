const jwt = require('jsonwebtoken');



// ===============================
//         AUTORIZACION
// ===============================



let verificarToken = (req, res, next) => {

    //con get obtenemos los datos pasados por el header
    let token = req.get('Autorizacion_token');

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                message: err
            })
        }

        //decode.usuario .Obtenemos los datos encriptados del peyload
        req.usuario = decoded.usuarioDb;

        //Pasara a ejecutar la siguiente funcion
        next();

    })
}




// =======================================
//   Verificar Roles
// =======================================


const verificarRol = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {

        return res.status(401).json({
            ok: false,
            message: 'No esta autorizado'
        });
    };

    next();
}




module.exports = {

    verificarToken,
    verificarRol

}