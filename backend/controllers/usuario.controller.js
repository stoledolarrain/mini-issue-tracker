const { usuario } = require("../models");

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuario.findAll({
      attributes: ["id", "nombre", "email"],
    });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error.message);
    res.status(500).json({ message: "Error interno al obtener usuarios" });
  }
};
