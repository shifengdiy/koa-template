const fs = require('fs');
const request = require('request');

const { dataBase } = require('../config/app.config');
const mssql = require('mssql'); 

//获取留言视图
const getCommentView = async function(ctx) {
  const code = ctx.query.code;
  const { getWebAccessTokenByCode } = require('../service/wechatTokenRequest');
  const { openid } = await getWebAccessTokenByCode(code);
  //返回留言视图页面
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./app/view/comment.html');
}

//获取留言列表页面
const getCommentListView = function(ctx) {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./app/view/commentList.html');
} 

//获取故障上报页面
const getReportQuestionView = function(ctx) {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./app/view/reportQuestion.html');
}

//查询留言信息列表
const getCommentLisData = function(ctx) {
  
}

//提交用户当前留言
const postCommentData = async function(ctx) {
  await mssql.connect(dataBase);
  let postData = ctx.request.body;
}

//用户提交故障信息
const postDeviceDefualtData = function(ctx) {
  
}

//获取当前用户上报的故障列表

module.exports = {
  getCommentView,
  getCommentListView,
  getReportQuestionView,
}