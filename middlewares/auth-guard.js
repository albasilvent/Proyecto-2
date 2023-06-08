//Saber si esta registrado. Si esta registrado, deja pasar. Si no, salta un error.
//Se usa en las rutas que no sean get.
const { notAuthenticated } = require("../services/errors");

function authGuard(req, res, next) {
    if (!req.currentUser) {
        notAuthenticated();
    } else {
        next();
    }
}

module.exports = { authGuard };
