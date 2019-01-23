const request = require('request');

/**
 * 和微信公众号配置相关的接口响应，微信有大量的服务器通信接口，令牌获取，url验证，jssdk验证等
 */

//微信公众号服务器初始化验证，开发过程中只需要响应一次，验证合法性即可
const wechatUrlVerify = function(ctx) {
  const req = ctx.request.query; 

  //原样返回验证消息即可
  ctx.response.body = req.echostr;
}

/**
 * access_token获取
 * 1、建议公众号开发者使用中控服务器统一获取和刷新Access_token，其他业务逻辑服务器所使用的access_token均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致access_token覆盖而影响业务；

  2、目前Access_token的有效期通过返回的expire_in来传达，目前是7200秒之内的值。中控服务器需要根据这个有效时间提前去刷新新access_token。在刷新过程中，中控服务器可对外继续输出的老access_token，此时公众平台后台会保证在5分钟内，新老access_token都可用，这保证了第三方业务的平滑过渡；

  3、Access_token的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新access_token的接口，这样便于业务服务器在API调用获知access_token已超时的情况下，可以触发access_token的刷新流程。

  https请求方式: GET
  https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
 */
const getBaseAccessToken = function(ctx) {
  const wechatConfig = require('../config/wechat.config');
  const reqBaseUrl = `https://api.weixin.qq.com/cgi-bin/token`;
  const tokenRequestUrl = `${reqBaseUrl}?grant_type=client_credential&appid=${wechatConfig.appId}&secret=${wechatConfig.appSecret}`;

  //发起请求获取access_token
  return new Promise(function(resolve, reject) {
    request.get(tokenRequestUrl, function(err, res, body) {
      console.log(body);
      if (!err && res.statusCode == 200) {
        resolve(body.access_token);
      } else {
        reject(err);
        throw (err);
      }
    })
  })
}

const getJsapiTicket = function() {
  const reqBaseUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket`;
  const ticketRequestUrl = `${reqBaseUrl}?access_token=${global.access_token}&type=jsapi`;

  //发起获取票据请求
  return new Promise(function(resolve, reject) {
    request.get(ticketRequestUrl, function(err, res, body) {
      console.log(body);
      if (!err && res.statusCode == 200) {
        resolve(body.ticket);
      } else {
        reject(err);
        throw(err);
      }
    })
  })
}

const initMenuBar = function(accessToken) {
  const wechatConfig = require('../config/wechat.config');
  const wechatMenuConfig = require('../config/wechatMenu.config');

  const requestData = wechatMenuConfig;
  const reqUrl = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`;
  const reqOptions = {
    url: reqUrl,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(requestData)
  };

  request(reqOptions, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      console.log('初始化菜单成功', body);
    } else {
      throw(err);
    }
  })
}

module.exports = {
  wechatUrlVerify,
  getBaseAccessToken,
  getJsapiTicket,
  initMenuBar,
}