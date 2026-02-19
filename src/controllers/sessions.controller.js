import {
  registerUser,
  loginUser,
  getCurrentSession,
  forgotPassword,
  resetPassword
} from '../services/sessions.service.js';

export const register = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;

  const payload = await registerUser({ first_name, last_name, email, password, role });

  return res.status(201).json({
    status: 'success',
    payload
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const payload = await loginUser({ email, password });

  return res.status(200).json({
    status: 'success',
    payload
  });
};

export const current = async (req, res) => {
  const payload = await getCurrentSession(req.user);

  return res.status(200).json({
    status: 'success',
    payload
  });
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  const payload = await forgotPassword(email);

  return res.status(200).json({
    status: 'success',
    payload
  });
};

export const resetPasswordController = async (req, res) => {
  const { token, newPassword } = req.body;

  const payload = await resetPassword({ token, newPassword });

  return res.status(200).json({
    status: 'success',
    payload
  });
};
