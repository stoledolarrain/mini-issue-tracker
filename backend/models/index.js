const { sequelize } = require("../config/db.config");

const usuario = require("./usuario.model")(sequelize);
const proyecto = require("./proyecto.model")(sequelize);
const ticket = require("./ticket.model")(sequelize);

usuario.belongsToMany(proyecto, {
  through: "ProyectoUsuario",
  foreignKey: "usuarioId",
});
proyecto.belongsToMany(usuario, {
  through: "ProyectoUsuario",
  foreignKey: "proyectoId",
});

proyecto.hasMany(ticket, { foreignKey: "proyectoId" });
ticket.belongsTo(proyecto, { foreignKey: "proyectoId" });

usuario.hasMany(ticket, { foreignKey: "usuarioAsignadoId" });
ticket.belongsTo(usuario, { as: "asignadoA", foreignKey: "usuarioAsignadoId" });

module.exports = {
  usuario,
  proyecto,
  ticket,
  sequelize,
  Sequelize: sequelize.Sequelize,
};
