const express = require('express');

const router = express.Router();

exports.apiV1 = () => {
    const apiV1Router = Object.assign({}, router);
    apiV1Router.get('/test', (req, res) => {
        res.json({
            name: 'test',
            content: 'test'
        });
    });
    return apiV1Router;
};
