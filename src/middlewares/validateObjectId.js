import mongoose from 'mongoose';

export const validateObjectId = (paramName) => (req, res, next) => {
  const value = req.params[paramName];
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({
      status: 'error',
      error: { message: `Parámetro inválido: ${paramName}` }
    });
  }
  return next();
};
