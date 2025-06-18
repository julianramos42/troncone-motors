import { Request, Response, NextFunction } from "express";
import { IUser, UserModel } from "../../models/User.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface SignInRequestBody {
    username?: string;
    password?: string;
}

export default async function getOne(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { username, password } = req.body as SignInRequestBody;

        // Pequeña validación para asegurarnos que los datos llegaron
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username y contraseña son requeridos"
            });
        }

        const user: IUser | null = await UserModel.findOne({ username });

        if (!user || !user.password) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        const passwordIsOk: boolean = await bcrypt.compare(password, user.password);
        if (!passwordIsOk) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        const tokenPayload = { id: user._id, username: user.username };
        const token = jwt.sign(
            tokenPayload,
            process.env.SECRET as string,
            { expiresIn: '30d' } // El token expira en 30 día
        );
        
        const userData = {
            username: user.username,
            admin: user.admin
        }

        return res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            user: userData,
            token: token
        });
    } catch (error) {
        next(error);
    }
};