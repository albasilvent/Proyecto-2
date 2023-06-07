//Funcion que agrega un like al post y si lo tiene lo quita.
//Compruebo si el post existe con db-funciones GETPOSTBYID
//Si no existe salta error
//Si existe, compruebo si tiene like con db-funciones likeExists
//Si tiene like lo borro con db-funciones DELETELIKEBYUSERID
//Si no lo tiene, lo crea con CreateLike
const { generateUUID } = require("../services/crypto");
const { getPostById } = require("../database/funciones/post");
const { notFound } = require("../services/errors");
const {
    likeExists,
    createLike,
    deleteLikeByUserId,
} = require("../database/funciones/like");

async function toggleLike(postId, userId) {
    const post = await getPostById(postId);
    if (!post) {
        notFound();
    }
    if (await likeExists(postId, userId)) {
        await deleteLikeByUserId(postId, userId);
    } else {
        await createLike({
            id: generateUUID(),
            postId: postId,
            userId: userId,
        });
    }
}

module.exports = {
    toggleLike,
};
