// Crear todas las tablas en una funcion.
// function creartablas(pool){
// todas las pool.query pool.query

const createTables = async (pool) => {
    await pool.query(`
      CREATE TABLE users(
          id CHAR(36) PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          surname1 VARCHAR(150) NOT NULL,
          surname2 VARCHAR(150),
          email VARCHAR(150) NOT NULL UNIQUE,
          password VARCHAR(150) NOT NULL,
          birthDate DATE NOT NULL,
          country VARCHAR(150),
          acceptedTOS BOOL NOT NULL,
          emailValidated BOOL DEFAULT false,
          admin BOOL DEFAULT false
      )`);

    await pool.query(`
      CREATE TABLE posts(
          id CHAR(36) PRIMARY KEY,
          title VARCHAR(150) NOT NULL,
          description TEXT NOT NULL UNIQUE,
          userId CHAR(36) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )`);

    await pool.query(`
      CREATE TABLE post_likes(
          id CHAR(36) PRIMARY KEY,
          userId CHAR(36) NOT NULL,
          postId CHAR(36) NOT NULL,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
      )`);

    await pool.query(`
      CREATE TABLE post_comments(
          id CHAR(36) PRIMARY KEY,
          userId CHAR(36) NOT NULL,
          postId CHAR(36) NOT NULL,
          comment VARCHAR(300) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
      )`);

    await pool.query(`
      CREATE TABLE post_photos(
          id CHAR(36) PRIMARY KEY,
          postId CHAR(36) NOT NULL,
          imageURL VARCHAR(300) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
      )`);
      
    await pool.query(`
      CREATE TABLE validation_codes(
          id CHAR(36) PRIMARY KEY,
          userId CHAR(36) NOT NULL,
          code CHAR(8) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )`);
  }