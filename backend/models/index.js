const { sequelize } = require("../config/db.config");
const usuario = require("./usuario.model")(sequelize);

module.exports = {
  usuario,
  sequelize,
  Sequelize: sequelize.Sequelize,
};
