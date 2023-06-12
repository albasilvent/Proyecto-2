const { getConnection } = require("../connection.js");

const db = getConnection();

async function saveUser(user) {
    const statement = `
    INSERT INTO users(id,name,surname1,surname2,email,password,birthDate,country,acceptedTOS,emailValidated)
    VALUES(?,?,?,?,?,?,?,?,?,?)
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
}

//getUserByEmail
//Funcion que devuelve el user segun el email

async function getUserByEmail(email) {
    const statement = `
      SELECT id,name,email,emailValidated
      FROM users
      WHERE users.email = ?
    `;
    const [rows] = await db.execute(statement, [email]);

    return rows[0];
}

//getPostById
//Funcion que devuelve los posts segun la id
async function getUserById(userId) {
    const statement = `
      SELECT *
      FROM users as u
      WHERE u.id = ?
    `;
    const [rows] = await db.execute(statement, [userId]);

    return rows[0];
}

async function getPassword(email){
    const statement = `
      SELECT password
      FROM users
      WHERE users.email = ?
    `;
    const [rows] = await db.execute(statement, [email]);

    return rows[0];
}

async function getAllUsers() {
    const statement = `SELECT id,name,surname1,surname2,email,birthDate,country
    FROM users`;
    const [rows] = await db.execute(statement);
    return rows;
}

//updateUsers
//Funcion para modificar un user
async function updateUser(user) {
    const statement = `
    UPDATE users
    SET name = ?, surname1 = ?, surname2 = ?, country = ?
    WHERE id = ?
    `;
    await db.execute(statement, [user.name, user.surname1, user.surname2, user.country, user.id]); // Para las fotos 2 y 3, pasar valor nulo para borrarlas
}

module.exports = {
    saveUser,
    getUserByEmail,
    getUserById,
    getPassword,
    getAllUsers,
    updateUser
};
