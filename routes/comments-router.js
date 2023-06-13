const { Router, json } = require("express");
const { authGuard } = require("../middlewares/auth-guard.js");
const { handleAsyncError } = require("../services/errors.js");
const { addComment } = require("../use-cases/add.js");
const { editComment } = require("../use-cases/edit.js");
const { removeComment } = require("../use-cases/remove.js");
const { sendResponse } = require("../services/response.js");
const router = Router();

// post "/posts/:id/comments"
// Agregar un nuevo comentario al post
//FUNCIONA

router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        //Agregar un nuevo comentario al post con id req.params.id
        await addComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);
// patch "/posts/:id/comments/:commentId"
// Modificar el comentario
//FUNCIONA
router.patch(
    "/posts/:id/comments/:commentId",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        //Modificar el comentario con id req.params.commentId en el post con id req.params.id
        await editComment(req.params.commentId, req.currentUser.id, req.body);
        sendResponse(res);
    })
);
// delete  "/posts/:id/comments/:commentId"
// Borrar el comentario
//FUNCIONA

router.delete(
    "/posts/:id/comments/:commentId",
    authGuard,
    handleAsyncError(async (req, res) => {
        //Borrar el comentario con id req.params.commentId en el post con id req.params.id
        await removeComment(req.params.commentId, req.currentUser.id);
        sendResponse(res);
    })
);

module.exports = router;
