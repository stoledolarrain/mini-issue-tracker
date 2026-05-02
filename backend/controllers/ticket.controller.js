const ticketService = require("../services/ticket.service");
const userService = require("../services/user.service");

const crearTicket = async (req, res) => {
  try {
    // Recibimos los datos desde el body en Postman
    const { titulo, descripcion, proyectoId, usuarioAsignadoId } = req.body;

    // Pequeña validación para asegurar que no falten datos clave
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
    // El ID del proyecto vendrá en la URL (ej: /api/tickets/proyecto/5)
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
    // El ID del ticket vendrá en la URL (ej: /api/tickets/1)
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

    // --- TU LÓGICA DE ASIGNAR POR EMAIL ---
    if (datosActualizados.emailAsignado) {
      // Buscamos si existe un usuario con ese correo
      const usuario = await userService.findUserByEmail(
        datosActualizados.emailAsignado,
      );

      if (!usuario) {
        return res.status(404).json({
          message: "No se encontró ningún usuario con ese correo electrónico",
        });
      }

      // Si lo encuentra, sacamos su ID y lo agregamos a los datos a guardar
      datosActualizados.usuarioAsignadoId = usuario.id;

      // Borramos el email temporal porque la base de datos solo guarda el ID
      delete datosActualizados.emailAsignado;
    }
    // ---------------------------------------

    const ticketActualizado = await ticketService.actualizarTicket(
      id,
      datosActualizados,
    );

    if (!ticketActualizado) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Ticket actualizado", ticket: ticketActualizado });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el ticket", error: error.message });
  }
};

const getTablero = async (req, res) => {
  try {
    const { proyectoId } = req.params;
    // Reutilizamos el servicio que ya tienes para traer todos los tickets
    const tickets = await ticketService.obtenerTicketsPorProyecto(proyectoId);

    // Agrupamos los tickets por estado
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
