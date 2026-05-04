const authRoutes = require("./auth.routes");
const proyectoRoutes = require("./proyecto.routes");
const ticketRoutes = require("./ticket.routes");
const usuarioRoutes = require("./usuario.routes");

module.exports = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/proyectos", proyectoRoutes);
  app.use("/api/tickets", ticketRoutes);
  app.use("/api/usuarios", usuarioRoutes);
};
