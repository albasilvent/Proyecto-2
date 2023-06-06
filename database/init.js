//Conectar la base de datos
//Requerimos la funcion de init.js y la llamamos getDb.

require("dotenv").config();
const cryptoService = require("../services/crypto.js");
const { createPool } = require("./connection.js");
const { createTables } = require("./tables.js");

//Creamos una funcion. Dentro de la funcion creamos una variable
//En esa variable almacenamos la llamada a la funcion
const DATABASE_NAME = process.env.MYSQL_DATABASE;

async function initDB() {
  const pool = createPool();
  //BORRO LA BASE DE DATOS SI EXISTE
  await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);

  //CREO LA BASE DE DATOS
  await pool.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);
  await pool.query(`USE ${DATABASE_NAME}`);
  await createTables(pool);
  await pool.end();
}

initDB();
//Esa variable sirve para conectarnos con la db. Con ella creamos las querys
//Meter la funcion de crear tablas.
//Metemos la funcion de crearInserts
//Metemos la funcion de crearData
//Cerramos la conexion ???????
