import { Request, Response, NextFunction } from "express";
import { CarModel } from "../../models/Car.model";

export default async function getAll(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const cars = await CarModel.find({})
            .sort({ createdAt: -1 })
            .limit(3)
            .select('-publicIds -__v -_id')

        return res.status(200).json({
            success: true,
            data: cars,
        });

    } catch (error) {
        next(error);
    }
}