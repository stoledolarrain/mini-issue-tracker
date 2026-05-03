const Joi = require("joi");
const crearTicketSchema = Joi.object({
  titulo: Joi.string().min(3).required().messages({
    "string.empty": "El título del ticket no puede estar vacío",
    "string.min": "El título debe tener al menos 3 caracteres",
    "any.required": "El título es obligatorio",
  }),
  descripcion: Joi.string().required().messages({
    "string.empty": "La descripción no puede estar vacía",
    "any.required": "La descripción es obligatoria",
  }),
  proyectoId: Joi.number().integer().required().messages({
    "number.base": "El ID del proyecto debe ser un número",
    "any.required": "El ID del proyecto es obligatorio",
  }),
  usuarioAsignadoId: Joi.number().integer().optional(),
  emailAsignado: Joi.string().email().optional().messages({
    "string.email": "Debe ser un correo electrónico válido",
  }),
});

const actualizarTicketSchema = Joi.object({
  titulo: Joi.string().min(3).optional(),
  descripcion: Joi.string().optional(),
  estado: Joi.string()
    .valid("Pendiente", "En Progreso", "Completado")
    .optional()
    .messages({
      "any.only":
        "El estado solo puede ser: Pendiente, En Progreso o Completado",
    }),
  usuarioAsignadoId: Joi.number().integer().optional(),
  emailAsignado: Joi.string().email().optional(),
});

module.exports = {
  crearTicketSchema,
  actualizarTicketSchema,
};
