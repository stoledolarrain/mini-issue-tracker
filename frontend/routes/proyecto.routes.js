const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyecto.controller");
const ticketController = require("../controllers/ticket.controller");

// 1. Ruta para la lista de proyectos
router.get("/", proyectoController.getProyectos);

// 2. Rutas estáticas (Siempre deben ir ANTES de las rutas con dos puntos ":")
router.get("/crear", proyectoController.getCrearProyecto);
router.post("/crear", proyectoController.postCrearProyecto);

// 3. Rutas dinámicas (Van al final para que no confundan otras URLs)
router.get("/:proyectoId/tablero", ticketController.getTablero);

// Rutas para Tickets dentro de un Proyecto
router.get("/:proyectoId/tickets/crear", ticketController.getCrearTicket);
router.post("/:proyectoId/tickets/crear", ticketController.postCrearTicket);

// Rutas para Editar Tickets
router.get(
  "/:proyectoId/tickets/:ticketId/editar",
  ticketController.getEditarTicket,
);
router.post(
  "/:proyectoId/tickets/:ticketId/editar",
  ticketController.postEditarTicket,
);
// Ruta para Eliminar Tickets
router.post(
  "/:proyectoId/tickets/:ticketId/eliminar",
  ticketController.postEliminarTicket,
);

module.exports = router;
