var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
// import database file
const {
  database
} = require('./config');

// Index Router
var indexRouter = require('./routes/index');

// Todo Router
const todoRouter = require('./routes/todo');

var app = express();

// connect to the database
const db = mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(console.log('database connected'))
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/stylesheets", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/javascripts", express.static(path.join(__dirname, "public", "javascripts")));

app.use('/', indexRouter);

app.use('/todo', todoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;