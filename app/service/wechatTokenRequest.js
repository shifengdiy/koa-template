const request = require('request');
const { appId, appSecret } = require('../config/wechat.config');

const getWebAccessTokenByCode = function(code){
  let getTokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;
  return new Promise(function(resolve, reject){
    const reqOptions = {
      url: getTokenUrl,
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