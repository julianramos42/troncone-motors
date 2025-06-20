import { Request, Response, NextFunction } from "express";
import cloudinary from "../../config/cloudinary";
import fs from "fs-extra";
import { CarModel } from "../../models/Car.model";

export default async function createOne(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
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
        } = req.body;

        const files = req.files as Express.Multer.File[];
        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, message: "No se han subido imágenes" });
        }

        const uploadPromises = files.map((file) => {
            return cloudinary.uploader.upload(file.path, {
                folder: "products",
            });
        });

        const results = await Promise.all(uploadPromises);

        const cleanupPromises = files.map((file) => fs.unlink(file.path));
        await Promise.all(cleanupPromises);

        const imagenesURLS = results.map((result) => result.secure_url);
        const publicIds = results.map((result) => result.public_id);

        const slug = `${nombre}-${marca}-${modelo}-${anio}`.toLowerCase().replace(/\s+/g, '-');

        const newCarData = {
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
            publicIds,
            slug
        };

        await CarModel.create(newCarData);

        res.status(201).json({
            success: true,
            message: "Producto creado"
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
}
