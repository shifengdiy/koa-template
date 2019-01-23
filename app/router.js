const KoaRouter = require('koa-router');
const router = new KoaRouter();

//请求控制器内的模块，根据功能分割的不同文件，方便管理
const { root } = require('./controller/base.js');

//微信公众号相关接口验证
const { wechatUrlVerify } = require('./controller/wechat.js');

/**
 * 路由配置表设置，根据请求类型分类
 */
router.get('/root', root);
router.get('/', wechatUrlVerify);

module.exports = function(app) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}