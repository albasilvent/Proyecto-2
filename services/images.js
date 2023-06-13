//Todas las funciones sobre las imagenes de los post y sus rutas
const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const {generateUUID} = require("../services/crypto");

//processUploadedPostPhoto
//Funcion que guarda el archivo en el disco
async function processUploadedPostPhoto(postPayload) {
const directory = path.join(__dirname, "../public/photos", postPayload.userId);  //Directorio donde guardamos la foto
await fs.mkdir(directory, {  //Asegurarse de que el directorio exista
    recursive: true,
  });
//Ponerle un fileName, que será el nombre final del archivo nuevo
const fileName = generateUUID() + ".webp";
//Crear la ruta absoluta al archivo
const filePath  = path.join(directory, fileName);
//Procesar el archivo (sharp) y escribirlo
const sharpProcess = await sharp(postPayload.photo1);
    const metadata = await sharpProcess.metadata();

    if (metadata.width > 500) {
      sharpProcess.resize(500);
    }

    sharpProcess.webp().toFile(filePath);
//generar URL del archivo para express
const fileURL = `/photos/${postPayload.userId}/${fileName}`;


// if (postPayload.photo2){
//   const fileName2 = postPayload.photo2 + ".webp";
//   const filePath2 = path.join(directory, fileName2);
// }

// if (postPayload.photo2){
//   const fileName3 = postPayload.photo3 + ".webp";
//   const filePath3 = path.join(directory, fileName3);
// }

return fileURL;
}

//Funcion para borrar fotos
async function deletePhoto(dbPhoto) {
  const directory = path.join(__dirname, "../public");
  
  const filePath = path.join(directory, dbPhoto.imageURL);
  await fs.unlink(filePath);
}


module.exports= {
  processUploadedPostPhoto,
  deletePhoto
};