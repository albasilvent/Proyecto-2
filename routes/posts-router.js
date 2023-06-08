const { Router, json } = require("express");
const { handleAsyncError } = require("../services/errors");
const { listPosts } = require("../use-cases/list");
const { search } = require("../use-cases/search");
const { addPost } = require("../use-cases/add");
const { editPost } = require("../use-cases/edit");
const { removePost } = require("../use-cases/remove");
const { viewPost } = require("../use-cases/view-post-detail");
const { sendResponse } = require("../services/response");
const router = Router();

// get /posts
//Obtener todos los post
router.get(
    "/posts",
    handleAsyncError(async (req, res) => {
        //Obtener todos los posts
        const posts = await listPosts();
        sendResponse(res, posts);
    })
);
// get /posts/search
//Obtener todos los post
router.get(
    "/posts/search",
    handleAsyncError(async (req, res) => {
        //Obtener todos los posts
        const posts = await search(req.query);
        sendResponse(res, posts);
    })
);
// post /posts
//Crear un nuevo post
router.post(
    "/posts",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        // Crear un nuevo post
        await addPost(req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);
// patch /posts/:id
// Editar el post
router.patch(
    "/posts/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        // Editar el post con id req.params.id
        await editPost(req.params.id, req.currentUser.id, req.body);
        sendResponse(res);
    })
);
// get /posts/:id
// Obtener un post
router.get(
    "/posts/:id",
    handleAsyncError(async (req, res) => {
        // Obtener el post con id req.params.id
        const post = await viewPost(req.params.id);
        sendResponse(res, post);
    })
);
// delete /posts/:id
// borrar un post
router.delete(
    "/posts/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        //Borrar el post con id req.params.id
        await removePost(req.params.id, req.currentUser.id);
        sendResponse(res);
    })
);

module.exports = router;
