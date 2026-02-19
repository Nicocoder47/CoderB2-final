import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 8080;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Error iniciando servidor:', error.message);
  process.exit(1);
});
