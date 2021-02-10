// ==================================
//              Port
// ==================================

// Estas configuraciones son requeridas para montar una aplicacion de produccion
// ya que la configuraciones (el puerto, el path, etc) son distintas a las de desarrollo (nuestra pc)


process.env.PORT = process.env.PORT || 3000; //si existe Port asignalo, sino asigna puerto 3000


// ==================================
//              Entorno
// ==================================

//Verificamos si se esta ejecutando en un entorno de produccion, ej Heroku. Sino localmente, desarrollo
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ==================================
//              Base de datos
// ==================================


let urlDb = 'mongodb+srv://juanka:DFbgrejplYCZzNTx@cluster0.ci5fv.mongodb.net/cafe';

/* if (process.env.NODE_ENV === 'dev')
    urlDb = 'mongodb://localhost:27017/cafe'; */

//Inventantamos una variable al env para asignarla a la cadena de coneccion del server, tambien se podria exportar como module    
process.env.URLDB = urlDb;