import { Request, Response, NextFunction } from 'express';
import { CarModel } from '../../models/Car.model';

async function carNameExists(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const car = await CarModel.findOne({ nombre: req.body.nombre })
        if (!car) {
            return next()
        }
        return res.status(400).json({
            success: false,
            message: 'El nombre elegido no esta disponible'
        })
    } catch (error) {
        next(error)
    }
}

export default carNameExists