const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
const requireAuth = require("../middlewares/auth.middleware");

const {
  crearTicketSchema,
  actualizarTicketSchema,
} = require("../validators/ticket.schema");
const schemaValidation = require("../middlewares/schemaValidation.middleware");
const {
  isJsonRequestValid,
} = require("../middlewares/isJsonRequestValid.middleware");

router.use(requireAuth);

router.post(
  "/",
  isJsonRequestValid,
  schemaValidation(crearTicketSchema),
  ticketController.crearTicket,
);
router.get("/proyecto/:proyectoId", ticketController.getTicketsPorProyecto);
router.get("/:id", ticketController.getTicket);
router.put(
  "/:id",
  isJsonRequestValid,
  schemaValidation(actualizarTicketSchema),
  ticketController.actualizarTicket,
);
router.get("/tablero/:proyectoId", ticketController.getTablero);

router.delete("/:id", ticketController.eliminarTicket);

module.exports = router;
