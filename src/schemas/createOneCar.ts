import Joi from "joi";

// Usamos el año actual para que la validación sea siempre correcta.
const currentYear = new Date().getFullYear();

const carCreationSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required().messages({
    "string.base": "El nombre debe ser un texto.",
    "string.empty": "El campo 'nombre' no puede estar vacío.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no puede tener más de 100 caracteres.",
    "any.required": "El campo 'nombre' es obligatorio.",
  }),

  marca: Joi.string().min(2).max(50).required().messages({
    "string.empty": "El campo 'marca' no puede estar vacío.",
    "string.min": "La marca debe tener al menos 2 caracteres.",
    "string.max": "La marca no puede tener más de 50 caracteres.",
    "any.required": "El campo 'marca' es obligatorio.",
  }),

  modelo: Joi.string().min(1).max(50).required().messages({
    "string.empty": "El campo 'modelo' no puede estar vacío.",
    "string.min": "El modelo debe tener al menos 1 caracter.",
    "string.max": "El modelo no puede tener más de 50 caracteres.",
    "any.required": "El campo 'modelo' es obligatorio.",
  }),

  // Nota: Tu schema de mongoose usa "anio", lo mantengo aquí por consistencia.
  anio: Joi.number().integer().min(1900).max(currentYear).required().messages({
    "number.base": "El año debe ser un número.",
    "number.integer": "El año debe ser un número entero.",
    "number.min": "El año no puede ser anterior a 1900.",
    "number.max": `El año no puede ser superior al año actual (${currentYear}).`,
    "any.required": "El campo 'año' es obligatorio.",
  }),

  km: Joi.number().min(0).required().messages({
    "number.base": "Los kilómetros deben ser un número.",
    "number.min": "Los kilómetros no pueden ser un valor negativo.",
    "any.required": "El campo 'km' es obligatorio.",
  }),

  motor: Joi.number().positive().required().messages({
      "number.base": "El motor debe ser un número (ej: 1.6).",
      "number.positive": "El motor debe ser un número positivo.",
      "any.required": "El campo 'motor' es obligatorio."
  }),

  color: Joi.string().min(3).max(50).required().messages({
      "string.empty": "El campo 'color' no puede estar vacío.",
      "string.min": "El color debe tener al menos 3 caracteres.",
      "any.required": "El campo 'color' es obligatorio."
  }),

  combustible: Joi.string().valid('Nafta', 'Diesel', 'GNC').required().messages({
      "any.only": "El combustible debe ser 'Nafta', 'Diesel' o 'GNC'.",
      "any.required": "El campo 'combustible' es obligatorio."
  }),

  transmision: Joi.string().valid('Manual', 'Automática').required().messages({
      "any.only": "La transmisión debe ser 'Manual' o 'Automática'.",
      "any.required": "El campo 'transmisión' es obligatorio."
  }),

  puertas: Joi.number().integer().valid(2, 3, 4, 5).required().messages({
      "number.base": "El número de puertas debe ser un número.",
      "any.only": "El número de puertas debe ser 2, 3, 4 o 5.",
      "any.required": "El campo 'puertas' es obligatorio."
  }),

});

export default carCreationSchema;