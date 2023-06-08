//Funcion para validar el email
//Comprobamos que el usuarios existe, si no, lanza error
//Obetenemos el codigo de validacion con getValidationCodeByUserID
//Si el codigo de validacion no es correcto, lanza error
//Si es correcto, borramos el codigo de la base de datos con DeleteValidationCode
//Actualizamos al usuario para que su emailValidated sea true con SetEmailValidated

const {
    setEmailValidated,
    getValidationCodeByUserId,
    deleteValidationCode,
} = require("../database/funciones/email.js");

const { getUserByEmail } = require("../database/funciones/users.js");

const { notFound, invalidValidationCode } = require("../services/errors.js");

async function validateEmailCode(userEmail, code) {
    const user = await getUserByEmail(userEmail);
    if (!user) {
        notFound();
    }
    const dbCode = await getValidationCodeByUserId(user.id);

    if (dbCode.code != code) {
        invalidValidationCode();
    }
    await deleteValidationCode(dbCode.id);

    await setEmailValidated(user.id);
}

module.exports = {
    validateEmailCode,
};
