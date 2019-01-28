const fs = require('fs');
const request = require('request');

const { dataBase } = require('../config/app.config');
const mssql = require('mssql'); 

//获取留言视图
const getCommentView = async function(ctx) {
  const code = ctx.query.code;
  const { getWebAccessTokenByCode } = require('../service/wechatTokenRequest');

  //设置openid到session，设置acess_token定时刷新
  getWebAccessTokenByCode(code, ctx);
  ctx.session.xx = '测试'
  console.log(ctx.session, 'session数据');
  //返回留言视图页面
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./app/view/comment.html');
}

//获取留言列表页面
const getCommentListView = function(ctx) {
  const code = ctx.query.code;
  const { getWebAccessTokenByCode } = require('../service/wechatTokenRequest');

  //设置openid到session，设置acess_token定时刷新
  getWebAccessTokenByCode(code, ctx);

  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./app/view/commentList.html');
} 

//获取故障上报页面
const getReportQuestionView = function(ctx) {
  const code = ctx.query.code;
  const { getWebAccessTokenByCode } = require('../service/wechatTokenRequest');

  //设置openid到session，设置acess_token定时刷新
  getWebAccessTokenByCode(code, ctx);

  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./app/view/reportQuestion.html');
}

//查询留言信息列表
const getCommentLisData = async function(ctx) {
  const openId = ctx.session.openId;
  const resObj = {};
  try {
    await mssql.connect(dataBase);
    let querySql = `select * from dbo.commentList where openId=${openId}`;
    const queryRes = await mssql.query(querySql);
    mssql.close();

    if (queryRes.rowsAffected[0] == 1) {
      resObj.success = true;
    } else {
      resObj.success = false;
      resObj.body = queryRes;
    }
  } catch (error) {
    resObj.success = false;
    resObj.body = error;
  }
  console.log(resObj);
  ctx.response.type = 'json';
  ctx.response.body = JSON.stringify(resObj);
}

//提交用户当前留言
const postCommentData = async function(ctx) {
  
  let postData = ctx.request.body;
  let openId = ctx.session.openId;
  let currentDateStamp = new Date().getTime().toString();
  let resObj = {};
  console.log(postData)
  try {
    await mssql.connect(dataBase);
    let querySql = `INSERT INTO dbo.commentList (openId, commentText, commentDate) VALUES (${openId}, ${postData.commentText}, ${currentDateStamp})`;
    console.log(querySql)
    const queryRes = await mssql.query(querySql);
    mssql.close();

    if (queryRes.rowsAffected[0] == 1) {
      resObj.success = true;
    } else {
      resObj.success = false;
      resObj.body = queryRes;
    }
  } catch (error) {
    resObj.success = false;
    resObj.body = error;
  }
  console.log(resObj);
  ctx.response.type = 'json';
  ctx.response.body = JSON.stringify(resObj);
}

//用户提交故障信息
const postDeviceDefualtData = async function(ctx) {
  let postData = ctx.request.body;
  let openId = ctx.session.openId;
  let currentDateStamp = new Date().getTime().toString();
  let resObj = {};

  try {
    await mssql.connect(dataBase);
    let querySql = `INSERT INTO reportQuestion (openId, commentText, commentDate) VALUES (${openId}, ${postData.commentText}, ${currentDateStamp})`;
    const queryRes = await mssql.query(querySql);
    mssql.close();

    if (queryRes.rowsAffected[0] == 1) {
      resObj.success = true;
    } else {
      resObj.success = false;
      resObj.body = queryRes;
    }
  } catch (error) {
    resObj.success = false;
    resObj.body = error;
  }

  ctx.response.type = 'json';
  ctx.response.body = JSON.stringify(resObj);
}

//获取当前用户上报的故障列表
const getDeviceDefaultListData = async function(ctx){
  const openId = ctx.session.openId;
  const resObj = {};
  try {
    await mssql.connect(dataBase);
    let querySql = `select * from dbo.reportQuestion where openId=${openId}`;
    const queryRes = await mssql.query(querySql);
    mssql.close();

    if (queryRes.rowsAffected[0] == 1) {
      resObj.success = true;
    } else {
      resObj.success = false;
      resObj.body = queryRes;
    }
  } catch (error) {
    resObj.success = false;
    resObj.body = error;
  }

  ctx.response.type = 'json';
  ctx.response.body = JSON.stringify(resObj);
}

module.exports = {
  getCommentView,
  getCommentListView,
  getReportQuestionView,
  getCommentLisData,
  postCommentData,
  postDeviceDefualtData,
  getDeviceDefaultListData,
}