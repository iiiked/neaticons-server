const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Router = require('koa-router');

require('dotenv').config();
const { getIconList, getIconStyle } = require('./responseController');

const router = new Router();
router.get('/css', async (ctx) => {
  ctx.body = await getIconStyle(ctx.request.query.icon, ctx.request.body);
});

router.get('/css/list', async (ctx) => {
  ctx.body = await getIconList();
});

const app = new Koa();
app.use(cors())
  .use(bodyparser())
  .use(router.routes());

app.listen(process.env.PORT);