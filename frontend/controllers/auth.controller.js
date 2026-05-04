const axios = require("axios");

// Muestra la vista de registro
exports.getRegister = (req, res) => {
  res.render("auth/register", { error: null });
};

// Procesa los datos del formulario de registro
exports.postRegister = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Llamamos al endpoint del Backend (puerto 3000)
    await axios.post("http://localhost:3000/api/auth/register", {
      nombre,
      email,
      password,
    });

    // Si tiene éxito, redirigimos al login
    res.redirect("/login");
  } catch (error) {
    const mensajeError = error.response
      ? error.response.data.message
      : "Error al registrar el usuario";
    res.render("auth/register", { error: mensajeError });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await axios.post("http://localhost:3000/api/auth/login", {
      email,
      password,
    });

    const token = response.data.token;
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/proyectos");
  } catch (error) {
    const mensajeError = error.response
      ? error.response.data.message
      : "Error al conectar con el servidor";
    res.render("auth/login", { error: mensajeError });
  }
};

exports.getLogout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
