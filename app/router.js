const KoaRouter = require('koa-router');
const router = new KoaRouter();

//请求控制器内的模块，根据功能分割的不同文件，方便管理
const { root } = require('./controller/base.js');
router.get('/root', root);


//微信公众号相关接口验证
const { wechatUrlVerify, receiveMsg } = require('./controller/wechat.js');
router.get('/', wechatUrlVerify);
router.post('/', receiveMsg);


/**
 * 公园信息简介的相关处理
 */
const { getParkInfoView, getOrganInfoView } = require('./controller/introInfo.js');
router.get('/getParkInfoView', getParkInfoView);
router.get('/getOrganInfoView', getOrganInfoView);


/**
 * 市民互动的相关信息处理
 * 包括市民留言，留言处理，故障上报和回复
 */
const { getCommentView, getCommentListView, getReportQuestionView } = require('./controller/reportQuestion.js');
router.get('/getCommentView', getCommentView);
router.get('/getCommentListView', getCommentListView);
router.get('/getReportQuestionView', getReportQuestionView);


module.exports = function(app) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}