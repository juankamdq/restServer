//Esta documento sera encargado de trabajar con las rutas de nuestro server


const express = require('express');
const app = express();

//Encriptado de contraseñas
const bcrypt = require('bcrypt');

//libreria javascript que tiene muchas funciones
const _ = require('underscore');



//Importamos el modelo para cargarle los datos. Dejamos la variable en mayuscula porque crearemos objetos
//con la palabra reservada new Usuario(doc)
const Usuario = require('../models/usuario');


//LLamo a los middleweare que cree
const { verificarToken, verificarRol } = require('../middleweare/autorizacion');



app.post('/usuario', [verificarToken, verificarRol], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //hashSync hace que encripte en una sola via de forma Sincrona
        password: bcrypt.hashSync(body.password, 10), //10 numeros de vueltas para aplicar el hash, mas seguro
        img: body.img,
        role: body.role,
        estado: body.estado,
        google: body.google
    })


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            })
        }

        res.json({
            ok: true,
            usuarioDB,
        });

    })



    if (body.nombre === undefined) {

        res.status(400).send({
            ok: false,
            mensaje: 'Tiene que asignar un nombre',
        })
    }
});

//PUT para actualizar datos
app.put('/usuario/:id', verificarToken, (req, res) => {

    /*
        El problema que tenemos que evitar es que el usuario no pueda ingresar datos adicionales a la hora de actualizar,
        o que no actualice algun dato que no queramos tenga acceso.
        
        runValidators: Corre las validaciones del schema, para que a la hora de actualizar cumpla las mismas restricciones. Ej; default

    */

    let idUser = req.params.id; //valor que recibimos del :id pasados por parametro

    /*.pick funcion propia de la libreria underscore. Permite sobre el objeto traer las variables que si quiero tener, 
       es mejor que hacer delete body.password,etc */
    let body = _.pick(req.body, ['nombre', 'img', 'role', 'estado']);

    /* Para que no pueda actualizar datos. Pero es ineficiente si tuvieramos muchos datos. 
    Para eso usar libreria de javascript underscare */
    delete body.password;
    delete body.google;

    let options = {
        //new: Si es true retorna el documento actualizado, caso contrario el no modificado
        new: true,
        runValidators: true,
    }

    //(id, doc, options, callback)
    Usuario.findByIdAndUpdate(idUser, body, options, (err, userDb) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            })
        }

        res.send({
            ok: true,
            userDb
        })

    })

});


// El middlewere verificarToken no lo estamos ejecutando con (), se dispararà solo cuando el usuario haga peticiones
app.get('/usuario', verificarToken, (req, res) => {


    let limite = req.query.limite || 0; //Por parametros obtengo el limite Ej. ?limite=5
    limite = Number(limite);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    //find({traer},  que mostrar)
    Usuario.find({ estado: true }, 'nombre email')
        .skip(desde) //trae a partir de x posiciones
        .limit(limite) //Trae x cantidad de documentos. Permite no consumir tantos datos al usuario
        .exec((err, userDb) => {

            if (err) {
                return res.status(400).send({
                    ok: false,
                    mensaje: err
                });
            };



            Usuario.countDocuments({ estado: true }, (err, contador) => {

                res.json({
                    ok: true,
                    userDb,
                    contador
                })
            })

        });

});



//Directamente borramos el documento. No es buena practica, ya que los datos tienen que ser persistentes
app.delete('/usuario/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            })
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no existe'
                }
            })
        }

        res.send({
            ok: true,
            usuarioBorrado
        })

    })


});


app.delete('/usuarios/:id', verificarToken, (req, res) => {

    let idUser = req.params.id;

    Usuario.findByIdAndUpdate(idUser, { estado: false }, (err, usuarioUpdate) => {

        if (err) {
            return res.status(400).send({
                ok: false,
                message: err
            });
        };


        res.json({
            ok: true,
            usuarioUpdate
        });
    })




})


//Aca recibo info del enterno de desarrollo
app.get('/infoServer', verificarToken, (req, res) => {

    let datos = {
        entorno: process.env.NODE_ENV,
        urlDb: process.env.MONGO_URL //MONGO_URL lo creamos como variable de entorno heroku
    };

    if (process.env.NODE_ENV === 'dev') {
        return res.json(datos);
    }

    res.json(datos);
});



module.exports = app;