//Funcion para validar el email

//Comprobamos que el usuarios existe, si no, lanza error
//Obetenemos el codigo de validacion con getValidationCodeByUserID
//Si el codigo de validacion no es correcto, lanza error
//Si es correcto, borramos el codigo de la base de datos con DeleteValidationCode
//Actualizamos al usuario para que su emailValidated sea true con SetEmailValidated

const { setEmailValidated, getValidationCodeByUserId, deleteValidationCode } = require("../database/funciones/email.js");

const { getUserByEmail } = require("../database/funciones/users.js");

const  { notFound, invalidValidationCode } = require("../services/errors.js");

async function validateEmail (email, userId) {
  const user = await getUserByEmail(email);
  if (!user) {
    notFound();
  }
  const validationCode = await getValidationCodeByUserId(userId, code);

  if (validationCode != code) {
    invalidValidationCode();
  }
  await deleteValidationCode(code);

  await setEmailValidated(userId);
};

module.exports = {
    validateEmail
};