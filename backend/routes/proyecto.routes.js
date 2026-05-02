const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyecto.controller");

// Importamos los middlewares de seguridad
const requireAuth = require("../middlewares/auth.middleware");
const schemaValidation = require("../middlewares/schemaValidation.middleware");
const {
  isJsonRequestValid,
} = require("../middlewares/isJsonRequestValid.middleware");
const { proyectoSchema } = require("../validators/proyecto.schema");

// ¡MAGIA! Al poner esto aquí arriba, le decimos a Express que TODAS
// las rutas de aquí hacia abajo requieren un Token válido.

router.use(requireAuth);

// Rutas del CRUD (C, R, U)
// Crear proyecto (valida que sea JSON y que cumpla el schema de Joi)
router.post(
  "/",
  isJsonRequestValid,
  schemaValidation(proyectoSchema),
  proyectoController.postCrearProyecto,
);

// Listar todos los proyectos del usuario
router.get("/", proyectoController.getProyectos);

// Ver detalle de un proyecto
router.get("/:id", proyectoController.getProyectoById);

// Editar un proyecto
router.put(
  "/:id",
  isJsonRequestValid,
  schemaValidation(proyectoSchema),
  proyectoController.putActualizarProyecto,
);

module.exports = router;
