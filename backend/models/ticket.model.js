const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Ticket = sequelize.define("ticket", {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "Pendiente",
      validate: {
        isIn: [["Pendiente", "En Progreso", "Completado"]],
      },
    },
  });

  return Ticket;
};
