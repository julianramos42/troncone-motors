import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { UserModel } from "../models/User.model";

// 1. (Seguridad) Verificar que la variable de entorno del secreto exista.
if (!process.env.SECRET) {
    throw new Error("La variable de entorno SECRET no está definida. La aplicación no puede iniciar de forma segura.");
}

// 2. (Tipado) Definir una interfaz para la estructura del payload de nuestro JWT.
interface JwtPayload {
    id: string;
    username: string;
}

// 3. (Tipado) Definir las opciones de la estrategia con su tipo.
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

passport.use(
    new JwtStrategy(opts, 
        // 4. (Tipado) Añadir tipos al payload y al callback 'done'.
        async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
            try {
                // 5. (Eficiencia y Seguridad) Usar .select('-password') para excluir la contraseña de la consulta.
                const user = await UserModel.findOne({ _id: jwt_payload.id }).select('-password');

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                console.error("Error en la estrategia de Passport JWT:", error);
                return done(error, false);
            }
        }
    )
);

export default passport;