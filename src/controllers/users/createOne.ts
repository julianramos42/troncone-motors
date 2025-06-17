import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../models/User.model";
import bcrypt from 'bcryptjs';

export default async function createOne(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        req.body.username = req.body.username.trim()
        req.body.email = req.body.email.trim()
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const admin = false;

        const { username, email, password } = req.body;
        const newUserData = { username, email, password, admin }

        const user = await UserModel.create(newUserData);

        if(user){
            return res.status(201).json({
                success: true,
                message: "Usuario creado correctamente."
            })
        }

        return res.status(500).json({
                success: false,
                message: "Algo salio mal."
            })
    } catch (error) {
        next(error);
    }
};