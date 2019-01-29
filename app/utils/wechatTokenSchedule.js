/**
 * 微信公众号号在运行过程中，有两个凭证需要定时刷新，一个是access_token，另一个是jsapi_ticket
 * 所以需要在规定时间内执行定时任务
 * 同时还有一些初始化任务，包括菜单初始化和获取jssdk鉴权
 */

const { getBaseAccessToken, getJsapiTicket, initMenuBar } = require('../controller/wechat');

module.exports = async function() {
  //首先第一次执行，之后定时执行
  global.access_token = await getBaseAccessToken();
  global.jsapi_ticket = await getJsapiTicket();
  console.log('凭证获取完毕\n', global.access_token, '\n', global.jsapi_ticket);
  
  //获取到access_token之后，开始初始化菜单
  initMenuBar(global.access_token);

  setInterval(async function () {
    global.access_token = await getBaseAccessToken();
    console.log(global.access_token, '定时刷新access token');
  }, 7100 * 1000);

  setInterval(async function () {
    global.jsapi_ticket = await getJsapiTicket();
    console.log(global.jsapi_ticket, '定时刷新js ticket');
  }, 7201 * 1000);
}