// Sera encargado de trabajar el modelo de datos

const mongoose = require('mongoose');




/*
Es un complemento que agrega validación previa al guardado para campos únicos dentro de un esquema de Mongoose.
Esto hace que el manejo de errores sea mucho más fácil, ya que obtendrá un error de validación de Mongoose cuando 
intente violar una restricción única , en lugar de un error E11000 de MongoDB. 
*/
const uniqueValitator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;


//Aca definimos el schema, configuracion que tendra nuestra coleccion en la base de datos
const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'], //No es necesario decarar el mensaje

    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: {
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            message: '{VALUE} no es valido'
        }
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

//De esta forma podemos modificar el documento que se va a mostrar
//Queremos que la variable "password" del objeto no se muestre
usuarioSchema.methods.toJSON = function() {
    let user = this; //obtengo el documento 
    let userObject = user.toObject(); //transformo el documento a un objeto
    delete userObject.password; //borro el password del documento a mostrar

    return userObject;
}


//Le decimos al SCHEMA que use un plugin en particular
usuarioSchema.plugin(uniqueValitator, { message: '{PATH} debe de ser unico' }); //{PATH} hace referencia a la variable que es unica. En este caso el correo


//Exportamos el model
module.exports = mongoose.model('Usuario' /* nombre del documento que tendra la base de datos */ , usuarioSchema);