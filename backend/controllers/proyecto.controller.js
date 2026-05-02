const proyectoService = require("../services/proyecto.service");

// 1. Crear Proyecto
exports.postCrearProyecto = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    // Sacamos el ID del usuario que hizo la petición (viene del token)
    const usuarioId = req.user.id;

    const nuevoProyecto = await proyectoService.crearProyecto(
      nombre,
      descripcion,
      usuarioId,
    );
    res
      .status(201)
      .json({
        message: "Proyecto creado exitosamente",
        proyecto: nuevoProyecto,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el proyecto", error: error.message });
  }
};

// 2. Listar Proyectos
exports.getProyectos = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const proyectos =
      await proyectoService.obtenerProyectosDeUsuario(usuarioId);
    res.status(200).json(proyectos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener proyectos", error: error.message });
  }
};

// 3. Ver detalle de un proyecto
exports.getProyectoById = async (req, res) => {
  try {
    const { id } = req.params;
    const proyecto = await proyectoService.obtenerProyectoPorId(id);

    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.status(200).json(proyecto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar el proyecto", error: error.message });
  }
};

// 4. Actualizar Proyecto
exports.putActualizarProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const proyectoEditado = await proyectoService.actualizarProyecto(
      id,
      nombre,
      descripcion,
    );

    if (!proyectoEditado) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Proyecto actualizado", proyecto: proyectoEditado });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el proyecto",
        error: error.message,
      });
  }
};
