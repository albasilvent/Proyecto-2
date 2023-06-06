//Iniciar la base de datos (conseguir la conexion)
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
