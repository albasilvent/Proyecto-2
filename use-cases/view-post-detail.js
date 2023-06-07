//Funcion que devuelve todos los datos de un post

//Primero comprobamos si el post existe con GetPostByID
//SI no existe, tira error
//Si existe, almacenamos los comentarios en post.comments con getCommentsByPostID
//Almacenamos los likes en post.likes con CountLikesByPostID
//Retornamos post

const { getPostById } = require("./database/funciones/post.js");


  module.exports = async (postId) => {
    const post = await dbFunction.getPostById(postId);
    if (!post) {
      errorService.notFound();
    }
    post.comments = await dbFunction.getCommentsByPostId(postId);
    post.likes = await dbFunction.likesCountPost(postId);
    return post;
  };