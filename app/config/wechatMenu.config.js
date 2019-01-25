const wechatConfig = require('./wechat.config');
const redirectBaseUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';

const reportQuestionUrl = `${redirectBaseUrl}?appid=${wechatConfig.appId}&redirect_uri=${wechatConfig.serverUrl}/getReportQuestionView&response_type=code&scope=snsapi_userinfo&state=report#wechat_redirect`;
const commentUrl = `${redirectBaseUrl}?appid=${wechatConfig.appId}&redirect_uri=${wechatConfig.serverUrl}/getCommentView&response_type=code&scope=snsapi_userinfo&state=report#wechat_redirect`;
const commentListUrl = `${redirectBaseUrl}?appid=${wechatConfig.appId}&redirect_uri=${wechatConfig.serverUrl}/getCommentListView&response_type=code&scope=snsapi_userinfo&state=report#wechat_redirect`;
const parkInfoUrl = `${redirectBaseUrl}?appid=${wechatConfig.appId}&redirect_uri=${wechatConfig.serverUrl}/getParkInfoView&response_type=code&scope=snsapi_userinfo&state=report#wechat_redirect`;
const organInfoUrl = `${redirectBaseUrl}?appid=${wechatConfig.appId}&redirect_uri=${wechatConfig.serverUrl}/getOrganInfoView&response_type=code&scope=snsapi_userinfo&state=report#wechat_redirect`;

module.exports = {
  "button": [
    {
      "name": "市民互动",
      "sub_button": [
        {
          "type": "view",
          "name": "故障上报",
          "url": reportQuestionUrl,
        },
        {
          "type": "view",
          "name": "留言建议",
          "url": commentUrl,
        },
        {
          "type": "view",
          "name": "留言列表",
          "url": commentListUrl,
        }
      ]
    },
    {
      "type": "view",
      "name": "自助游园",
      "url": "https://mall.leyoobao.com/H5-MAP/nologo/index.html?sid=1909&source=wx1909",
    },
    {
      "name": "公园信息",
      "sub_button": [
        {
          "type": "view",
          "name": "园林简介",
          "url": parkInfoUrl,
        },
        {
          "type": "view",
          "name": "机构简介",
          "url": organInfoUrl,
        },
        {
          "type": "view",
          "name": "开关门时间",
          "url": "http://zhzm.xtdsglc.com/reportHistory"
        },
        {
          "type": "view",
          "name": "联系方式",
          "url": "http://zhzm.xtdsglc.com/reportHistory"
        },
      ]
    },
  ]
}