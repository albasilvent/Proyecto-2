//Funcion que devuelve todos los post
//Esta funcion es lo mismo que db-funciones GETALLPOST ,asi que no se si podriamos eliminarla

const { getAllPost } = require("../database/funciones/post");

async function listPosts() {
    return await getAllPost();
}

module.exports = {
    listPosts,
};
