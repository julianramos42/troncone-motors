import { Request, Response, NextFunction } from 'express';
import { UserModel } from "../../models/User.model"

async function accountExistsSignUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user = await UserModel.findOne({email: req.body.email})
    if (user) {
        return res.status(400).json({
            success:false,
            message:'El email elegido no esta disponible'})
    }
    return next()
}

export default accountExistsSignUp