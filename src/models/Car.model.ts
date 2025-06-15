import { Schema, model, Document } from "mongoose";

export interface ICar extends Document {
  nombre: string;
  marca: string;
  modelo: string;
  anio: number;
  km: number;
  motor: number;
  color: string;
  combustible: string;
  transmision: string;
  puertas: number;
  imagenesURLS: string[];
  publicIds: string[];
  disponible: boolean;
}

const carSchema = new Schema<ICar>({
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  anio: { type: Number, required: true },
  km: { type: Number, required: true },
  motor: { type: Number, required: true },
  color: { type: String, required: true },
  combustible: { type: String, required: true },
  transmision: { type: String, required: true },
  puertas: { type: Number, required: true },
  imagenesURLS: { type: [String], required: true },
  publicIds: { type: [String], required: true },
  disponible: { type: Boolean, default: true },
});

export const CarModel = model<ICar>("Car", carSchema);
