//Funcion para validar el email

//Comprobamos que el usuarios existe, si no, lanza error
//Obetenemos el codigo de validacion con getValidationCodeByUserID
//Si el codigo de validacion no es correcto, lanza error
//Si es correcto, borramos el codigo de la base de datos con DeleteValidationCode
//Actualizamos al usuario para que su emailValidated sea true con SetEmailValidated

const { emailValidated } = require("./database/funciones/email.js");

const { emailNotValidated } = require("./services/errors.js");

module.exports = async (email, userId) => {
  const user = await getUserByEmail(email);
  if (!user) {
    errorService.notFound();
  }
  const validationCode = await dbFunction.getValidationCodeByUserId(userId, code);

  if (validationCode != code) {
    errorService.invalidValidationCode();
  }
  await dbFunction.deleteValidationCode(code);

  await dbFunction.setEmailValidated(userId);
};
