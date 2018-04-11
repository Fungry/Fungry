require('dotenv').config()

const express = require('express');
const app = express();

var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var authRoutes = require('./server/routes/authRoutes');

///////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const configDB = require('./config/database');

// configuration ======================================================
mongoose.connect(configDB.url); // connect to our database
mongoose.set('debug', true)
// pass passport for configuration
require('./config/passport')(passport);
///////////////////////////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./server/routes/authRoutes')(app, passport); 
// app.use('/api/auth', authRoutes);

app.get('/test', function (req, res) {
    return res.render('index')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        error: "Error handler reason => " + err.toString(),
    });
    // res.render('error');
});

module.exports = app;
