const { Datatypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
  const Proyecto = sequelize.define("proyecto", {
    nombre: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: Datatypes.TEXT,
      allowNull: true,
    },
  });
  return Proyecto;
};
