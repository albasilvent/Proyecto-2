//Saber si esta registrado. Si esta registrado, deja pasar. Si no, salta un error.
//Se usa en las rutas que no sean get.

const errorService = require("../services/errors.js");

module.exports = (req, res, next) => {
  if (!req.currentUser) {
    errorService.notAuthenticated();
  } else {
    next();
  }
};