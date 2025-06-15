import { Request, Response, NextFunction } from "express";
import { CarModel } from "../../models/Car.model";

export default async function getAll(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        // --- 1. EXTRACCIÓN DE PARÁMETROS DE LA QUERY ---
        const {
            limit = 10, // Límite de resultados por página (default: 10)
            page = 1,   // Página actual (default: 1)
            sort,       // Campo y dirección de ordenamiento (ej: anio_desc)
            nombre,
            marca,
            modelo,
            combustible,
            transmision,
        } = req.query;

        // --- 2. CONSTRUCCIÓN DEL OBJETO DE FILTROS ---
        const filter: any = {};

        if (nombre) {
            // Búsqueda de texto flexible y case-insensitive
            filter.nombre = { $regex: nombre, $options: 'i' };
        }
        if (marca) filter.marca = marca;
        if (modelo) filter.modelo = modelo;
        if (combustible) filter.combustible = combustible;
        if (transmision) filter.transmision = transmision;

        // --- 3. LÓGICA DE ORDENAMIENTO ---
        const sortOptions: any = {};
        if (typeof sort === 'string') {
            const [field, direction] = sort.split('_'); // ej: "anio_desc" -> ["anio", "desc"]
            // Mongoose usa 1 para ascendente y -1 para descendente
            sortOptions[field] = direction === 'desc' ? -1 : 1;
        } else {
            // Ordenamiento por defecto si no se especifica
            sortOptions.anio = -1; // Los más nuevos primero
        }

        // --- 4. LÓGICA DE PAGINACIÓN ---
        const limitNumber = Number(limit);
        const skip = (Number(page) - 1) * limitNumber;

        // --- 5. EJECUCIÓN DE LAS CONSULTAS A LA DB ---
        // Hacemos dos consultas en paralelo para mayor eficiencia:
        // 1. Contar el total de documentos que coinciden con el filtro (sin paginación)
        // 2. Encontrar los documentos que coinciden, aplicando filtro, ordenamiento y paginación
        const [cars, totalCars] = await Promise.all([
            CarModel.find(filter)
                .sort(sortOptions)
                .skip(skip)
                .limit(limitNumber),
            CarModel.countDocuments(filter)
        ]);

        // Calculamos el total de páginas
        const totalPages = Math.ceil(totalCars / limitNumber);

        // --- 6. ENVÍO DE LA RESPUESTA ---
        return res.status(200).json({
            success: true,
            data: cars,
            pagination: {
                totalCars,    // Total de autos que coinciden con el filtro
                totalPages,   // Total de páginas disponibles
                currentPage: Number(page), // Página actual
                limit: limitNumber     // Límite de resultados por página
            }
        });

    } catch (error) {
        next(error);
    }
}