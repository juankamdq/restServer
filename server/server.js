//Se ejecutara la configuracion que establicimos
require('../config/config');


const express = require('express');


const app = express();


//body-parcer: es un paquete que sirve para analizar las solicitudes req.body pasadas como parametros en el body
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Importamos las rutas globales

app.use(require('./routes/index'));



//Coneccion al mongoose
require('./mongoose');


//Ingreso el puerto a utilizar
app.listen(process.env.PORT, () => {
    console.log('Aplicacion corriendo en puerto', process.env.PORT);

});