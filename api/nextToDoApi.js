const createError = require('http-errors');
const express = require('express');
const path = require('path');
const config = require('./config');
const { InitSchema, Connect } = require('./app/model/init');
const { InitJob } = require('./job');
const { response } = require('./app/lib');
const { apiV1App } = require('./api');

const app = express();

Connect(config.MONGODB);
InitSchema();
InitJob();

app.set('port', process.env.PORT || config.PORT || 3000);
app.disable('x-powered-by');

app.use(config.URL_PREFIX + '/static', express.static(path.join(__dirname, 'public')));
app.use(config.URL_PREFIX + '/api/v1', apiV1App);
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
   console.error(req.path, err);
   return response.responseJson(res, err.message, [], err.status || 500);
});

app.listen(process.env.PORT || config.PORT || 3000, function () {
   console.debug(`Server running at http://localhost:${process.env.PORT || config.PORT || 3000}`)
});

module.exports = app;
