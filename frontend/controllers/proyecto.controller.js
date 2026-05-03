const axios = require("axios");

exports.getProyectos = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/login");
    }
    const response = await axios.get("http://localhost:3000/api/proyectos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const proyectos = response.data;
    res.render("proyectos/index", { proyectos });
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.clearCookie("token");
    res.redirect("/login");
  }
};
