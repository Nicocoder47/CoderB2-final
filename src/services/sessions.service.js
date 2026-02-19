import { UserRepository } from '../repositories/UserRepository.js';
import { CartRepository } from '../repositories/CartRepository.js';
import { UserDAO } from '../dao/mongo/UserDAO.js';
import { CartDAO } from '../dao/mongo/CartDAO.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';
import { UserCurrentDTO } from '../dtos/UserCurrentDTO.js';
import { AppError } from '../utils/errors.js';
import { generateResetToken, hashResetToken } from '../utils/token.js';
import { sendMail } from '../config/mailer.js';

const userRepository = new UserRepository(new UserDAO());
const cartRepository = new CartRepository(new CartDAO());

export const registerUser = async ({ first_name, last_name, email, password, role }) => {
  const existingUser = await userRepository.getByEmail(email);
  if (existingUser) {
    throw new AppError('El email ya está registrado', 409);
  }

  const hashedPassword = await hashPassword(password);
  const createdUser = await userRepository.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    role: role === 'admin' ? 'admin' : 'user'
  });

  const createdCart = await cartRepository.create({ user: createdUser._id, items: [] });
  const userWithCart = await userRepository.updateById(createdUser._id, {
    cart: createdCart._id
  });

  return {
    user: new UserCurrentDTO(userWithCart)
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await userRepository.getByEmail(email);
  if (!user) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const token = generateToken(user);

  return {
    token,
    user: new UserCurrentDTO(user)
  };
};

export const getCurrentSession = async (user) => {
  return new UserCurrentDTO(user);
};

export const forgotPassword = async (email) => {
  const user = await userRepository.getByEmail(email);

  if (user) {
    const rawToken = generateResetToken();
    const tokenHash = hashResetToken(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await userRepository.updateById(user._id, {
      resetPasswordTokenHash: tokenHash,
      resetPasswordTokenExp: expiresAt
    });

    const resetLink = `${process.env.FRONT_URL}/reset-password?token=${rawToken}`;

    await sendMail({
      to: user.email,
      subject: 'Recuperación de contraseña - Sindicato',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Recuperación de contraseña</h2>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>
          <p>Este enlace expira en 1 hora.</p>
          <a
            href="${resetLink}"
            style="display:inline-block;padding:10px 18px;background:#0d6efd;color:#fff;text-decoration:none;border-radius:4px;"
          >
            Restablecer contraseña
          </a>
          <p>Si no solicitaste este cambio, podés ignorar este correo.</p>
        </div>
      `
    });
  }

  return {
    message:
      'Si el email existe en nuestro sistema, recibirás instrucciones para recuperar tu contraseña.'
  };
};

export const resetPassword = async ({ token, newPassword }) => {
  const tokenHash = hashResetToken(token);
  const user = await userRepository.getByResetTokenHash(tokenHash);

  if (!user) {
    throw new AppError('Token inválido o expirado', 400);
  }

  if (!user.resetPasswordTokenExp || user.resetPasswordTokenExp.getTime() < Date.now()) {
    throw new AppError('Token inválido o expirado', 400);
  }

  const isSamePassword = await comparePassword(newPassword, user.password);
  if (isSamePassword) {
    throw new AppError('La nueva contraseña no puede ser igual a la anterior', 400);
  }

  const newHashedPassword = await hashPassword(newPassword);

  await userRepository.updateById(user._id, {
    password: newHashedPassword,
    resetPasswordTokenHash: null,
    resetPasswordTokenExp: null
  });

  return { message: 'Contraseña actualizada correctamente' };
};
