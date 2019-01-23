/**
 * 和微信公众号配置相关的接口响应，微信有大量的服务器通信接口，令牌获取，url验证，jssdk验证等
 */

//微信公众号服务器初始化验证，开发过程中只需要响应一次，验证合法性即可
const wechatUrlVerify = function(ctx) {
  const req = ctx.request.query; 

  //原样返回验证消息即可
  ctx.response.body = req.echostr;
}

module.exports = {
  wechatUrlVerify,
}