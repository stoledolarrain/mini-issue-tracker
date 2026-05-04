// Importamos tu modelo tal como lo tenías
const { usuario } = require("../models");

exports.getUsuarios = async (req, res) => {
  try {
    // ¡AQUÍ ESTABA EL CAMBIO! Usamos 'usuario.findAll' en lugar de 'User.findAll'
    const usuarios = await usuario.findAll({
      attributes: ["id", "nombre", "email"],
    });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error.message);
    res.status(500).json({ message: "Error interno al obtener usuarios" });
  }
};
