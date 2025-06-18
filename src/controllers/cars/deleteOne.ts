import { Request, Response, NextFunction } from "express";
import { CarModel } from "../../models/Car.model";
import cloudinary from "../../config/cloudinary";

export default async function deleteOne(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    // El ID del auto a eliminar vendrá como un parámetro en la URL (ej: /api/autos/:id)
    const { id } = req.params;

    try {
        // 1. Encuentra el auto por su ID y elimínalo de MongoDB.
        // findByIdAndDelete lo elimina y devuelve el documento borrado.
        const deletedCar = await CarModel.findByIdAndDelete(id);

        // Si no se encuentra un auto con ese ID, devolvemos un error 404.
        if (!deletedCar) {
            return res.status(404).json({
                success: false,
                message: "Auto no encontrado"
            });
        }

        // 2. Si el auto tenía imágenes, las eliminamos de Cloudinary.
        if (deletedCar.publicIds && deletedCar.publicIds.length > 0) {
            // Creamos un array de promesas, una por cada imagen a borrar.
            const deletionPromises = deletedCar.publicIds.map(publicId => {
                return cloudinary.uploader.destroy(publicId);
            });

            // Usamos Promise.all para ejecutar todas las promesas de borrado en paralelo.
            try {
                await Promise.all(deletionPromises);
            } catch (cloudinaryError) {
                // Si falla el borrado en Cloudinary, lo registramos pero no detenemos el proceso,
                // ya que el auto ya fue eliminado de nuestra base de datos que es lo principal.
                console.error("Error al eliminar imágenes de Cloudinary:", cloudinaryError);
            }
        }
        
        // 3. Enviamos una respuesta de éxito.
        return res.status(200).json({
            success: true,
            message: "Auto eliminado"
        });

    } catch (error) {
        // Si ocurre cualquier otro error (ej: ID inválido), lo pasamos al manejador de errores.
        next(error);
    }
}