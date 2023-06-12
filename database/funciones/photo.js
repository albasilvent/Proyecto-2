//Funciones de fotos
//SE PUEDE BORRAR ESTA CARPETA ??????????????


const { getConnection } = require("../connection.js");

const db = getConnection();



async function savePhoto(photo) {
    const statement = `
    INSERT INTO post_photos(id,postId,imageURL)
    VALUES(?,?,?)
    `;
    await db.execute(statement, [photo.id, photo.postId, photo.imageURL]);
}

async function getPhotoById(photoId) {
    const statement = `
    SELECT * FROM post_photos
    WHERE id = ?
    `;
    const [rows] = await db.execute(statement, [photoId]);
    return rows[0];
}

async function deletePhoto(photoId) {
    const statement = `
    DELETE FROM post_photos
    WHERE id = ?
    `;
    await db.execute(statement, [photoId]);
}

async function getPhotosByPostId(postId) {
    const statement = `
      SELECT *
      FROM post_photos as pp
      WHERE pp.postId = ?
    `;
    const [rows] = await db.execute(statement, [postId]);

    return rows;
}

module.exports= {
    savePhoto,
    getPhotoById,
    deletePhoto,
    getPhotosByPostId
}
