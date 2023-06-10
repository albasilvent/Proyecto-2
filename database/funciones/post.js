const { getConnection } = require("../connection.js");

const db = getConnection();

//getAllPosts
//Funcion que devuelve todos los posts
async function getAllPosts() {
    const statement = `
    SELECT
        p.id,
        p.userId,
        p.title,
        p.description,
        p.photo1,
        p.photo2,
        p.photo3,
        COALESCE(l.like_count, 0) AS likes,
        COALESCE(c.comment_count, 0) as comments,
        (
            SELECT imageURL
            FROM post_photos
            WHERE postId = p.id
            ORDER BY id ASC
            LIMIT 1
        ) as mainImage
    FROM
        posts p
        LEFT JOIN (
            SELECT postId, COUNT(*) AS like_count
            FROM post_likes
            GROUP BY postId
        ) l ON p.id = l.postId
        LEFT JOIN (
            SELECT postId, COUNT(*) AS comment_count
            FROM post_comments
            GROUP BY postId
        ) c ON p.id = c.postId
    `;
    const [rows] = await db.execute(statement);
    return rows;
}

//savePost (podriamos meterlo en los insert)
//Funcion que guarda el post
async function savePost(post) {
    const statement = `
    INSERT INTO posts(id,userId,title,description)
    VALUES(?,?,?,?)
    `;
    await db.execute(statement, [
        post.id,
        post.userId,
        post.title,
        post.description,
        post.photo1,
        post.photo2 || null ,
        post.photo3 || null
    ]);
}

//updatePost
//Funcion para modificar un post
async function updatePost(post) {
    const statement = `
    UPDATE posts
    SET title = ?, description = ?, photo2 = ?, photo3 = ?
    WHERE id = ?
    `;
    await db.execute(statement, [post.title, post.description, post.id, post.photo2, post.photo3]);
}

//getPostById
//Funcion que devuelve los posts segun la id
async function getPostById(postId) {
    const statement = `
      SELECT *
      FROM posts as p
      WHERE p.id = ?
    `;
    const [rows] = await db.execute(statement, [postId]);

    return rows[0];
}

//deletePost
// Funcion que borra un post
async function deletePost(postId) {
    const statement = `
    DELETE FROM posts
    WHERE id = ?
    `;
    await db.execute(statement, [postId]);
}

//searchByTerm
//Funcion que devuelve los post que coinciden con el buscador
async function searchByTerm(searchTerm) {
    const likeTerm = `%${searchTerm}%`;
    const statement = `
      SELECT * FROM posts
      WHERE 
        title LIKE ? 
      OR
        description LIKE ?
    `;
    const [rows] = await db.execute(statement, [likeTerm, likeTerm]);
    return rows;
}

module.exports = {
    getAllPosts,
    savePost,
    updatePost,
    getPostById,
    deletePost,
    searchByTerm
};
