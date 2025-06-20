import { Request, Response, NextFunction } from 'express';

interface adminUser {
    username: string;
    admin: boolean
}

export default async function isAdmin(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    // Verificar si req.user existe (autenticado por Passport JWT)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado: Token inválido o ausente',
      });
    }

    const user: adminUser = req.user as adminUser;
    // Verificar si el usuario es admin
    if (!user.admin) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado: No eres administrador',
      });
    }

    // Si es admin, pasar al siguiente middleware/ruta
    next();
  } catch (error) {
    next(error);
  }
}