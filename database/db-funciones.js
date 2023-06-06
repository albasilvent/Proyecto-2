// db-service (Lo podriamos ordenar mejor) (Dile a Carlos que te ayude cuando acabe los middlewares)

// Primero requerimos el get conection y lo guardamos en una variable

const { getConnection } = require("./connection.js");

const db = getConnection();

module.exports = {
    async saveUser(user) {
        const statement = `
        INSERT INTO users(id,name,surname1,surname2,email,password,birthDate,country,acceptedTOS,emailValidated)
        VALUES(?,?,?,?,?,?,?,?)
        `;
        await db.execute(statement, [
          user.id,
          user.name,
          user.surname1,
          user.surname2 || null,
          user.email,
          user.password,
          user.birthDate,
          user.country || null,
          user.acceptedTOS,
          user.emailValidated,
        ]);
      },

//getUserByEmail
//Funcion que devuelve el user segun el email

async getUserByEmail(email) {
    const statement = `
      SELECT id,name,email,emailValidated
      FROM users
      WHERE users.email = ?
    `;
    const [rows] = await db.execute(statement, [email]);

    return rows[0];
  },

//saveValidationCode (podriamos meter esta en los insert)
//Funcion que inserta el codigo validado

async saveValidationCode(code) {
    const statement = `
    INSERT INTO validation_codes(id,userId,code)
    VALUES(?,?,?)
    `;
    await db.execute(statement, [code.id, code.userId, code.code]);
  },

//getAllPosts
//Funcion que devuelve todos los posts

async getAllPosts() {
    const statement = `
    SELECT
        p.id,
        p.userId,
        p.title,
        p.description,
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
  },

//savePost (podriamos meterlo en los insert)
//Funcion que guarda el post

async savePost(post) {
    const statement = `
    INSERT INTO posts(id,userId,title,description)
    VALUES(?,?,?,?)
    `;
    await db.execute(statement, [
      post.id,
      post.userId,
      post.title,
      post.description,
    ]);
  },

//updatePost 
//Funcion para actualizar un post

async updatePost(post) {
    const statement = `
    UPDATE posts
    SET title = ?, description = ?
    WHERE id = ?
    `;
    await db.execute(statement, [post.title, post.description, post.id]);
  },

//getPostById
//Funcion que devuelve los posts segun la id

async getPostById(postId) {
    const statement = `
      SELECT *
      FROM posts as p
      WHERE p.id = ?
    `;
    const [rows] = await db.execute(statement, [postId]);

    return rows[0];
  },

//getCommentsByPostId
//Funcion que devuelve los comentarios de un post

async getCommentsByPostId(postId) {
    const statement = `
      SELECT *
      FROM post_comments as cp
      WHERE cp.postId = ?
    `;
    const [rows] = await db.execute(statement, [postId]);

    return rows;
  },

//save comment (podriamos meterlo en los insert)
//Funcion que guarda comentarios

async saveComment(postComment) {
    const statement = `
    INSERT INTO post_comments(id,userId,postId,comment)
    VALUES(?,?,?,?)
    `;
    await db.execute(statement, [
      postComment.id,
      postComment.userId,
      postComment.postId,
      postComment.comment,
    ]);
  },

//createLike (podiramos meterlo en los inserts)
//Funcion que crea un like

async createLike(like) {
    const statement = `
    INSERT INTO post_likes(id,userId,postId)
    VALUES(?,?,?)
    `;
    await db.execute(statement, [like.id, like.userId, like.postId]);
  },

//getLike
//Funcion que comprueba si un like existe

async getLike(postId, userId) {
    const statement = `
    SELECT * FROM post_likes
    WHERE postId = ? and userId = ?
    `;
    const [rows] = await db.execute(statement, [postId, userId]);
    return !!rows[0];
  },

//deleteLikeByUserId
//Funcion que borra el like

async deleteLikeByUserId(postId, userId) {
    const statement = `
    DELETE FROM post_likes
    WHERE postId = ? and userId = ?
    `;
    await db.execute(statement, [postId, userId]);
  },

//countLikesByPostId (a esto hay que cambiarle el nombre)
//Funcion que devuelve el numero de likes segun el post

async likesCountPost(postId) {
    const statement = `
    SELECT COUNT(*) as likes FROM post_likes
    WHERE postId = ?
    `;
    const [rows] = await db.execute(statement, [postId]);
    return rows[0].likes;
  },

//countCommentsByPostId (a esto hay que cambiarle el nombre)
//Funcion que devuelve el numero de comentarios segun el post

async commentsCountPost(postId) {
    const statement = `
    SELECT COUNT(*) as comments FROM post_comments
    WHERE postId = ?
    `;
    const [rows] = await db.execute(statement, [postId]);
    return rows[0].comments;
  },

//deletePost 
// Funcion que borra un post

async deletePost(postId) {
    const statement = `
    DELETE FROM posts
    WHERE id = ?
    `;
    await db.execute(statement, [postId]);
  },

//updateComment
//Funcion que edita un comentario

async updateComment(commentId, commentPayload) {
    const statement = `
    UPDATE post_comments
    SET comment = ?
    WHERE id = ?
    `;
    await db.execute(statement, [commentPayload.comment, commentId]);
  },

//deleteComment
// Funcion que borra un comentario

async deleteComment(commentId) {
    const statement = `
    DELETE FROM post_comments
    WHERE id = ?
    `;
    await db.execute(statement, [commentId]);
  },

//getCommentById
//Funcion que devuelve un comentario

async getCommentById(commentId) {
    const statement = `
    SELECT * FROM post_comments
    WHERE id = ?
    `;
    const [rows] = await db.execute(statement, [commentId]);
    return rows[0];
  },

//Funciones de fotos

async savePhoto(photo) {
    const statement = `
    INSERT INTO post_photos(id,postId,imageURL)
    VALUES(?,?,?)
    `;
    await db.execute(statement, [photo.id, photo.postId, photo.imageURL]);
  },

  async getPhotoById(photoId) {
    const statement = `
    SELECT * FROM post_photos
    WHERE id = ?
    `;
    const [rows] = await db.execute(statement, [photoId]);
    return rows[0];
  },

  async deletePhoto(photoId) {
    const statement = `
    DELETE FROM post_photos
    WHERE id = ?
    `;
    await db.execute(statement, [photoId]);
  },

  async getPhotosByPostId(postId) {
    const statement = `
      SELECT *
      FROM post_photos as pp
      WHERE pp.postId = ?
    `;
    const [rows] = await db.execute(statement, [postId]);

    return rows;
  },

//getValidationCodeByUser
//Funcion que devuelve el codigo de validacion

async getValidationCodeByUserId(userId) {
    const statement = `
      SELECT *
      FROM validation_codes
      WHERE userId = ?
    `;
    const [rows] = await db.execute(statement, [userId]);

    return rows[0];
  },

//deleteValidationCOde
//Funcion que borra el codigo de validacion

async deleteValidationCode(codeId) {
    const statement = `
      DELETE FROM validation_codes
      WHERE id = ?
    `;
    await db.execute(statement, [codeId]);
  },

//setEmailValidated
//Funcion que confirma que el email esta validado

async setEmailValidated(userId) {
    const statement = `
      UPDATE users
      SET emailValidated = true
      WHERE id = ?
    `;
    await db.execute(statement, [userId]);
  },

//searchByTerm
//Funcion que devuelve los post que coinciden con el buscador

async searchByTerm(searchTerm) {
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
  },
};