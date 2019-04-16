const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const passport = require('../passport');

const router = new Router();

router.get('/login', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    await ctx.render('login');
  } else {
    ctx.redirect('/api/auth/status');
  }
});

router.post('/login', async (ctx) => {
  return passport.authenticate('local', async (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.redirect('/api/auth/status');
    } else {
      ctx.status = 400;
      await ctx.render('login');
    }
  })(ctx);
});

router.get('/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/api/auth/login');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

router.get('/status', async (ctx) => {
  if (ctx.isAuthenticated()) {
    console.log('/status', { isAuthenticated: ctx.isAuthenticated() });
    console.log('/status user:', ctx.state.user);
    console.log('/status', { user: ctx.state.user });

    jwtToken = jwt.sign(ctx.state.user, 'very-secret-secret-jwt');
    await ctx.render('status', { jwtToken });
  } else {
    ctx.redirect('/api/auth/login');
  }
});

module.exports = router;