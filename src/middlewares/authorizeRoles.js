export const authorizeRoles = (roles = []) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      error: { message: 'No autenticado' }
    });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      status: 'error',
      error: { message: 'No autorizado para este recurso' }
    });
  }

  return next();
};
