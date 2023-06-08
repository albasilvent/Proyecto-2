//Todas las rutas (required)
//Usamos Router
//usamos las rutas de users y las rutas de post
const { Router } = require("express");
const commentsRouter = require("./comments-router.js");
const likesRouter = require("./likes-router.js");
const photosRouter = require("./photos-router.js");
const postsRouter = require("./posts-router.js");
const usersRouter = require("./users-router");
const router = Router();

router.use(commentsRouter);
router.use(likesRouter);
router.use(photosRouter);
router.use(postsRouter);
router.use(usersRouter);

module.exports = router;
