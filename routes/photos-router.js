//SE PODRIA BORRAR ?????????????

// const { Router } = require("express");
// const { authGuard } = require("../middlewares/auth-guard");
// const fileUpload = require("express-fileupload");
// const { handleAsyncError } = require("../services/errors");
// const { addPhoto } = require("../use-cases/add");
// const { removePhoto } = require("../use-cases/remove");
// const { sendResponse } = require("../services/response");
// const router = Router();

// // post "/posts/:id/photos"
// //Agregar una nueva foto ????????????
// router.post(
//     "/posts/:id/photos",
//     authGuard,
//     fileUpload(),
//     handleAsyncError(async (req, res) => {
//         //Agregar una nueva foto al post con id req.params.id
//         await addPhoto(req.params.id, req.currentUser.id, req.files.photo);

//         sendResponse(res);
//     })
// );
// // delete "/posts/:id/photos/:photoId"
// // Eliminar la foto ??????????????
// router.delete(
//     "/posts/:id/photos/:photoId",
//     authGuard,
//     handleAsyncError(async (req, res) => {
//         //Eliminar la foto con id req.params.photoId del post con id req.params.id
//         await removePhoto(
//             req.params.id,
//             req.params.photoId,
//             req.currentUser.id
//         );
//         sendResponse(res);
//     })
// );

// module.exports = router;
