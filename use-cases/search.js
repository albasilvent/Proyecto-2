//Funcion que permite buscar un post
//Esta funcion es lo mismo que searchByTerm, asi que no se si podriamos eliminarla

const { searchByTerm } = require("./database/funciones/post.js");

module.exports = async ({ searchByTerm, searchTerm}) => {
    const post = await dbFunction.searchByTerm(searchTerm);
    return post;
};