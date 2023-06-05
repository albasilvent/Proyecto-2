const crypto = require("crypto");
const bcrypt = require("bcryptjs");


//Funcion para hashear la contraseña
//Se usa en los insert de la base de datos y en el registro ????

async function hashPassword(password){
    let hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword;
}


//Funcion para validar la contraseña
//Se usa en el login

async function validatePassword(password, hash){
    let compare = await bcrypt.compare(password, hash);
    return compare;
}


//Generar un numero para validar emails
//se usa en el registro

function generateValidationCode() {
    let validationCode = crypto.randomInt(100000, 999999);
    return validationCode;
}


//Generar UUID
//Se usa en los insert de la base de datos, en añadir comentarios y en añadir posts
//Tambien se usa para el like

function generateUUID() {
    let uuid = crypto.randomUUID();
    return uuid;
}

//Exportamos las funciones

module.exports = {
    hashPassword,
    validatePassword,
    generateValidationCode,
    generateUUID,
};