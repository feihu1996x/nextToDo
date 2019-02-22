const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

router.get('/', controller.Help.getHelp);

module.exports = router;