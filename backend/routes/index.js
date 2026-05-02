const authRoutes = require("./auth.routes");
const proyectoRoutes = require("./proyecto.routes");
const ticketRoutes = require("./ticket.routes");

module.exports = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/proyectos", proyectoRoutes);
  app.use("/api/tickets", ticketRoutes);
};
