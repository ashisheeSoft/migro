var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
require("dotenv").config();
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');

var apiAuth = require('./routes/apiAuth');
var apiUser = require('./routes/apiUser');
var apiDevice = require('./routes/apiDevice');
var apiRelay = require('./routes/apiRelay');

var app = express();

// Database Connection
mongoose
  .connect(process.env.DATABASE, {
   // useNewUrlParser: true,
   // useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use('/api/auth', apiAuth)
app.use('/api/user', apiUser)
app.use('/api/device', apiDevice)
app.use('/api/relay', apiRelay)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
