const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyecto.controller");
const ticketController = require("../controllers/ticket.controller");

router.get("/", proyectoController.getProyectos);

router.get("/crear", proyectoController.getCrearProyecto);
router.post("/crear", proyectoController.postCrearProyecto);

router.get("/:proyectoId/tablero", ticketController.getTablero);

router.get("/:proyectoId/tickets/crear", ticketController.getCrearTicket);
router.post("/:proyectoId/tickets/crear", ticketController.postCrearTicket);

router.get(
  "/:proyectoId/tickets/:ticketId/editar",
  ticketController.getEditarTicket,
);
router.post(
  "/:proyectoId/tickets/:ticketId/editar",
  ticketController.postEditarTicket,
);
router.post(
  "/:proyectoId/tickets/:ticketId/eliminar",
  ticketController.postEliminarTicket,
);

module.exports = router;
