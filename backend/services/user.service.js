const db = require("../models");

const userService = {
    findUserById: async (id) => {
        return await db.usuario.findByPk(id);
    },
    findUserByEmail: async (email) => {
        return await db.usuario.findOne({
            where: { email }
        });
    },
    createUser: async (nombre, email, password) => {
        return await db.usuario.create({
            nombre,
            email,
            password: password
        });
    }
};

module.exports = userService;