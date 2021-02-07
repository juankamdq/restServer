//Se ejecutara la configuracion que establicimos
require('../config/config');


const express = require('express');
const app = express();
//body-parcer: es un paquete que sirve para analizar las solicitudes req.body pasadas como parametros en el body
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json("Hello World");
});

app.post('/usuario', (req, res) => {

    let { nombre, apellido } = req.body;


    if (nombre === undefined) {

        res.status(400).send({
            ok: false,
            mensaje: 'Tiene que asignar un nombre',
        })
    } else {
        res.send({
            nombre,
            apellido,
            status: res.code
        });
    }


});

app.get('/usuario', (req, res) => {
    res.json("get User");
});


//PUT para actualizar datos
app.put('/usuario/:id', (req, res) => {

    let idUser = req.params.id; //valor que recibimos del :id pasados por parametro

    res.json({
        idUser
    });
});

app.delete('/usuario', (req, res) => {
    res.json("delete User");
});

app.listen(process.env.PORT, () => {
    console.log('Aplicacion corriendo en puerto', process.env.PORT);
});