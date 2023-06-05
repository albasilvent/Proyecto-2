//Validar el token
// Creamos la variable del token
//Usamos la funcion parseJWT para verificarlo y decodificarlo y lo metemos en una variable
//Si la variable existe, almacena esa variable en req.current user
//Si no existe, req.currentUser=null;
//Ejecuta el siguiente middleware
//Se ejecuta en todas las rutas

const cryptoService = require("../services/crypto.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const user = cryptoService.parseJWT(token);
    if (user) {
      req.currentUser = user;
    } else {
      req.currentUser = null;
    }
  } else {
    req.currentUser = null;
  }
  next();
};