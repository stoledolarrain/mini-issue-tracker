const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const port = 4000;

// Configuración de motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Cargamos las rutas (Igual que en tu proyecto anterior, pero sin 'db')
require("./routes")(app);

app.listen(port, () => {
  console.log(`Servidor Frontend escuchando en puerto ${port}`);
});
