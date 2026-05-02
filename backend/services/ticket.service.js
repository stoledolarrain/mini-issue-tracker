const db = require("../models");

const ticketService = {
    // 1. Crear un ticket dentro de un proyecto
    crearTicket: async (titulo, descripcion, proyectoId, usuarioAsignadoId) => {
        return await db.ticket.create({
            titulo,
            descripcion,
            proyectoId,
            usuarioAsignadoId
        });
    },

    // 2. Listar todos los tickets de un proyecto específico
    obtenerTicketsPorProyecto: async (proyectoId) => {
        return await db.ticket.findAll({
            where: { proyectoId },
            include: [{
                model: db.usuario,
                as: 'asignadoA', // Usamos el alias que definimos en las relaciones
                attributes: ['id', 'nombre', 'email'] // No traemos el password
            }]
        });
    },

    // 3. Ver el detalle de un solo ticket
    obtenerTicketPorId: async (id) => {
        return await db.ticket.findByPk(id, {
            include: [{
                model: db.usuario,
                as: 'asignadoA',
                attributes: ['id', 'nombre', 'email']
            }]
        });
    },

    // 4. Actualizar un ticket (su estado, descripción, etc.)
    actualizarTicket: async (id, datosActualizados) => {
        const ticket = await db.ticket.findByPk(id);
        if (ticket) {
            // .update() aplica los cambios que vengan en "datosActualizados"
            return await ticket.update(datosActualizados); 
        }
        return null;
    }
};

module.exports = ticketService;