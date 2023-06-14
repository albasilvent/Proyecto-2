const { generateUUID } = require("../services/crypto");
const { saveComment } = require("../database/funciones/comment");
const { getPostById, savePost } = require("../database/funciones/post");
const { notFound } = require("../services/errors");
const { processUploadedPostPhoto } = require("../services/images");

//addPost
//Funcion que añade un post
async function addPost(currentUserId, postPayload) {
    const post = {
        title: postPayload.title,
        description: postPayload.description,
        photo1: await processUploadedPostPhoto(currentUserId, postPayload.photo1),
        photo2: await processUploadedPostPhoto(currentUserId, postPayload.photo2),
        photo3: await processUploadedPostPhoto(currentUserId, postPayload.photo3),
        userId: currentUserId,
        id: generateUUID(),
    };

    await savePost(post);
}

//addComment
//Funcion que añade un comentario
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

module.exports = {
    addPost,
    addComment,
};
