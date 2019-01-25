const fs = require('fs');
const request = require('request');

//获取留言视图
const getCommentView = function(ctx) {
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

module.exports = {
  getCommentView,
  getCommentListView,
  getReportQuestionView,
}