const express = require('express');
const app = express();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDb) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                message: err
            });
        }

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                message: '(usuario) o contraseña invalido'
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDb.password)) {
            return res.status(400).json({
                ok: false,
                message: 'usuario o (contraseña) invalido'
            })
        }



        //Generamos el token
        let token = jwt.sign({
            //aca envio el objeto para que genere el payload(tiene la info)
            usuarioDb
        }, process.env.TOKEN_SEED, process.env.EXPIRE_TOKEN)


        res.json({
            ok: true,
            usuarioDb,
            token
        })


    })


});


module.exports = app;