const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyecto.controller");
const ticketController = require("../controllers/ticket.controller");

// Al estar montado sobre '/proyectos' en el index de rutas,
// esta ruta realmente es 'GET /proyectos'
router.get("/", proyectoController.getProyectos);
router.get("/tablero/:proyectoId", ticketController.getTablero);

module.exports = router;
