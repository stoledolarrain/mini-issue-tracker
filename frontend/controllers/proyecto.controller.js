const axios = require("axios");

// 0. Obtener todos los proyectos (¡La que se había borrado!)
exports.getProyectos = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    const response = await axios.get("http://localhost:3000/api/proyectos", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const proyectos = response.data;
    res.render("proyectos/index", { proyectos });
  } catch (error) {
    console.error("Error al obtener proyectos:", error.message);
    res.clearCookie("token");
    res.redirect("/login");
  }
};

// 1. Mostrar la vista del formulario
exports.getCrearProyecto = (req, res) => {
  res.render("proyectos/crear");
};

// 2. Enviar los datos a la API del Backend
exports.postCrearProyecto = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const token = req.cookies.token;

    await axios.post(
      "http://localhost:3000/api/proyectos",
      { nombre, descripcion },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    res.redirect("/proyectos");
  } catch (error) {
    console.error("Error al crear el proyecto:", error.message);
    res.render("proyectos/crear", {
      error: "No se pudo crear el proyecto. Inténtalo de nuevo.",
    });
  }
};
