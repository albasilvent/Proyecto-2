//Conectar la base de datos
//Requerimos la funcion de init.js y la llamamos getDb.
require("dotenv").config();
const cryptoService = require("../services/crypto.js");
const { createPool } = require("./connection.js");
const { createTables } = require("./tables.js");
const { insertAdminUsers } = require("./adminUsers.js");

//Creamos una funcion. Dentro de la funcion creamos una variable
//En esa variable almacenamos la llamada a la funcion
const DATABASE_NAME = process.env.MYSQL_DATABASE;
const DB_ADMIN_NAME = process.env.DB_ADMIN_NAME;
const DB_ADMIN_SURNAME1 = process.env.DB_ADMIN_SURNAME1;
const DB_ADMIN_SURNAME2 = process.env.DB_ADMIN_SURNAME2;
const DB_ADMIN_EMAIL = process.env.DB_ADMIN_EMAIL;
const DB_ADMIN_PASSWORD = process.env.DB_ADMIN_PASSWORD;
const DB_ADMIN_DATE = process.env.DB_ADMIN_DATE;


async function initDB() {
  const pool = createPool();
  //BORRO LA BASE DE DATOS SI EXISTE
  await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
  //CREO LA BASE DE DATOS
  await pool.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);
  await pool.query(`USE ${DATABASE_NAME}`);

  await createTables(pool);

  await insertAdminUsers(pool, DB_ADMIN_NAME, DB_ADMIN_SURNAME1,DB_ADMIN_SURNAME2,DB_ADMIN_EMAIL,DB_ADMIN_PASSWORD,DB_ADMIN_DATE);

  //Podemos meter una funcion para añadir fake data

  await pool.end();
}

initDB();
//Esa variable sirve para conectarnos con la db. Con ella creamos las querys
//Meter la funcion de crear tablas.
//Metemos la funcion de crearInserts
//Metemos la funcion de crearData
//Cerramos la conexion ???????

//Creamos la variable pool
//Creamos una funcion "getDB". Si la pool no existe, la crea
//Si existe: return await pool.getConnection();