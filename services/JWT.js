const jwt= require("jsonwebtoken");
require("dotenv").config();



// Creamos la funcion que crea un JWT

function generateJWT (payload){
    let secretKey= process.env.JWT_SECRET;
    let tokenJWT= jwt.sign(payload, secretKey, {
        expiresIn : "7d"
    });
    return tokenJWT;
}



//Creamos la funcion que parsea un token
//Verifica el token, si sale error, retorna nulo
//La funcion verifica y decodifica el token
// Si da error, retorna nulo.

function parseJWT(token){
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch {
        return null;
    }
}

//Estas funciones se usan en validate-token y en el login
//Exportamos

module.exports = {
    generateJWT,
    parseJWT
};