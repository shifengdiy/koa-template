const request = require('request');
const { appId, appSecret } = require('../config/wechat.config');

const getWebAccessTokenByCode = async function(code, ctx){
  //判断openid是否存在，如果存在说明请求已经存在，web_access_token已经再刷新
  if(!ctx.session.openId){
    const reqRes = await getOpenIdByCode(code);
    ctx.session.openId = reqRes.openid;

    //缓存全局webaccessToken
    global.webAccessToken = reqRes.access_token;
    global.webRefreshAccessToken = reqRes.refresh_token;
    
    //开始设置web_access_token刷新
    setInterval(async function() {
      const intelRes = await refreshWebAccessToken(global.webRefreshAccessToken);

      global.webRefreshAccessToken = intelRes.refresh_token;
    }, 7100 * 1000);
  }

}

const getOpenIdByCode = function(code){
  let getTokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;

  return new Promise(function(resolve, reject){
    const reqOptions = {
      url: getTokenUrl,
      method: "GET",
      json: true,
    };

    request(reqOptions, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        resolve(body);
      } else {
        throw (err);
      }
    })
  })
}

const refreshWebAccessToken = function(refreshToken){
  let refreshTokenUrl = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${APPID}&grant_type=refresh_token&refresh_token=${refreshToken}`;

  return new Promise(function(resolve, reject){
    const reqOptions = {
      url: refreshTokenUrl,
      method: "GET",
      json: true,
    };

    request(reqOptions, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        resolve(body)
      } else {
        throw (err);
      }
    })
  })

}

module.exports = {
  getWebAccessTokenByCode,
}