// post /posts/:id/like
//Hacer toggle del like en el post
const { Router } = require("express");
const { authGuard } = require("../middlewares/auth-guard.js");
const { handleAsyncError } = require("../services/errors");
const { toggleLike } = require("../use-cases/like");
const { sendResponse } = require("../services/response");
const router = Router();

//FUNCIONA
router.post(
    "/posts/:id/like",
    authGuard,
    handleAsyncError(async (req, res) => {
        //Hacer toggle del like en el post con id req.params.id
        await toggleLike(req.params.id, req.currentUser.id);
        sendResponse(res);
    })
);

module.exports = router;
