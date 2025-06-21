import { Request, Response, NextFunction } from "express";
import { CarModel } from "../../models/Car.model";

export default async function getOne(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const { slug } = req.params;

        const car = await CarModel.findOne({slug});

        if (!car) {
            return res.status(404).json({ success: false, message: "Auto no encontrado" });
        }

        const {
            _id,
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
            _id,
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
        console.log(error)
        next(error);
    }
}