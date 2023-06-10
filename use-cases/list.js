//Funcion que devuelve todos los post
//Esta funcion es lo mismo que db-funciones GETALLPOST ,asi que no se si podriamos eliminarla

const { getAllPosts } = require("../database/funciones/post.js");

async function listPosts() {
    return await getAllPosts();
}

module.exports = {
    listPosts,
};
