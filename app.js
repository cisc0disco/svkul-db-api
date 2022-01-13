var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var testRouter = require('./routes/data');

var mongoose = require('mongoose');
const { Int32 } = require('mongodb');

var mongoDB = 'mongodb://127.0.0.1:27017/ujep';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB error!'));

var app = express();

app.use(require('./routes'));

//var test = new Model({autor: "Semotanová, Eva", nazev: "Česko : Ottův historický atlas", rok: 2007, nakladatel: "Ottovo", mistoVydani: "Praha", signatura: "IN191196", "ISXN": 9788073605775, id: "K.II.2.14, K.II.2.15"})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/data', testRouter);

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
