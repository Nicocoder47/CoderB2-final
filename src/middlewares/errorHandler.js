export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    status: 'error',
    error: {
      message: error.message || 'Error interno del servidor'
    }
  });
};
