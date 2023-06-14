const {
    getCommentById,
    updateComment,
} = require("../database/funciones/comment");
const { updateUser, getUserByEmail} = require("../database/funciones/users");
const { getPostById } = require("../database/funciones/post");
const { notFound, unauthorizedUser } = require("../services/errors");

//Editar los datos de usuario
async function editUser(userEmail, userPayload) {
    const user = await getUserByEmail(userEmail);
    if (!user) {
        notFound();
    }

    if (user.email != userEmail) {
        unauthorizedUser();
    }

    const updatedUser = {
        ...user,
        name: userPayload.name,
        surname1: userPayload.surname1,
        surname2: userPayload.surname2,
        country: userPayload.country
    };
    
    await updateUser(updatedUser);
}

//Editar un post
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
        photo2: postPayload.photo2,
        photo3: postPayload.photo3
    };

    await updatePost(updatedPost);
}

//Editar un comentario
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
    editUser,
    editPost,
    editComment,
};
