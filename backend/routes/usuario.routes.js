const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const requireAuth = require("../middlewares/auth.middleware");

router.use(requireAuth);

router.get("/", usuarioController.getUsuarios);

module.exports = router;
