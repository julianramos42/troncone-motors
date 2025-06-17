import { Request, Response, NextFunction } from 'express';
import { UserModel } from "../../models/User.model"

async function usernameExists(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const user = await UserModel.findOne({ username: req.body.username })
        if (!user) {
            return next()
        }
        return res.status(400).json({
            success: false,
            message: 'El usuario elegido no esta disponible'
        })
    } catch (error) {
        next(error)
    }
}

export default usernameExists