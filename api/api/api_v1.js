const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../config');
const { response } = require('../app/lib');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(async function (req, res, next) {
   for (url of config.AUTH_URLS) {
       if (req.path.match(new RegExp(url))) {
           const userId = req.cookies.userId;
           const User = mongoose.model('User');
           const user = await User.findById(userId);
           if (!user) {
               return response.responseJson(res,  'not authorizated',  [], 401)
           } else {
               req.user = user;
               return next();
           }
       }
   }
});

app.use(config.router.apiV1());

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
   console.error(req.path, err);
   return response.responseJson(res, err.message, [], err.status || 500);
});

module.exports = app;
