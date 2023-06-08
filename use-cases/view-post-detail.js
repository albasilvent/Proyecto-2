//Funcion que devuelve todos los datos de un post

//Primero comprobamos si el post existe con GetPostByID
//SI no existe, tira error
//Si existe, almacenamos los comentarios en post.comments con getCommentsByPostID
//Almacenamos los likes en post.likes con CountLikesByPostID
//Retornamos post

const { getPostById } = require("../database/funciones/post.js");

const { notFound } = require("../services/errors.js");

const { getCommentsByPostId } = require("../database/funciones/comment.js");

const { likesCountPost } = require("../database/funciones/like.js");

async function viewPost(postId) {
    const post = await getPostById(postId);
    if (!post) {
        notFound();
    }
    post.comments = await getCommentsByPostId(postId);
    post.likes = await likesCountPost(postId);
    return post;
}

module.exports = {
    viewPost,
};
