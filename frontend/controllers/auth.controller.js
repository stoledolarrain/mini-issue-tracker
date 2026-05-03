const axios = require("axios");

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
}; // <-- Esta llave cierra postLogin correctamente

// Ahora getLogout está en el nivel principal del archivo
exports.getLogout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
