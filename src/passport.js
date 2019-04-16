const passport = require('koa-passport');
const { Strategy } = require('passport-local');

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((userJSON, done) => {
  try {
    console.log('in deserializeUser', userJSON);
    const user = JSON.parse(userJSON);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(new Strategy(
  (username, password, done) => {
    console.log('passport-local strategy called');
    if (username !== 'admin') {
      done(null, false, { message: 'Bad username' });

    } else if (password !== '1234') {
      done(null, false, { message: 'Bad password' });

    } else {
      done(null, { username });
    }
  }
));

module.exports = passport;
