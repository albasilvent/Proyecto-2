//addComment y addPhoto
//Funcion que compruebe si un post existe.
//Si no existe salta error
//SI existe crea un nuevo comentario y lo guarda en la base de datos
//Aqui PAblo puso add photo pero como nuestro post es en si una foto, no se como hacer
const { generateUUID } = require("../services/crypto");
const { saveComment } = require("../database/funciones/comment");
const { savePhoto } = require("../database/funciones/photo");
const { getPostById, savePost } = require("../database/funciones/post");
const { notFound, unauthorizedUser } = require("../services/errors");
const { processUploadedPostPhoto } = require("../services/images");

async function addPost(currentUserId, postPayload) {
    const post = {
        title: postPayload.title,
        description: postPayload.description,
        photo1: postPayload.photo1,
        photo2: postPayload.photo2,
        photo3: postPayload.photo3,
        userId: currentUserId,
        id: generateUUID(),
    };
    await savePost(post);
}

async function addComment(postId, currentUserId, commentPayload) {
    const post = await getPostById(postId);

    if (!post) {
        notFound();
    }

    const comment = {
        postId: postId,
        userId: currentUserId,
        comment: commentPayload.comment,
        id: generateUUID(),
    };
    await saveComment(comment);
}

// Función para añadir fotos. Misma sintaxis que la función anterior.

// async function addPhoto(postId, userId, photo) {
//     const post = await getPostById(postId);

//     if (!post) {
//         notFound();
//     }

//     if (post.userId != userId) {
//         unauthorizedUser();
//     }

//     const url = await processUploadedPostPhoto(postId, id, photo);

//     const newPhoto = {
//         id: generateUUID(),
//         postId: postId,
//         imgURL: url,
//     };
//     await savePhoto(newPhoto);
// }

module.exports = {
    addPost,
    addComment,
};
