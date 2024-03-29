var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let handlebars = require('express-handlebars');
let session = require('express-session');
let fileUpload = require('express-fileupload');
let favicon = require("serve-favicon");
let db = require('./db/config');

var app = express();

var userRouter = require('./routes/user');
var productRouter = require('./routes/product');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var authRouter = require('./routes/authorised');

// Function to connect to the database
async function connectToDatabase() {
  try {
    await db.connect(process.env.MONGO_STRING);
    console.log("Database connection established.");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
}

connectToDatabase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, 'public', '/images/favicon.png')));
app.engine('hbs', handlebars.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/', partialsDir: __dirname + '/views/partials/', helpers: require('./helper') }));
app.use(session({ secret: "@tricbskt@#]$" }));
app.set('view engine', 'hbs');

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/user', authRouter)

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
