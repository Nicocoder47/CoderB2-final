import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET || 'dev_fallback_jwt_secret';

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email
    },
    jwtSecret,
    { expiresIn: '24h' }
  );
};
