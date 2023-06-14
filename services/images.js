//Todas las funciones sobre las imagenes de los post y sus rutas
const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const {generateUUID} = require("../services/crypto");

//processUploadedPostPhoto.
async function processUploadedPostPhoto(userId, postPayload) {
  const directory = path.join(__dirname, "../public/photos", userId); // Directorio donde se guarda la foto

  try {
    await fs.mkdir(directory, { recursive: true }); // Asegurarse de que el directorio exista

    // Establecer un fileName, que será el nombre final del archivo nuevo
    const fileName = generateUUID() + ".webp";

    // Crear la ruta absoluta al archivo
    const filePath = path.join(directory, fileName);

    // Procesar el archivo con sharp y guardarlo en disco
    const sharpProcess = sharp(postPayload.photo1);
    const metadata = await sharpProcess.metadata();

    if (metadata.width > 500) {
      sharpProcess.resize(500);
    }

    await sharpProcess.webp().toFile(filePath);

    // Generar la URL del archivo para Express
    const fileURL = `/photos/${userId}/${fileName}`;
    
    return fileURL;
  } catch (error) {
    // Manejo de errores si ocurre algún problema durante el proceso
    console.error("Error al procesar la foto:", error);
    throw error;
  }
}


module.exports= {
  processUploadedPostPhoto,
};