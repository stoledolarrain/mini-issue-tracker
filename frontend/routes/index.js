const authRoutes = require("./auth.routes");
const proyectoRoutes = require("./proyecto.routes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/proyectos", proyectoRoutes);
};
