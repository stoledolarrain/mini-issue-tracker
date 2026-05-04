const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/login", (req, res) => res.render("auth/login"));
router.get("/", (req, res) => res.redirect("/login"));

router.post("/login", authController.postLogin);
router.get("/logout", authController.getLogout);
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

module.exports = router;
