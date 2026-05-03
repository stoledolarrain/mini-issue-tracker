const axios = require("axios");

exports.getTablero = async (req, res) => {
  try {
    const { proyectoId } = req.params;
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    // Pedimos los datos del proyecto y sus tickets (puedes usar tu ruta de tablero del backend)
    const response = await axios.get(
      `http://localhost:3000/api/tickets/tablero/${proyectoId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const { proyecto, tickets } = response.data;

    res.render("proyectos/tablero", { proyecto, tickets });
  } catch (error) {
    console.error("Error al cargar el tablero:", error.message);
    res.redirect("/proyectos");
  }
};
