import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { keys } from '../config/keys.js';
import { Admin } from '../database/models/user.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey,
};

export const strategyPassport =  passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    await Admin.findByPk(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => {
        done(err, false)
      });
  })
);