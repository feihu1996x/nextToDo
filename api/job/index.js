const { resolve } = require('path');
const glob = require('glob');

exports.InitJob = () => {
    glob.sync(resolve(__dirname, './task', '**/*.js')).forEach(require)
};