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

/*
En heroku podemos crear variables de entorno. esto es por si queres ocultar datos importantes. 
Ejemplo: cadena de coneccion del clouster mongo

command-line
heroku config --> Retorna todas las variables de entorno
heroku config:set nombreVariable=valor --> Creo una variable
heroku config:get nombreVariable --> Retorno variable

*/

// MONGO_URL la creamos en consola con la cadena de coneccion
let urlDb = process.env.MONGO_URL;

if (process.env.NODE_ENV === 'dev')
    urlDb = 'mongodb://localhost:27017/cafe';

//Inventantamos una variable al env para asignarla a la cadena de coneccion del server, tambien se podria exportar como module    
process.env.URLDB = urlDb;



// ==================================
//         Vencimiento Token
// ==================================


process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ==================================
//              Seed
// ==================================

process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'esto-es-un-seed-desarrollo';