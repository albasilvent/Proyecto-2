const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().required(),
    surname1: Joi.string().required(),
    surname2: Joi.string(),
    country: Joi.string(),
});
