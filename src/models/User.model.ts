import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    admin: boolean
}

const carSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false }
});

export const UserModel = model<IUser>("User", carSchema)