const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyecto.controller");

const requireAuth = require("../middlewares/auth.middleware");
const schemaValidation = require("../middlewares/schemaValidation.middleware");
const {
  isJsonRequestValid,
} = require("../middlewares/isJsonRequestValid.middleware");
const { proyectoSchema } = require("../validators/proyecto.schema");

router.use(requireAuth);

router.post(
  "/",
  isJsonRequestValid,
  schemaValidation(proyectoSchema),
  proyectoController.postCrearProyecto,
);

router.get("/", proyectoController.getProyectos);

router.get("/:id", proyectoController.getProyectoById);

router.put(
  "/:id",
  isJsonRequestValid,
  schemaValidation(proyectoSchema),
  proyectoController.putActualizarProyecto,
);

module.exports = router;
