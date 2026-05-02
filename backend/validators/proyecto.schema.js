const Joi = require("joi");

const proyectoSchema = Joi.object({
  nombre: Joi.string().min(3).required().messages({
    "string.empty": "El nombre del proyecto no puede estar vacío",
    "any.required": "El nombre es obligatorio",
  }),
  descripcion: Joi.string().required().messages({
    "string.empty": "La descripción no puede estar vacía",
    "any.required": "La descripción es obligatoria",
  }),
});

module.exports = {
  proyectoSchema,
};
