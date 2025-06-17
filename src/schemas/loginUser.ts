import Joi from 'joi';

const userLoginSchema = Joi.object({
    username: Joi.string().min(3).max(100).required().messages({
        "string.base": "El username debe ser un texto.",
        "string.empty": "El campo 'username' no puede estar vacío.",
        "string.min": "El username debe tener al menos 3 caracteres.",
        "string.max": "El username no puede tener más de 100 caracteres.",
        "any.required": "El campo 'username' es obligatorio.",
    }),
    password: Joi.string().min(3).max(100).required().messages({
        "string.base": "La contraseña debe ser un texto.",
        "string.empty": "El campo 'contraseña' no puede estar vacío.",
        "string.min": "La contraseña debe tener al menos 3 caracteres.",
        "string.max": "La contraseña no puede tener más de 100 caracteres.",
        "any.required": "El campo 'contraseña' es obligatorio.",
    }),
});

export default userLoginSchema;