import { Router } from 'express';
import {
  register,
  login,
  current,
  forgotPasswordController,
  resetPasswordController
} from '../controllers/sessions.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticateCurrent } from '../middlewares/authenticateCurrent.js';
import { AppError } from '../utils/errors.js';

const router = Router();

router.post(
  '/register',
  asyncHandler(async (req, _res, next) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      throw new AppError('Faltan campos obligatorios para registro', 400);
    }

    next();
  }),
  asyncHandler(register)
);

router.post(
  '/login',
  asyncHandler(async (req, _res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError('Email y password son obligatorios', 400);
    }
    next();
  }),
  asyncHandler(login)
);

router.get('/current', authenticateCurrent, asyncHandler(current));

router.post(
  '/forgot-password',
  asyncHandler(async (req, _res, next) => {
    if (!req.body.email) {
      throw new AppError('Email es obligatorio', 400);
    }
    next();
  }),
  asyncHandler(forgotPasswordController)
);

router.post(
  '/reset-password',
  asyncHandler(async (req, _res, next) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      throw new AppError('Token y newPassword son obligatorios', 400);
    }
    next();
  }),
  asyncHandler(resetPasswordController)
);

export default router;
