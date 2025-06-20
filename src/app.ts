// 1. Inicialización estándar de dotenv
import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import './config/database'
import { errorHandler, errorNotFound } from './middlewares/errors';
import indexRouter from './routes/index';
import cors from 'cors'

const app: Application = express();

// 2. Middlewares principales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Permite solicitudes desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true, // Habilita el envío de cookies o credenciales (si usas JWT, por ejemplo)
};
// Aplica el middleware CORS
app.use(cors(corsOptions));

// 3. Rutas principales
// La app usará el router de index para todas las peticiones a la raíz
app.use('/', indexRouter);

// 4. Middlewares de MANEJO DE ERRORES (¡CRÍTICO! Deben ir al final)
// Si una petición no coincide con ninguna ruta anterior, caerá aquí.
app.use(errorNotFound);
// Si cualquier ruta anterior llama a next(error), caerá aquí.
app.use(errorHandler);

export default app;