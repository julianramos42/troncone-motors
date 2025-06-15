import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Este middleware toma un schema de Joi y lo usa para validar req.body
const validator = (schema: Joi.ObjectSchema) => 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => { // Añadimos el tipo de retorno explícito para mayor claridad
    try {
      await schema.validateAsync(req.body);
      next(); // La validación es exitosa, pasamos al siguiente middleware/controlador
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.details.map((detail: any) => detail.message).join(', '),
      });
    }
  };

export default validator;