const { getConnection } = require("../connection.js");

const db = getConnection();

async function saveUser(user) {
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

async function getAllUsers() {
    const statement = `SELECT id,name,surname1,surname2,email,password,birthDate,country,acceptedTOS,emailValidated
    FROM users`;
    const [rows] = await db.execute(statement);
    return rows;
}

module.exports = {
    saveUser,
    getUserByEmail,
    getAllUsers,
};
