const { validateBody } = require("../middlewares/validate-body.js");
const { validateEmailCode } = require("../use-cases/validate-email.js");
const { handleAsyncError } = require("../services/errors.js");
const { registerUser } = require("../use-cases/register.js");
const { loginUser } = require("../use-cases/login.js");
const { sendResponse } = require("../services/response.js");
const router = Router();
// post  "/users/register"
//Registrar un usuario
router.post(
    "/users/register",
    json(),
    validateBody(registerPayload),
    handleAsyncError(async (req, res) => {
        await registerUser(req.body);
        sendResponse(res);
    })
);
// post  "/users/login"
//Logearse, devuelve un token
router.post(
    "/users/login",
    json(),
    validateBody(loginPayload),
    handleAsyncError(async (req, res) => {
        //Loguea el usuario y devuelve un token de login
        const token = await loginUser(req.body);
        sendResponse(res, {
            token,
        });
    })
);
//post "/users/validate-email"
//Validar el email
router.post(
    "/users/validate-email",
    json(),
    handleAsyncError(async (req, res) => {
        const { email, code } = req.body;
        await validateEmailCode(email, code);
        sendResponse(res);
    })
);
//get "/users"
//Obtener todos los usuarios
router.get("/users", authGuard, (req, res) => {
    // Obtener todos los usuarios (solo para admins)
    res.send("Listado usuarios");
});
//get "/users/:id"
//Obetener el usuario
router.get("/users/:id", authGuard, (req, res) => {
    // Obtener el usuario con id req.params.id
    res.send("Detalle usuario");
});
//patch "/users/:id"
//Modificar daros de usuario
router.patch("/users/:id", authGuard, json(), (req, res) => {
    // Modificar datos del usuario (solo para el propio usuario, o para el admin)
    res.json(req.body);
});

module.exports = router;
