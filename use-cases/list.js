//Funcion que devuelve todos los post
//Esta funcion es lo mismo que db-funciones GETALLPOST ,asi que no se si podriamos eliminarla

const { getAllPosts } = require("../database/funciones/post.js");
const { getAllUsers } = require("../database/funciones/users.js");

async function listPosts() {
    return await getAllPosts();
}

async function listUsers() {
    return await getAllUsers();
}

module.exports = {
    listPosts,
    listUsers,
};
