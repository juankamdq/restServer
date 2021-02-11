const mongoose = require('mongoose');

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