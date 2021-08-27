var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var history = require('connect-history-api-fallback')
var expressStaticGzip = require('express-static-gzip')
var indexRouter = require('./routes/index');

var app = express();
app.use('/',history()); // vue路由使用了history 模式
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', expressStaticGzip(path.join(__dirname, 'public'))) // 解析.gz文件
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// 配置跨域
app.all('*' ,function(req, res ,next) {
  res.header('Access-Control-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Set-Cookie', 'test')
})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
