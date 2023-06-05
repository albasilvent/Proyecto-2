//Todas las funciones sobre las imagenes de los post y sus rutas
const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
module.exports = {
//processUploadedPostPhoto
//Funcion que guarda el archivo en el disco
async processUploadedPostPhoto(postId, photoId, photoFile) {
//Directorio donde guardamos la foto
const directory = path.join(__dirname, "../../public/photos", postId);
//Asegurarse de que el directorio exista
await fs.mkdir(directory, {
    recursive: true,
  });
//Ponerle un fileName, que será el nombre final del archivo nuevo
const fileName = photoId + ".webp";
//Crear la ruta absoluta al archivo
const filePath = path.join(directory, fileName);
//Procesar el archivo (sharp) y escribirlo
const sharpProcess = await sharp(photoFile.data);
    const metadata = await sharpProcess.metadata();

    if (metadata.width > 1080) {
      sharpProcess.resize(720);
    }
    sharpProcess.webp().toFile(filePath);
//generar URL del archivo para express
const fileURL = `/photos/${postId}/${fileName}`;

return fileURL;
},
};