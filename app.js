require('dotenv')();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const dataRouter = require('./routes/data');

const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB || 'mongodb://127.0.0.1:27017/ujep';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'MongoDB error!'));

var app = express();

app.use(require('./routes'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/data', dataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// render the error page
	res.status(err.status || 500);
	res.json({
		// set locals, only providing error in development
		message: err.message,
		error: req.app.get('env') === 'development' ? err : {}
	});
});

module.exports = app;
