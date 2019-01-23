const fs = require('fs');

const root = function(ctx) {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./app/view/index.html');;
}

module.exports = {
  root,
}