const { sequelize } = require("../config/db.config");

const usuario = require("./usuario.model")(sequelize);
const proyecto = require("./proyecto.model")(sequelize);

usuario.belongsToMany(proyecto, {
  through: "ProyectoUsuario",
  foreignKey: "usuarioId",
});
proyecto.belongsToMany(usuario, {
  through: "ProyectoUsuario",
  foreignKey: "proyectoId",
});

module.exports = {
  usuario,
  proyecto,
  sequelize,
  Sequelize: sequelize.Sequelize,
};
