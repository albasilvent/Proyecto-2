// Validamos los datos del login con Joi. Esta funcion se usa de argumento 
// para el middleware validate-body en la ruta del login.

const Joi = require("joi");

module.exports = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});