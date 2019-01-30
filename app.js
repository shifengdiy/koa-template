const Koa = require('koa');
const app = new Koa();

const { port } = require('./app/config/app.config.js');

//获取所需要的处理模块，核心模块是路由信息处理，包含请求路径处理

//路由模块，路径请求和控制器
const router = require('./app/router.js');
//静态资源路径配置
const staticSourcePlugin = require('./app/middleware/staticFile.js');
//session和cookie插件配置和httpbody解析
const httpParsePlugin = require('./app/middleware/httpParse.js');
//微信公众号的access_token和各种凭证的定时刷新
const wechatTokenSchedule = require('./app/utils/wechatTokenSchedule.js');

app.use(async function (ctx, next) {
  //设置可接受json类型数据
  ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  await next();
})

//执行中间件
httpParsePlugin(app);

staticSourcePlugin(app);

wechatTokenSchedule();

router(app);

app.use(function (ctx, next) {
  //console.log(ctx);
  next();
})

app.listen(port);
console.log('koa启动');