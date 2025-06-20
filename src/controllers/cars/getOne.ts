import { Request, Response, NextFunction } from "express";
import { CarModel } from "../../models/Car.model";

export default async function getOne(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const { id } = req.params;

        const car = await CarModel.findById(id);

        if (!car) {
            return res.status(404).json({ success: false, message: "Auto no encontrado" });
        }

        const {
            nombre,
            marca,
            modelo,
            anio,
            km,
            motor,
            color,
            combustible,
            transmision,
            puertas,
            imagenesURLS,
        } = car;

        const carData = {
            nombre,
            marca,
            modelo,
            anio,
            km,
            motor,
            color,
            combustible,
            transmision,
            puertas,
            imagenesURLS,
        };

        return res.status(200).json(carData);

    } catch (error) {
        next(error);
    }
}