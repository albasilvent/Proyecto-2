const { Router, json } = require("express");
const { authGuard } = require("../middlewares/auth-guard.js");
const { validateBody } = require("../middlewares/validate-body.js");
const { validateEmailCode } = require("../use-cases/validate-email.js");
const { handleAsyncError } = require("../services/errors.js");
const { registerUser } = require("../use-cases/register.js");
const { loginUser } = require("../use-cases/login.js");
const { sendResponse } = require("../services/response.js");
const registerPayload = require("../validators/register.js");
const loginPayload = require("../validators/login.js");
const { listUsers } = require("../use-cases/list.js");
const { editUser } = require("../use-cases/edit");
const { viewUser } = require("../use-cases/view-details.js");
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
// post  "/users/login"
//Logearse, devuelve un token
router.post(
    "/users/login",
    json(),
    validateBody(loginPayload),
    handleAsyncError(async (req, res) => {
        //Loguea el usuario y devuelve un token de login
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        sendResponse(res, {
            token,
        });
    })
);
// //get "/users"
// //Obtener todos los usuarios //NO LO PIDEN
// router.get(
//     "/users",
//     handleAsyncError(async (req, res) => {
//         //Obtener todos los posts
//         const posts = await listUsers();
//         sendResponse(res, posts);
//     })
// );

//get "/users/:id"
//Obtener el usuario
//ESTO ESTA DEVOLVIENDO LOS DATOS DEL USUARIO, TAMBIEN TIENE QUE DEVOLVER LOS POSTS CON UN JOIN
router.get(
    "/users/:id",
    handleAsyncError(async (req, res) => {
        // Obtener el post con id req.params.id
        const user = await viewUser(req.params.id);
        sendResponse(res, user);
    })
);

//patch "/users/:id"
//Modificar datos de usuario
router.patch(
    "/users/:email",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        // Editar el post con id req.params.id
        await editUser(req.params.email, req.body);
        sendResponse(res);
    })
);
module.exports = router;
