//Funciones de errores
module.exports = {
//invalidCredentials
//Funcion si las credenciales son invalidas
invalidCredentials() {
    throw {
      status: 400, //Bad Request
      code: "INVALID_CREDENTIALS",
      message: "Credenciales inválidas",
    };
  },
//emailNotValidated
//Funcion si el email no esta validado
emailNotValidated() {
    throw {
      status: 400, //Bad Request
      code: "EMAIL_NOT_VALIDATED",
      message: "El email de este usuario aún no ha sido validado",
    };
  },
//notAuthenticated
//Funcion si el usuario no esta autenticado
notAuthenticated() {
    throw {
      status: 401,
      code: "NOT_AUTHENTICATED",
      message: "Debe enviar el token en el header 'Authorization'",
    };
  },
//unathorizedUser
//Funcion si el usuario no esta autorizado
unauthorizedUser() {
    throw {
      status: 403, //403 Forbidden
      code: "UNAUTHORIZED",
      message: "El usuario no está autorizado para hacer esta operación",
    };
  },
//didNotAcceptTOS
//Funcion si el usuario no acepto las TOS
didNotAcceptTOS() {
    throw {
      status: 400, //Bad Request
      code: "DID_NOT_ACCEPT_TOS",
      message:
        "El usuario debe aceptar los términos y condiciones para registrarse",
    };
  },
//notFound
//Eror 404
notFound() {
    throw {
      status: 404, //NOT FOUND
      code: "RESOURCE_NOT_FOUND",
      message: "El recurso requerido no existe",
    };
  },
//emailAlreadyRegistered
//Funcion si el email ya esta registrado
emailAlreadyRegistered() {
    throw {
      status: 400, //Bad Request
      code: "EMAIL_ALREADY_REGISTERED",
      message: "El email ya está registrado",
    };
  },
//invalidaValidationCode
//Funcion si el codigo no es valido
invalidValidationCode() {
    throw {
      status: 400, //Bad Request
      code: "INVALID_VALIDATION_CODE",
      message: "El código de validación es inválido",
    };
  },
};