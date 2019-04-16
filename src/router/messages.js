const Router = require('koa-router');

const router = new Router();

router.get('/hello', async (ctx) => {
  console.log('/hello', { isAuthenticated: ctx.isAuthenticated() });
  console.log('/hello', { user: ctx.state.user });

  ctx.body = { message: { 'hello': 'world' } };
});

router.post('/bye', async (ctx) => {
  const theBody = ctx.request.body;

  ctx.body = { message: { 'bye': theBody.name } };
});

module.exports = router;