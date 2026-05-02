const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Importamos los middlewares y validadores
const { registerUserSchema, loginUserSchema } = require('../validators/user.schema');
const schemaValidation = require('../middlewares/schemaValidation.middleware');
const { isJsonRequestValid } = require('../middlewares/isJsonRequestValid.middleware');

// Ruta para Registrar: 
// 1. Verifica que sea un JSON válido
// 2. Valida las reglas de Joi (nombre, email, password)
// 3. Pasa al controlador para guardar en DB
router.post('/register', isJsonRequestValid, schemaValidation(registerUserSchema), authController.postRegister);

// Ruta para Login:
router.post('/login', isJsonRequestValid, schemaValidation(loginUserSchema), authController.postLogin);

module.exports = router;