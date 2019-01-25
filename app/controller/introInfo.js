const fs = require('fs');

const getParkInfoView = function(ctx) {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./app/view/parkInfo.html');
}

const getOrganInfoView = function(ctx) {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./app/view/organInfo.html');
}

module.exports = {
  getParkInfoView,
  getOrganInfoView,
}