import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../repositories/UserRepository.js';
import { UserDAO } from '../dao/mongo/UserDAO.js';

const userRepository = new UserRepository(new UserDAO());

export const initializePassport = () => {
  const jwtSecret = process.env.JWT_SECRET || 'dev_fallback_jwt_secret';

  passport.use(
    'current',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
      },
      async (jwtPayload, done) => {
        try {
          const user = await userRepository.getById(jwtPayload.id);
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
