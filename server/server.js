//Se ejecutara la configuracion que establicimos
require('../config/config');


const express = require('express');
const mongoose = require('mongoose');

const app = express();


//body-parcer: es un paquete que sirve para analizar las solicitudes req.body pasadas como parametros en el body
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Importamos los verbos que creamos en la ruta usuario
app.use(require('./routes/usuario'));


//Coneccion a mongodb

let opciones = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};


//Coneccion para servidor MongoAtlas
mongoose.connect(process.env.URLDB, opciones, err => {

    if (err) throw err;
    console.log('Conectado a la Base de datos');
});


//Coneccion para servidor local
/* mongoose.connect('mongodb://localhost:27017/cafe', opciones, err => {

    if (err) throw err;
    console.log('Conectado a la Base de datos');
}); */



app.listen(process.env.PORT, () => {
    console.log('Aplicacion corriendo en puerto', process.env.PORT);
});