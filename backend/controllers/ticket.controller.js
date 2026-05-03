const ticketService = require("../services/ticket.service");
const userService = require("../services/user.service");
// IMPORTANTE: Importamos el modelo Proyecto para la Regla 2
const { proyecto } = require("../models");

const crearTicket = async (req, res) => {
  try {
    const { titulo, descripcion, proyectoId, usuarioAsignadoId } = req.body;

    // Nota: Como ya tienes Joi configurado, esta validación manual aquí
    // es un poco redundante, pero no hace daño dejarla por doble seguridad.
    if (!titulo || !descripcion || !proyectoId) {
      return res.status(400).json({
        message: "El título, descripción y proyectoId son obligatorios",
      });
    }

    const nuevoTicket = await ticketService.crearTicket(
      titulo,
      descripcion,
      proyectoId,
      usuarioAsignadoId,
    );
    res
      .status(201)
      .json({ message: "Ticket creado exitosamente", ticket: nuevoTicket });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el ticket", error: error.message });
  }
};

const getTicketsPorProyecto = async (req, res) => {
  try {
    const { proyectoId } = req.params;
    const tickets = await ticketService.obtenerTicketsPorProyecto(proyectoId);
    res.status(200).json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los tickets", error: error.message });
  }
};

const getTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await ticketService.obtenerTicketPorId(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el ticket", error: error.message });
  }
};

const actualizarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    // 1. Buscamos el ticket actual para saber su estado antes de modificarlo
    const ticketActual = await ticketService.obtenerTicketPorId(id);
    if (!ticketActual) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    // ==========================================
    // REGLA DE NEGOCIO 1: SALTOS DE ESTADO PROHIBIDOS
    // ==========================================
    if (
      datosActualizados.estado &&
      datosActualizados.estado !== ticketActual.estado
    ) {
      const estados = { Pendiente: 1, "En Progreso": 2, Completado: 3 };
      const nivelActual = estados[ticketActual.estado];
      const nivelNuevo = estados[datosActualizados.estado];

      if (Math.abs(nivelNuevo - nivelActual) > 1) {
        return res.status(400).json({
          message: `Movimiento no permitido: No se puede pasar de '${ticketActual.estado}' a '${datosActualizados.estado}' directamente.`,
        });
      }
    }

    // Guardamos temporalmente quién es el responsable (el que ya estaba, o el nuevo)
    let usuarioAsignadoFinalId = ticketActual.usuarioAsignadoId;

    // ==========================================
    // REGLA DE NEGOCIO 2: USUARIO DEBE PERTENECER AL PROYECTO
    // ==========================================
    if (datosActualizados.emailAsignado) {
      const usuario = await userService.findUserByEmail(
        datosActualizados.emailAsignado,
      );

      if (!usuario) {
        return res.status(404).json({
          message: "No se encontró ningún usuario con ese correo electrónico",
        });
      }

      // --- AQUÍ ESTÁ EL CAMBIO ---
      // Usamos 'proyecto' (en minúscula) porque así lo exportaste en models/index.js
      // Y guardamos el resultado en 'proyectoBD'
      const proyectoBD = await proyecto.findByPk(ticketActual.proyectoId);

      // Verificamos si el proyecto tiene a este usuario asignado
      const perteneceAlProyecto = await proyectoBD.hasUsuario(usuario);

      if (!perteneceAlProyecto) {
        return res.status(403).json({
          message:
            "El usuario existe en el sistema, pero NO es miembro de este proyecto.",
        });
      }

      usuarioAsignadoFinalId = usuario.id;
      datosActualizados.usuarioAsignadoId = usuario.id;
      delete datosActualizados.emailAsignado;
    }

    // ==========================================
    // REGLA DE NEGOCIO 3: NO INICIAR SIN RESPONSABLE
    // ==========================================
    const estadoFinal = datosActualizados.estado || ticketActual.estado;
    if (estadoFinal === "En Progreso" && !usuarioAsignadoFinalId) {
      return res.status(400).json({
        message:
          "No se puede pasar a 'En Progreso' sin tener un responsable asignado al ticket.",
      });
    }

    // Si pasó todas las pruebas, actualizamos en la BD
    const ticketActualizado = await ticketService.actualizarTicket(
      id,
      datosActualizados,
    );

    res.status(200).json({
      message: "Ticket actualizado cumpliendo reglas",
      ticket: ticketActualizado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el ticket", error: error.message });
  }
};

const getTablero = async (req, res) => {
  try {
    const { proyectoId } = req.params;
    const tickets = await ticketService.obtenerTicketsPorProyecto(proyectoId);

    const tablero = {
      pendientes: tickets.filter((t) => t.estado === "Pendiente"),
      enProgreso: tickets.filter((t) => t.estado === "En Progreso"),
      completados: tickets.filter((t) => t.estado === "Completado"),
    };

    res.status(200).json(tablero);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al generar el tablero", error: error.message });
  }
};

module.exports = {
  crearTicket,
  getTicketsPorProyecto,
  getTicket,
  actualizarTicket,
  getTablero,
};
