const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
// Importamos tu guardia de seguridad (¡Porque solo usuarios logueados pueden ver tickets!)
const requireAuth = require("../middlewares/auth.middleware");

// Todas las rutas de tickets estarán protegidas
router.use(requireAuth);

// Crear un ticket (POST /api/tickets)
router.post("/", ticketController.crearTicket);

// Listar todos los tickets de un proyecto específico (GET /api/tickets/proyecto/:proyectoId)
router.get("/proyecto/:proyectoId", ticketController.getTicketsPorProyecto);

// Ver el detalle de un ticket específico (GET /api/tickets/:id)
router.get("/:id", ticketController.getTicket);

// Actualizar un ticket (PUT /api/tickets/:id)
router.put("/:id", ticketController.actualizarTicket);

// Ver el tablero de un proyecto específico (GET /api/tickets/tablero/:proyectoId)
router.get("/tablero/:proyectoId", ticketController.getTablero);

module.exports = router;
