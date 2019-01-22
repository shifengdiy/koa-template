module.exports = function(app) {
  /**
   * 这个模块配置应用的静态资源路径和文件后缀白名单
   */
  const staticFile = require('koa-static');
  const path = require('path');
  const staticPath = '../public'; //设置静态资源路径

  const staticConfig = staticFile(path.join(__dirname, staticPath));
  app.use(staticConfig);
}