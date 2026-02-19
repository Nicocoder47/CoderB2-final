import passport from 'passport';

export const authenticateCurrent = (req, res, next) => {
  passport.authenticate('current', { session: false }, (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        status: 'error',
        error: { message: 'No autenticado' }
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};
