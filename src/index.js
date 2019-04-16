const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// commenting out this because we are using passport-jwt now
// const jwt = require('koa-jwt');
const path = require('path');
const session = require('koa-session');
const render = require('koa-ejs');

const passport = require('./passport');
const passportJwtStrategy = require('./passport-jwt-strategy');
const router = require('./router');

const PORT = 3000;

const app = new Koa();

render(app, {
  root: path.join(__dirname, 'views'),
  layout: null,
  viewExt: 'html',
  cache: false,
  debug: false,
});

passport.use(passportJwtStrategy);

app.keys = ['very-secret-secret-session'];
app.use(session(app));

app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

// commenting out this because we are using passport-jwt now
// app.use(jwt({ secret: 'very-secret-secret-jwt' }).unless({ path: [/^\/api\/auth\//] }));

app.use(router.routes());

app.listen(PORT);

/*

// Note: These don't work because JWT is required
curl -X GET 'http://localhost:3000/api/messages/hello' -v

curl -X POST 'http://localhost:3000/api/messages/bye' -H 'Content-Type: application/json; charset=utf-8' -d '{"name": "Mr Andersson"}' -v

// with JWT
curl -X GET 'http://localhost:3000/api/messages/hello' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTU1Mjg1Mjk4fQ.3-Oer_5MfMnQjNyX78dCqHf9GGs__2mApdeGR4aR-1M' -v


*/