//Conectar la base de datos
//Requerimos la funcion de init.js y la llamamos getDb.
//Creamos una funcion. Dentro de la funcion creamos una variable
//En esa variable almacenamos la llamada a la funcion
//Esa variable sirve para conectarnos con la db. Con ella creamos las querys
//Meter la funcion de crear tablas.
//Metemos la funcion de crearInserts
//Metemos la funcion de crearData
//Cerramos la conexion ???????

const mysql2 = require("mysql2/promise");

let pool = null;
function createPool(database) {
  const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;
  return mysql2.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    database: database,
    password: MYSQL_PASSWORD,
  });
}
function getConnection() {
  if (!pool) {
    const { MYSQL_DATABASE } = process.env;
    pool = createPool(MYSQL_DATABASE);
  }
  return pool;
}

module.exports = {
  createPool,
  getConnection,
};