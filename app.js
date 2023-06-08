//Iniciamos la app
//Ponemos el listen
//Usamos validate token y indexRouter
//El resto no se que es, tengo que mirarlo
require("dotenv").config();
const path = require("path");
const express = require("express");
const indexRouter = require("./routes/index-router.js");
const validateToken = require("./middlewares/validate-token.js");
const sendError = require("./utils/send-error.js");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server iniciado en el puerto ${PORT}...`);
});

app.use(
    cors({
        origin: ["https://photoDrop.es", "http://localhost:5500"],
    })
);

app.use(validateToken);
app.use(indexRouter);

const staticDirectory = path.join(__dirname, "../public");
app.use(express.static(staticDirectory));

app.use((err, req, res, next) => {
    console.error(err);
    sendError(res, err);
});

app.use((req, res, next) => {
    sendError(res, {
        status: 404,
        code: "UNKNOWN_ENDPOINT",
        message: `Endpoint desconocido: ${req.method} ${req.path}`,
    });
});
