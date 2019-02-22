const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');
const router = require('./config/router');
const { InitSchema } = require('./app/model/Init');
const { ResponseJson } = require('./app/lib').Response;
const { InitJobs } = require('./job/Init');

const app = express();

InitSchema();
InitJobs();

app.set('port', process.env.PORT || config.PORT);
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(function (req, res, next) {
    next()
});

app.use(config.URL_PREFIX, router);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(req.path, err);
    return ResponseJson(res, [], 'something is wrong', err.status || 500);
});

app.listen(app.get('port'), function () {
    console.log(`Server Running at http://localhost:${app.get('port')}`);
});

module.exports = app;
