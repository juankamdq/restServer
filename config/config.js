// ==================================
//              Port
// ==================================

// Estas configuraciones son requeridas para montar una aplicacion de produccion
// ya que la configuraciones (el puerto, el path, etc) son distintas a las de desarrollo (nuestra pc)


process.env.PORT = process.env.PORT || 3000; //si existe Port asignalo, sino asigna puerto 3000