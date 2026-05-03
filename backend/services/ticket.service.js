const db = require("../models");

const ticketService = {
  crearTicket: async (titulo, descripcion, proyectoId, usuarioAsignadoId) => {
    return await db.ticket.create({
      titulo,
      descripcion,
      proyectoId,
      usuarioAsignadoId,
    });
  },

  obtenerTicketsPorProyecto: async (proyectoId) => {
    return await db.ticket.findAll({
      where: { proyectoId },
      include: [
        {
          model: db.usuario,
          as: "asignadoA",
          attributes: ["id", "nombre", "email"],
        },
      ],
    });
  },

  obtenerTicketPorId: async (id) => {
    return await db.ticket.findByPk(id, {
      include: [
        {
          model: db.usuario,
          as: "asignadoA",
          attributes: ["id", "nombre", "email"],
        },
      ],
    });
  },

  actualizarTicket: async (id, datosActualizados) => {
    const ticket = await db.ticket.findByPk(id);
    if (ticket) {
      return await ticket.update(datosActualizados);
    }
    return null;
  },
};

module.exports = ticketService;
