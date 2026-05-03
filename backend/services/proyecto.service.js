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
    return await db.proyecto.findAll({
      include: [
        {
          model: db.usuario,
          where: { id: usuarioId },
          attributes: ["id", "nombre", "email"],
        },
      ],
    });
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
