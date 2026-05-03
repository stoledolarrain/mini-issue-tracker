const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const { registerUserSchema, loginUserSchema } = require('../validators/user.schema');
const schemaValidation = require('../middlewares/schemaValidation.middleware');
const { isJsonRequestValid } = require('../middlewares/isJsonRequestValid.middleware');


router.post('/register', isJsonRequestValid, schemaValidation(registerUserSchema), authController.postRegister);

router.post('/login', isJsonRequestValid, schemaValidation(loginUserSchema), authController.postLogin);

module.exports = router;