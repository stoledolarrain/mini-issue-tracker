const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Vistas
router.get("/login", (req, res) => res.render("auth/login"));
router.get("/", (req, res) => res.redirect("/login"));

// Lógica de Axios
router.post("/login", authController.postLogin);
router.get("/logout", authController.getLogout); // Ahora sí encontrará la función

module.exports = router;
