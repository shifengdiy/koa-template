const root = function(ctx) {
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>hello Koa</>';
}

module.exports = {
  root,
}