import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import sessionsRouter from './routes/sessions.routes.js';
import benefitsRouter from './routes/benefits.routes.js';
import cartsRouter from './routes/carts.routes.js';
import { initializePassport } from './config/passport.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'success', payload: { message: 'OK' } });
});

app.use('/api/sessions', sessionsRouter);
app.use('/api/benefits', benefitsRouter);
app.use('/api/carts', cartsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: {
      message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    }
  });
});

app.use(errorHandler);

export default app;
