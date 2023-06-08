//Funcion que permite buscar un post
//Esta funcion es lo mismo que searchByTerm, asi que no se si podriamos eliminarla

const { searchByTerm } = require("../database/funciones/post.js");

async function search({ search }) {
    const post = await searchByTerm(search);
    return post;
}

module.exports = {
    search,
};
