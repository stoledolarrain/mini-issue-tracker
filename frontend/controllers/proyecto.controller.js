const axios = require("axios");

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

exports.getCrearProyecto = (req, res) => {
  res.render("proyectos/crear", { error: null, datos: {} });
};

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
    const mensajeError =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "No se pudo crear el proyecto. Verifica los campos.";

    console.error("Error al crear el proyecto:", mensajeError);

    // Volvemos a renderizar la vista pasándole el error y lo que el usuario ya había escrito
    res.render("proyectos/crear", {
      error: mensajeError,
      datos: req.body, // Aquí viajan el nombre y descripción que intentó guardar
    });
  }
};
