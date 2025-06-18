import { Request, Response, NextFunction } from "express";
import cloudinary from "../../config/cloudinary";
import fs from "fs-extra";
import { CarModel, ICar } from "../../models/Car.model";

export default async function updateOne(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const { id } = req.params;
        const updateData: Partial<ICar> = { ...req.body };

        const files = req.files as Express.Multer.File[];
        let newImagesUploaded = false;

        // 1. Si hay nuevos archivos, súbelos a Cloudinary PRIMERO.
        if (files && files.length > 0) {
            newImagesUploaded = true;
            
            const uploadPromises = files.map((file) => 
                cloudinary.uploader.upload(file.path, { folder: "products" })
            );
            const results = await Promise.all(uploadPromises);
            
            // Limpia los archivos temporales del servidor local
            const cleanupPromises = files.map((file) => fs.unlink(file.path));
            await Promise.all(cleanupPromises);
            
            // Prepara los nuevos arrays de imágenes para la actualización
            updateData.imagenesURLS = results.map((result) => result.secure_url);
            updateData.publicIds = results.map((result) => result.public_id);
        }

        // 2. Actualiza el documento en la base de datos.
        // Usamos { new: false } para que Mongoose nos devuelva el documento ANTES de la actualización.
        // Necesitamos el documento antiguo para obtener los publicIds de las imágenes viejas.
        const oldCar = await CarModel.findByIdAndUpdate(id, updateData, { new: false });

        // 3. Verifica si el auto existía.
        if (!oldCar) {
            return res.status(404).json({
                success: false,
                message: "Auto no encontrado",
            });
        }

        // 4. SI se subieron nuevas imágenes, borra las antiguas de Cloudinary.
        if (newImagesUploaded && oldCar.publicIds && oldCar.publicIds.length > 0) {
            console.log("Eliminando imágenes antiguas de Cloudinary...");
            const deletionPromises = oldCar.publicIds.map((publicId) =>
                cloudinary.uploader.destroy(publicId)
            );
            
            try {
                await Promise.all(deletionPromises);
            } catch (cloudinaryError) {
                console.error("Error al eliminar imágenes antiguas de Cloudinary:", cloudinaryError);
                // No detenemos la respuesta exitosa, pero registramos el error.
            }
        }

        // 5. Envía la respuesta de éxito.
        return res.status(200).json({
            success: true,
            message: "Auto actualizado",
        });

    } catch (err) {
        console.error("Error en updateOne:", err);
        next(err);
    }
}