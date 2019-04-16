const {
  ExtractJwt,
  Strategy
} = require('passport-jwt');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'very-secret-secret-jwt',
};

const strategy = new Strategy(opts, function(jwt_payload, done) {
  console.log('Running verify callback:', jwt_payload);
  done(null, jwt_payload);
});

module.exports = strategy;
