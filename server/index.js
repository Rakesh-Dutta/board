var express = require('express');
var helmet = require('helmet')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const NODE_PATH = process.cwd();
var board = require('./routes/board');
// var card = require('./routes/card');
var member = require('./routes/member');

var app = express();
app.use(helmet())
app.set('views', path.join(NODE_PATH, '/ui/templates'));
app.set('view engine', 'pug');
app.use(favicon(path.join(NODE_PATH, 'public', 'icons/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(NODE_PATH, 'public')));

app.use('/', board);
// app.use('/card', card);
app.use('/member', member);

app.use('*', (req, res, next) => {
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error("Deafult Error handler: ", err);
  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    boardData: JSON.stringify({message: err.message || "Internal server error"})
  });
});

module.exports = app;

