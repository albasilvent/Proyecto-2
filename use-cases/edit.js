const {
    getCommentById,
    updateComment,
} = require("../database/funciones/comment");
const { getPostById } = require("../database/funciones/post");
const { notFound, unauthorizedUser } = require("../services/errors");

//EDITAR POSTS
//Funcion que obtiene el post segun su id (db-funciones GETPOSTBYID)
//si el post no existe, lanza error 404
// SI el id del usuario del post no coincide con el id del usuario,lanza error
//Si esta todo correcto, edita el post (titulo, foto y descripcion)

async function editPost(postId, userId, postPayload) {
    const post = await getPostById(postId);
    if (!post) {
        notFound();
    }

    if (post.userId != userId) {
        unauthorizedUser();
    }

    const updatedPost = {
        ...post,
        title: postPayload.title,
        description: postPayload.description,
    };

    await updatePost(updatedPost);
}

//EDITAR COMENTARIOS
//Funcion que obtiene el comentario segun el ID (db-funciones GETCOMMENTBYID)
//Si el comentario no existe, salta error
//Si el comentario existe, Compara el id del token (userId) con el userID del comentario
// Si no son iguales, tirar un error

async function editComment(commentId, userId, commentPayload) {
    const comment = await getCommentById(commentId);
    if (!comment) {
        notFound();
    }
    if (comment.userId != userId) {
        unauthorizedUser();
    }
    await updateComment(commentId, commentPayload);
}

module.exports = {
    editPost,
    editComment,
};
