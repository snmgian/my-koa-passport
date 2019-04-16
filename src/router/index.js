const Router = require('koa-router');

const passport = require('../passport');
const auth = require('./auth')
const messages = require('./messages');

const router = new Router({ prefix: '/api' });

const jwtAuthenticator = passport.authenticate('jwt', { session: false });

router.use('/auth', auth.routes());
router.use('/messages', jwtAuthenticator, messages.routes());

module.exports = router;