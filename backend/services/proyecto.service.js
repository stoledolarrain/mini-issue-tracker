const db = require("../models");

const proyectoService = {
  crearProyecto: async (nombre, descripcion, usuarioId) => {
    const nuevoProyecto = await db.proyecto.create({
      nombre,
      descripcion,
    });
    await nuevoProyecto.addUsuario(usuarioId);
    return nuevoProyecto;
  },

  obtenerProyectosDeUsuario: async (usuarioId) => {
    // 1. Proyectos donde el usuario es creador / miembro (Tu consulta original)
    const proyectosComoMiembro = await db.proyecto.findAll({
      include: [
        {
          model: db.usuario,
          where: { id: usuarioId },
          attributes: ["id", "nombre", "email"],
        },
      ],
    });

    // 2. Proyectos donde el usuario tiene tickets asignados
    // Buscamos proyectos que incluyan al menos un ticket con el ID de este usuario
    const proyectosPorTickets = await db.proyecto.findAll({
      include: [
        {
          model: db.ticket,
          where: { usuarioAsignadoId: usuarioId },
          attributes: [], // No necesitamos los detalles del ticket aquí, solo filtrar el proyecto
        },
      ],
    });

    // 3. Unimos ambas listas y eliminamos los proyectos duplicados
    const proyectosUnicos = [];
    const idsVistos = new Set();

    const todosLosProyectos = [...proyectosComoMiembro, ...proyectosPorTickets];

    for (const p of todosLosProyectos) {
      if (!idsVistos.has(p.id)) {
        idsVistos.add(p.id);
        proyectosUnicos.push(p);
      }
    }

    return proyectosUnicos;
  },

  obtenerProyectoPorId: async (id) => {
    return await db.proyecto.findByPk(id, {
      include: [
        {
          model: db.usuario,
          attributes: ["id", "nombre", "email"],
        },
      ],
    });
  },

  actualizarProyecto: async (id, nombre, descripcion) => {
    const proyecto = await db.proyecto.findByPk(id);
    if (proyecto) {
      proyecto.nombre = nombre;
      proyecto.descripcion = descripcion;
      return await proyecto.save();
    }
    return null;
  },
};

module.exports = proyectoService;
