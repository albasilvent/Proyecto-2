const { getCommentById, deleteComment } = require("../database/funciones/comment");
const { notFound, unauthorizedUser } = require("../services/errors");
const { getPostById } = require("../database/funciones/post");
const { getPhotoById, deletePhoto } = require("../database/funciones/photo");

async function removeComment (commentId, userId) {
    //Obtener el comentario con id "commentId"
    const comment = await getCommentById(commentId);
    if (!comment) {
      notFound();
    }
    //Comparar el id del token (userId) con el userID del comentario
    // Si no son iguales, tirar un error
    if (comment.userId != userId) {
      unauthorizedUser();
    }
    await deleteComment(commentId);
  };

// async function removePhoto (postId, photoId, userId) {
//     const post = await getPostById(postId);
//     //checkear que ese post exista
//     if (!post) {
//       notFound();
//     }
//     //checkear si este usuario puede cargarle fotos a ese post.
//     if (post.userId != userId) {
//       unauthorizedUser();
//     }
  
//     //checkear si existe la foto
//     const photo = await getPhotoById(photoId);
//     if (!photo) {
//       notFound();
//     }
  
//     //Si la foto no es una foto de ese post
//     if (photo.postId != postId) {
//       unauthorizedUser();
//     }
  
//     //Borrar la foto de la base de datos
//     await deletePhoto(photoId);
  
//     //Borrar la foto del sistema archivos
//     await deletePhoto(photo);
//   };

async function removePost (postId, userId) {
    const post = await getPostById(postId);
  
    if (!post) {
      notFound();
    }
  
    if (post.userId != userId) {
      unauthorizedUser();
    }
    await deletePost(postId);
  };

  module.exports = {
    removeComment,
    removePost
  };