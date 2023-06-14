const Joi = require("joi");

module.exports = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    photo1: Joi.string().required(),
    photo2:Joi.string(),
    photo3:Joi.string()
});
