import app from '../src/app';
import http from 'http';

// 1. OBTENER EL PUERTO NUMÉRICO
// Usamos parseInt para asegurarnos de que `port` sea siempre un número.
// Si process.env.PORT no existe o no es un número válido, usamos 8080.
const port = parseInt(process.env.PORT || '8080', 10);

// 2. DEFINIR EL HOST
// Para Render, DEBE ser '0.0.0.0'.
const host = '0.0.0.0';

// 3. CREAR Y ARRANCAR EL SERVIDOR
try {
  // Creamos el servidor con la app de Express
  const server = http.createServer(app);

  // Ponemos el servidor a escuchar en el HOST y PUERTO correctos.
  // Ahora TypeScript está feliz porque `port` es un `number` y `host` es un `string`.
  server.listen(port, host, () => {
    console.log(`✅ Servidor listo y escuchando en http://${host}:${port}`);
  });

  // Manejador de errores del servidor para un mejor diagnóstico
  server.on('error', (error) => {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  });

} catch (error) {
  console.error('❌ Error catastrófico al configurar el servidor:', error);
  process.exit(1);
}