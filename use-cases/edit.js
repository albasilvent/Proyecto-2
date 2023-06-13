const {
    getCommentById,
    updateComment,
} = require("../database/funciones/comment");
const { updateUser, getUserByEmail} = require("../database/funciones/users");
const { getPostById } = require("../database/funciones/post");
const { notFound, unauthorizedUser } = require("../services/errors");

//EDITAR POSTS
//Funcion que obtiene el post segun su id (db-funciones GETPOSTBYID)
//si el post no existe, lanza error 404
// SI el id del usuario del post no coincide con el id del usuario,lanza error
//Si esta todo correcto, edita el post (titulo, foto y descripcion)

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
    editUser,
    editPost,
    editComment,
};
