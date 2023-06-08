// post /posts/:id/like
//Hacer toggle del like en el post
const { handleAsyncError } = require("../services/errors");
const { toggleLike } = require("../use-cases/like");
const { sendResponse } = require("../services/response");
const router = Router();

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
